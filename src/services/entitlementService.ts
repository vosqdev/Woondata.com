import {
  GeographicLevel,
  AccessLevel,
  SubscriptionTier,
  Organization,
  ProjectHierarchyMapping,
  GeographicNode
} from '../types';
import { PROJECT_HIERARCHY_DATA, SUBSCRIPTION_TIER_DETAILS, DEFAULT_ORGANIZATIONS } from '../data/geographicHierarchyData';

/**
 * Entitlement hierarchy ordering:
 * PROJECT (0) < NEIGHBORHOOD (1) < DISTRICT (2) < PLACE (3) < MUNICIPALITY (4)
 */
const LEVEL_WEIGHT: Record<GeographicLevel, number> = {
  PROJECT: 0,
  NEIGHBORHOOD: 1,
  DISTRICT: 2,
  PLACE: 3,
  MUNICIPALITY: 4
};

const TIER_ALLOWED_MAX_WEIGHT: Record<SubscriptionTier, number> = {
  PROJECT: 0,        // Project only
  LOCAL: 1,          // Project + Buurt
  AREA: 2,           // Project + Buurt + Wijk
  CITY: 3,           // Project + Buurt + Wijk + Plaats
  MUNICIPALITY_PRO: 4, // Entire Municipality
  ENTERPRISE: 4      // Multi-project / Multi-municipality Enterprise
};

/**
 * Resolves the entitlement access level for a specific organization, project and geographic level.
 */
export function resolveEntitlement(
  org?: Organization | null,
  targetProjectId?: string,
  targetLevel: GeographicLevel = 'PROJECT',
  _moduleName?: string
): {
  accessLevel: AccessLevel;
  isUnlocked: boolean;
  requiredTier: SubscriptionTier;
  reason: string;
} {
  const safeOrg = org || DEFAULT_ORGANIZATIONS[0];
  const safeProjectId = targetProjectId || safeOrg.activeProjectId || 'waterrijk-dronten';
  const safeTier = safeOrg.subscriptionTier || 'PROJECT';

  // Check if project is in organization's portfolio
  const accessibleList = safeOrg.accessibleProjectIds || [];
  const hasProjectAccess = accessibleList.includes(safeProjectId) || safeTier === 'ENTERPRISE' || safeTier === 'MUNICIPALITY_PRO';

  if (!hasProjectAccess && targetLevel === 'PROJECT') {
    return {
      accessLevel: 'LOCKED',
      isUnlocked: false,
      requiredTier: 'PROJECT',
      reason: 'Project niet gekoppeld aan uw organisatie-account.'
    };
  }

  const userTierMaxWeight = TIER_ALLOWED_MAX_WEIGHT[safeTier] ?? 0;
  const targetWeight = LEVEL_WEIGHT[targetLevel] ?? 0;

  // If level is within subscription tier
  if (targetWeight <= userTierMaxWeight) {
    return {
      accessLevel: 'FULL_ACCESS',
      isUnlocked: true,
      requiredTier: safeTier,
      reason: 'Volledige toegang binnen uw actieve licentie.'
    };
  }

  // Exactly 1 level above tier -> PREVIEW_ACCESS (can see teaser data & anonymized metrics)
  if (targetWeight === userTierMaxWeight + 1) {
    const nextTier = getRequiredTierForLevel(targetLevel);
    return {
      accessLevel: 'PREVIEW_ACCESS',
      isUnlocked: false,
      requiredTier: nextTier,
      reason: `Geanonimiseerde preview beschikbaar. Ontgrendel ${SUBSCRIPTION_TIER_DETAILS[nextTier]?.name || nextTier} voor volledige dataset.`
    };
  }

  // 2 or more levels above tier -> LOCKED
  const requiredTier = getRequiredTierForLevel(targetLevel);
  return {
    accessLevel: 'LOCKED',
    isUnlocked: false,
    requiredTier,
    reason: `Vergrendeld geografisch niveau. Vereist licentie-upgrade naar ${SUBSCRIPTION_TIER_DETAILS[requiredTier]?.name || requiredTier}.`
  };
}

/**
 * Maps a geographic level to the minimum required subscription tier.
 */
export function getRequiredTierForLevel(level: GeographicLevel): SubscriptionTier {
  switch (level) {
    case 'PROJECT':
      return 'PROJECT';
    case 'NEIGHBORHOOD':
      return 'LOCAL';
    case 'DISTRICT':
      return 'AREA';
    case 'PLACE':
      return 'CITY';
    case 'MUNICIPALITY':
      return 'MUNICIPALITY_PRO';
    default:
      return 'PROJECT';
  }
}

/**
 * Returns the ProjectHierarchyMapping for a given project ID (with fallback).
 */
export function getProjectHierarchy(projectId?: string | null): ProjectHierarchyMapping {
  const fallback = PROJECT_HIERARCHY_DATA['waterrijk-dronten'];
  if (!projectId) return fallback;
  return PROJECT_HIERARCHY_DATA[projectId] || fallback;
}

/**
 * Returns the specific GeographicNode object for a given level within a project's hierarchy.
 */
export function getGeographicNode(
  hierarchy?: ProjectHierarchyMapping | null,
  level: GeographicLevel = 'PROJECT'
): GeographicNode {
  const fallback = PROJECT_HIERARCHY_DATA['waterrijk-dronten'];
  const safeHierarchy = hierarchy || fallback;

  switch (level) {
    case 'PROJECT':
      return safeHierarchy?.project || fallback.project;
    case 'NEIGHBORHOOD':
      return safeHierarchy?.neighborhood || fallback.neighborhood;
    case 'DISTRICT':
      return safeHierarchy?.district || fallback.district;
    case 'PLACE':
      return safeHierarchy?.place || fallback.place;
    case 'MUNICIPALITY':
      return safeHierarchy?.municipality || fallback.municipality;
    default:
      return safeHierarchy?.project || fallback.project;
  }
}

/**
 * Sanitize / mask dataset if access level is preview or locked.
 * Protects premium data server-side and client-side from leaking unauthorized records.
 */
export function sanitizeDataset<T>(
  data: T[],
  accessLevel: AccessLevel,
  maskFields?: (keyof T)[]
): { items: Partial<T>[]; totalOriginalCount: number; isMasked: boolean } {
  if (!data || !Array.isArray(data)) {
    return { items: [], totalOriginalCount: 0, isMasked: false };
  }

  if (accessLevel === 'FULL_ACCESS') {
    return { items: data, totalOriginalCount: data.length, isMasked: false };
  }

  if (accessLevel === 'PREVIEW_ACCESS') {
    // Only return top 2 sample items with masked sensitive fields
    const previewItems = data.slice(0, 2).map((item) => {
      const copy: any = { ...item };
      if (maskFields) {
        maskFields.forEach((field) => {
          copy[field] = '[Beschikbaar in Volledige Licentie]';
        });
      }
      return copy;
    });
    return { items: previewItems, totalOriginalCount: data.length, isMasked: true };
  }

  // LOCKED
  return { items: [], totalOriginalCount: data.length, isMasked: true };
}

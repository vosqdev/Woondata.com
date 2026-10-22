import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import { Building, Compass, Layers, Eye, ZoomIn, MapPin, ExternalLink } from 'lucide-react';
import { Project } from '../types';

// Fix for default Leaflet icon assets
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface OpenStreetMapSatelliteProps {
  projects: Project[];
  selectedProject: Project | null;
  hoveredProject: Project | null;
  onSelectProject: (project: Project) => void;
  onHoverProject: (project: Project | null) => void;
}

const DRONTEN_CENTER: [number, number] = [52.518, 5.700];

const KERN_COORDINATES: Record<string, { center: [number, number]; zoom: number }> = {
  Gemeente: { center: [52.518, 5.700], zoom: 11 },
  Alle: { center: [52.518, 5.700], zoom: 11 },
  Dronten: { center: [52.518, 5.716], zoom: 14.5 },
  Biddinghuizen: { center: [52.456, 5.690], zoom: 14.5 },
  Swifterbant: { center: [52.566, 5.638], zoom: 14.5 }
};

// Safe LatLng validation helper
const isValidCoord = (lat?: number, lng?: number): boolean => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng);
};

// Calculate approximate spherical distance in km
const getDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
};

// Component to track map zoom and bounds
const MapZoomTracker: React.FC<{
  onZoomChange: (zoom: number) => void;
}> = ({ onZoomChange }) => {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    }
  });

  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);

  return null;
};

// Component to handle map view updates smoothly on explicit user interaction
const MapViewController: React.FC<{
  selectedProject: Project | null;
  targetKern: string | null;
}> = ({ selectedProject, targetKern }) => {
  const map = useMap();
  const lastFlownTargetRef = React.useRef<string | null>(null);

  useEffect(() => {
    try {
      if (selectedProject?.coordinates && isValidCoord(selectedProject.coordinates.lat, selectedProject.coordinates.lng)) {
        const key = `proj-${selectedProject.id}`;
        if (lastFlownTargetRef.current !== key) {
          lastFlownTargetRef.current = key;
          map.flyTo([selectedProject.coordinates.lat, selectedProject.coordinates.lng], 15.5, {
            duration: 1.0
          });
        }
      } else if (targetKern && KERN_COORDINATES[targetKern]) {
        const key = `kern-${targetKern}`;
        if (lastFlownTargetRef.current !== key) {
          lastFlownTargetRef.current = key;
          const coord = KERN_COORDINATES[targetKern];
          if (coord?.center && isValidCoord(coord.center[0], coord.center[1])) {
            map.flyTo(coord.center, coord.zoom ?? 11, {
              duration: 1.0
            });
          }
        }
      }
    } catch (err) {
      console.warn('Leaflet map flyTo safe fallback:', err);
    }
  }, [map, selectedProject, targetKern]);

  return null;
};

// Custom Marker Generator with status colors and clean responsive styling (always includes title)
const createCustomMarkerIcon = (
  project: Project,
  isSelected: boolean,
  isHovered: boolean
) => {
  const statusColors = {
    'Verkoop gestart': { bg: '#0A1202', border: '#D6F830', ping: 'rgba(214, 248, 48, 0.6)' },
    'In aanbouw': { bg: '#0f766e', border: '#14b8a6', ping: 'rgba(20, 184, 166, 0.6)' },
    'In voorbereiding': { bg: '#b45309', border: '#f59e0b', ping: 'rgba(245, 158, 11, 0.6)' },
    'Oriëntatie': { bg: '#1d4ed8', border: '#3b82f6', ping: 'rgba(59, 130, 246, 0.6)' },
    'Opgeleverd': { bg: '#334155', border: '#64748b', ping: 'rgba(100, 116, 139, 0.6)' }
  };

  const currentTheme = statusColors[project.status] || statusColors['Oriëntatie'];
  const shortTitle = project.title.split(' - ')[0].replace(/\s*\([^)]*\)/, '');
  const activeClass = isSelected || isHovered;

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer; pointer-events: auto;">
      ${
        activeClass
          ? `<span style="position: absolute; width: 44px; height: 44px; border-radius: 9999px; background: ${currentTheme.ping}; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.75; pointer-events: none;"></span>`
          : ''
      }
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        background: ${activeClass ? '#060B12' : '#0B1320'};
        color: #ffffff;
        padding: 5px 11px;
        border-radius: 9999px;
        border: 2px solid ${activeClass ? '#D6F830' : 'rgba(255, 255, 255, 0.25)'};
        box-shadow: ${activeClass ? '0 0 20px rgba(214, 248, 48, 0.6)' : '0 6px 18px rgba(0, 0, 0, 0.65)'};
        font-family: inherit;
        white-space: nowrap;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        z-index: ${activeClass ? 1000 : 10};
      ">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: ${currentTheme.border}; box-shadow: 0 0 6px ${currentTheme.border}; shrink: 0;"></span>
        <span style="font-size: 11px; font-weight: 700; letter-spacing: -0.01em; max-width: 175px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${shortTitle}
        </span>
        <span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 6px; background: rgba(214, 248, 48, 0.12); color: #D6F830; border: 1px solid rgba(214, 248, 48, 0.35); shrink: 0;">
          ${project.totalHomes}w
        </span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-project-pin',
    html: html,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -18]
  });
};

// Custom Cluster Badge Icon Generator (with title support for single projects like Swifterbant)
const createClusterMarkerIcon = (
  cluster: {
    kern: string;
    totalHomes: number;
    count: number;
    singleProjectTitle?: string;
  },
  isHovered: boolean
) => {
  const isSingle = cluster.count === 1;
  const subtitle = isSingle && cluster.singleProjectTitle
    ? cluster.singleProjectTitle
    : `${cluster.count} gebundeld`;

  const html = `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      cursor: pointer;
      font-family: inherit;
      pointer-events: auto;
    ">
      <!-- Glow & Ping ring -->
      <span style="
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 9999px;
        background: ${isHovered ? 'rgba(214, 248, 48, 0.45)' : 'rgba(214, 248, 48, 0.22)'};
        animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        pointer-events: none;
      "></span>

      <!-- Cluster badge container -->
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        background: #060B12;
        color: #ffffff;
        padding: 6px 12px;
        border-radius: 9999px;
        border: 2px solid ${isHovered ? '#FFFFFF' : '#D6F830'};
        box-shadow: 0 0 22px rgba(214, 248, 48, ${isHovered ? '0.6' : '0.35'}), 0 10px 25px rgba(0, 0, 0, 0.8);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        white-space: nowrap;
      ">
        <!-- Count Badge -->
        <span style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #D6F830;
          color: #060B12;
          font-size: 11px;
          font-weight: 900;
          shrink: 0;
        ">
          ${cluster.count}
        </span>

        <!-- Kern & Project count/title label -->
        <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.15; max-width: 175px;">
          <span style="font-size: 11px; font-weight: 800; color: #ffffff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${cluster.kern}
          </span>
          <span style="font-size: 9px; font-weight: 600; color: ${isSingle ? '#D6F830' : 'rgba(255, 255, 255, 0.7)'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${subtitle}
          </span>
        </div>

        <!-- Homes pill -->
        <span style="
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(214, 248, 48, 0.15);
          color: #D6F830;
          border: 1px solid rgba(214, 248, 48, 0.35);
          shrink: 0;
        ">
          ${cluster.totalHomes}w
        </span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-cluster-marker',
    html: html,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -22]
  });
};

interface ClusterItem {
  id: string;
  isCluster: boolean;
  projects: Project[];
  center: { lat: number; lng: number };
  totalHomes: number;
  kern: string;
}

// Cluster Marker component with fly-to zoom expansion and project list popup
const ClusterMarker: React.FC<{
  cluster: ClusterItem;
  onSelectProject: (p: Project) => void;
  onHoverProject: (p: Project | null) => void;
}> = ({ cluster, onSelectProject, onHoverProject }) => {
  const map = useMap();
  const [hovered, setHovered] = useState(false);

  const isSingle = cluster.projects.length === 1;
  const singleProj = cluster.projects[0];

  const handleMarkerClick = () => {
    if (isSingle && singleProj) {
      onSelectProject(singleProj);
      map.flyTo([singleProj.coordinates.lat, singleProj.coordinates.lng], 15.5, {
        duration: 1.0
      });
    } else {
      const nextZoom = Math.max(map.getZoom() + 3, 14.5);
      map.flyTo([cluster.center.lat, cluster.center.lng], nextZoom, {
        duration: 1.0
      });
    }
  };

  const icon = useMemo(() => {
    return createClusterMarkerIcon(
      {
        kern: cluster.kern,
        totalHomes: cluster.totalHomes,
        count: cluster.projects.length,
        singleProjectTitle: isSingle && singleProj ? singleProj.title.split(' - ')[0].replace(/\s*\([^)]*\)/, '') : undefined
      },
      hovered
    );
  }, [cluster.kern, cluster.totalHomes, cluster.projects.length, hovered, isSingle, singleProj]);

  return (
    <Marker
      position={[cluster.center.lat, cluster.center.lng]}
      icon={icon}
      eventHandlers={{
        click: handleMarkerClick,
        mouseover: () => {
          setHovered(true);
          if (isSingle && singleProj) {
            onHoverProject(singleProj);
          }
        },
        mouseout: () => {
          setHovered(false);
          if (isSingle) {
            onHoverProject(null);
          }
        }
      }}
    >
      <Popup className="custom-leaflet-popup">
        {isSingle && singleProj ? (
          <div className="p-1 min-w-[220px] max-w-[280px] text-slate-100 font-sans">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#D6F830] mb-0.5 font-display">
              {singleProj.kern} • {singleProj.status}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{singleProj.title}</h4>
            <p className="text-xs text-slate-300 mb-2 line-clamp-2 leading-relaxed">
              {singleProj.description}
            </p>
            <div className="flex justify-between items-center text-xs font-medium bg-white/5 p-2 rounded-lg mb-2 border border-white/10">
              <span className="text-slate-300">{singleProj.totalHomes} woningen</span>
              <span className="font-bold text-[#D6F830]">{singleProj.priceRange}</span>
            </div>
            <div className="flex gap-1.5 pt-0.5">
              <button
                onClick={() => {
                  onSelectProject(singleProj);
                  map.flyTo([singleProj.coordinates.lat, singleProj.coordinates.lng], 16, { duration: 0.8 });
                }}
                className="flex-1 py-1.5 bg-[#D6F830] hover:bg-[#c6ea23] text-black rounded-lg text-xs font-extrabold transition-colors flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(214,248,48,0.3)] cursor-pointer font-display"
              >
                <Building className="w-3.5 h-3.5" />
                <span>Details</span>
              </button>
              {singleProj.sourceUrl && (
                <a
                  href={singleProj.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-orange-400/30"
                  title="Bekijk op Funda"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-orange-300" />
                  <span>Funda</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="p-2 min-w-[250px] max-w-[290px] text-slate-100 font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#D6F830] font-display">
                  Gebundelde projecten
                </div>
                <div className="text-sm font-black text-white font-display">
                  {cluster.kern} • {cluster.projects.length} projecten
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D6F830]/20 text-[#D6F830] border border-[#D6F830]/30 font-display">
                {cluster.totalHomes} woningen
              </span>
            </div>

            <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-1 text-xs">
              {cluster.projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(proj);
                    map.flyTo([proj.coordinates.lat, proj.coordinates.lng], 16, { duration: 0.8 });
                  }}
                  onMouseEnter={() => onHoverProject(proj)}
                  onMouseLeave={() => onHoverProject(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 truncate mr-2">
                    <span className="w-2 h-2 rounded-full bg-[#D6F830] shrink-0" />
                    <span className="font-semibold text-white truncate text-[11px]">{proj.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#D6F830] shrink-0">{proj.totalHomes}w</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleMarkerClick}
              className="w-full mt-2.5 py-1.5 bg-[#D6F830] hover:bg-[#bfe617] text-slate-950 font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer font-display shadow-md"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Inzoomen om te spreiden</span>
            </button>
          </div>
        )}
      </Popup>
    </Marker>
  );
};

export const OpenStreetMapSatellite: React.FC<OpenStreetMapSatelliteProps> = ({
  projects,
  selectedProject,
  hoveredProject,
  onSelectProject,
  onHoverProject
}) => {
  const [mapLayer, setMapLayer] = useState<'satellite' | 'osm'>('satellite');
  const [activeKernFilter, setActiveKernFilter] = useState<string>('Gemeente');
  const [currentZoom, setCurrentZoom] = useState<number>(11);

  const handleZoomChange = useCallback((zoom: number) => {
    setCurrentZoom(zoom);
  }, []);

  const tileLayerConfig = useMemo(() => {
    switch (mapLayer) {
      case 'osm':
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };
      case 'satellite':
      default:
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        };
    }
  }, [mapLayer]);

  const handleKernJump = (kern: string) => {
    setActiveKernFilter(kern);
  };

  // Dynamic Clustering: Groups nearby projects when zoomed out to prevent overlapping stacks
  const clusters = useMemo(() => {
    const validProjects = projects.filter(
      (p) => p && isValidCoord(p.coordinates?.lat, p.coordinates?.lng)
    );

    // If zoomed in to neighborhood/street level (zoom >= 14), each project gets its own marker
    if (currentZoom >= 14) {
      return validProjects.map((project) => ({
        id: `single-${project.id}`,
        isCluster: false,
        projects: [project],
        center: { lat: project.coordinates.lat, lng: project.coordinates.lng },
        totalHomes: project.totalHomes || 0,
        kern: project.kern || 'Dronten'
      }));
    }

    // Zoom <= 13: Cluster projects by town/kern for a clean, stable overview
    const thresholdKm = currentZoom <= 11 ? 5.0 : 2.5;
    const result: ClusterItem[] = [];

    for (const project of validProjects) {
      let matchedCluster: ClusterItem | null = null;
      for (const cluster of result) {
        const isSameKern = cluster.kern === project.kern;
        const dist = getDistanceKm(
          project.coordinates.lat,
          project.coordinates.lng,
          cluster.center.lat,
          cluster.center.lng
        );
        if (isSameKern || dist <= thresholdKm) {
          matchedCluster = cluster;
          break;
        }
      }

      if (matchedCluster) {
        matchedCluster.projects.push(project);
        matchedCluster.totalHomes += project.totalHomes || 0;
        const count = matchedCluster.projects.length;
        matchedCluster.center = {
          lat: (matchedCluster.center.lat * (count - 1) + project.coordinates.lat) / count,
          lng: (matchedCluster.center.lng * (count - 1) + project.coordinates.lng) / count
        };
        matchedCluster.isCluster = true;
      } else {
        result.push({
          id: `cluster-${project.kern || project.id}`,
          isCluster: true, // Render as town cluster badge at zoom <= 13
          projects: [project],
          center: { lat: project.coordinates.lat, lng: project.coordinates.lng },
          totalHomes: project.totalHomes || 0,
          kern: project.kern || 'Dronten'
        });
      }
    }

    return result;
  }, [projects, currentZoom]);

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#060B12]">
      {/* Top Header Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-10 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
        {/* Left Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#060B12]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-white shadow-lg font-display">
          <Compass className="w-3.5 h-3.5 text-[#D6F830]" />
          <span className="font-semibold">Satelliet &amp; Kaart • Woningbouw Dronten</span>
        </div>

        {/* Layer Switcher & Quick Jump Kern Pills */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2 font-display">
          {/* Layer switcher */}
          <div className="flex items-center gap-1 bg-[#060B12]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
            <Layers className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                mapLayer === 'satellite'
                  ? 'bg-[#D6F830] text-black shadow-[0_0_10px_rgba(214,248,48,0.3)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              Satelliet
            </button>
            <button
              onClick={() => setMapLayer('osm')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                mapLayer === 'osm'
                  ? 'bg-[#D6F830] text-black shadow-[0_0_10px_rgba(214,248,48,0.3)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
              }`}
            >
              Stratenkaart
            </button>
          </div>

          {/* Kern Pills: Clicking a town flies directly into that town and unpacks the cluster */}
          <div className="flex flex-wrap items-center gap-1 bg-[#060B12]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg font-display">
            {['Gemeente', 'Dronten', 'Biddinghuizen', 'Swifterbant'].map((kern) => (
              <button
                key={kern}
                onClick={() => handleKernJump(kern)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all cursor-pointer ${
                  activeKernFilter === kern
                    ? 'bg-[#D6F830]/20 text-[#D6F830] border border-[#D6F830]/40 font-extrabold shadow-[0_0_8px_rgba(214,248,48,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {kern}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <MapContainer
        center={DRONTEN_CENTER}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        {/* Base Tile Layer */}
        <TileLayer
          key={mapLayer}
          url={tileLayerConfig.url}
          attribution={tileLayerConfig.attribution}
          maxZoom={19}
        />

        {/* Labels Overlay on Satellite */}
        {mapLayer === 'satellite' && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
            opacity={0.85}
          />
        )}

        <MapZoomTracker onZoomChange={handleZoomChange} />

        <MapViewController
          selectedProject={selectedProject}
          targetKern={activeKernFilter}
        />

        {/* Render Clusters and Individual Unpacked Markers */}
        {clusters.map((cluster) => {
          if (cluster.isCluster) {
            return (
              <ClusterMarker
                key={cluster.id}
                cluster={cluster}
                onSelectProject={onSelectProject}
                onHoverProject={onHoverProject}
              />
            );
          }

          // Individual unpacked project marker (when currentZoom >= 14):
          const project = cluster.projects[0];
          if (!project) return null;

          const isSelected = selectedProject?.id === project.id;
          const isHovered = hoveredProject?.id === project.id;
          const icon = createCustomMarkerIcon(project, isSelected, isHovered);

          return (
            <Marker
              key={project.id}
              position={[project.coordinates.lat, project.coordinates.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectProject(project),
                mouseover: () => onHoverProject(project),
                mouseout: () => onHoverProject(null)
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 min-w-[210px] text-slate-100 font-sans">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D6F830] mb-0.5 font-display">
                    {project.kern} • {project.status}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{project.title}</h4>
                  <p className="text-xs text-slate-300 mb-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center text-xs font-medium bg-white/5 p-2 rounded-lg mb-2 border border-white/10">
                    <span className="text-slate-300">{project.totalHomes} woningen</span>
                    <span className="font-bold text-[#D6F830]">{project.priceRange}</span>
                  </div>
                  <div className="flex gap-1.5 pt-0.5">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 py-1.5 bg-[#D6F830] hover:bg-[#c6ea23] text-black rounded-lg text-xs font-extrabold transition-colors flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(214,248,48,0.3)] cursor-pointer font-display"
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-orange-400/30"
                        title="Bekijk op Funda"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-orange-300" />
                        <span>Funda</span>
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${project.coordinates.lat},${project.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-white/10"
                      title="Open Street View panorama in nieuwe tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>360°</span>
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Bottom Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none">
        <div className="pointer-events-auto bg-[#060B12]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 shadow-xl">
          <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6F830] shadow-[0_0_6px_rgba(214,248,48,0.6)]" />
              <span>Verkoop gestart</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span>In aanbouw</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>In voorbereiding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Oriëntatie</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="hidden md:inline bg-white/10 px-2 py-0.5 rounded text-[10px] text-[#D6F830]">
              💡 Klik op een cluster of zoom in om projecten te spreiden
            </span>
            <span>{projects.length} locaties</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { 
  Waves, 
  Trees, 
  Building2, 
  Compass, 
  Home, 
  Sparkles, 
  Landmark, 
  Anchor, 
  Flower2, 
  Layers,
  LucideIcon 
} from 'lucide-react';

export interface ProjectIconInfo {
  icon: LucideIcon;
  theme: string;
}

export const getProjectIconInfo = (projectId: string): ProjectIconInfo => {
  switch (projectId) {
    case 'waterrijk-dronten':
      return { icon: Waves, theme: 'Waterrijk Fase 1' };
    case 'waterrijk-fase-2':
      return { icon: Waves, theme: 'Waterrijk Fase 2 & 2b' };
    case 'havenkwartier-dronten':
      return { icon: Compass, theme: 'Watervilla\'s Libera' };
    case 'zuiderweide-dronten':
      return { icon: Trees, theme: 'Zuiderweide De Vierspan' };
    case 'zuiderweide-de-passage':
      return { icon: Building2, theme: 'Zuiderweide De Passage' };
    case 'luweland-swifterbant':
      return { icon: Home, theme: 'In de Luwte Fase 4' };
    case 'de-wierde-biddinghuizen':
      return { icon: Landmark, theme: 'De Wierde Biddinghuizen' };
    default:
      return { icon: Home, theme: 'Funda Nieuwbouw' };
  }
};

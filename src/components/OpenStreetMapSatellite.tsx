import React, { useState, useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import { Building, Compass, Layers, Eye } from 'lucide-react';
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
  Dronten: { center: [52.525, 5.718], zoom: 13 },
  Biddinghuizen: { center: [52.456, 5.690], zoom: 14 },
  Swifterbant: { center: [52.572, 5.640], zoom: 14 }
};

// Safe LatLng validation helper
const isValidCoord = (lat?: number, lng?: number): boolean => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng);
};

// Component to handle map view updates smoothly
const MapViewController: React.FC<{
  targetProject: Project | null;
  targetKern: string | null;
}> = ({ targetProject, targetKern }) => {
  const map = useMap();

  useEffect(() => {
    try {
      if (targetProject?.coordinates && isValidCoord(targetProject.coordinates.lat, targetProject.coordinates.lng)) {
        map.flyTo([targetProject.coordinates.lat, targetProject.coordinates.lng], 14, {
          duration: 1.2
        });
      } else if (targetKern && KERN_COORDINATES[targetKern]) {
        const coord = KERN_COORDINATES[targetKern];
        if (coord?.center && isValidCoord(coord.center[0], coord.center[1])) {
          map.flyTo(coord.center, coord.zoom ?? 12, {
            duration: 1.2
          });
        }
      }
    } catch (err) {
      console.warn('Leaflet map flyTo safe fallback:', err);
    }
  }, [map, targetProject, targetKern]);

  return null;
};

// Custom Marker Generator with status colors and responsive styling
const createCustomMarkerIcon = (project: Project, isSelected: boolean, isHovered: boolean) => {
  const statusColors = {
    'Verkoop gestart': { bg: '#0A1202', border: '#D6F830', ping: 'rgba(214, 248, 48, 0.6)' },
    'In aanbouw': { bg: '#0f766e', border: '#14b8a6', ping: 'rgba(20, 184, 166, 0.6)' },
    'In voorbereiding': { bg: '#b45309', border: '#f59e0b', ping: 'rgba(245, 158, 11, 0.6)' },
    'Oriëntatie': { bg: '#1d4ed8', border: '#3b82f6', ping: 'rgba(59, 130, 246, 0.6)' },
    'Opgeleverd': { bg: '#334155', border: '#64748b', ping: 'rgba(100, 116, 139, 0.6)' }
  };

  const currentTheme = statusColors[project.status] || statusColors['Oriëntatie'];
  const shortTitle = project.title.split(' - ')[0].split(' (')[0];
  const activeClass = isSelected || isHovered;

  const html = `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer; transition: transform 0.2s ease;">
      ${
        activeClass
          ? `<span style="position: absolute; width: 48px; height: 48px; border-radius: 9999px; background: ${currentTheme.ping}; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.75;"></span>`
          : ''
      }
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        background: ${activeClass ? '#060B12' : '#0B1320'};
        color: #ffffff;
        padding: 6px 12px;
        border-radius: 9999px;
        border: 2px solid ${activeClass ? '#D6F830' : 'rgba(255, 255, 255, 0.15)'};
        box-shadow: ${activeClass ? '0 0 20px rgba(214, 248, 48, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.6)'};
        font-family: inherit;
        white-space: nowrap;
        transform: ${activeClass ? 'scale(1.12)' : 'scale(1)'};
        transition: all 0.2s ease;
      ">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: ${currentTheme.border}; box-shadow: 0 0 6px ${currentTheme.border};"></span>
        <span style="font-size: 11px; font-weight: 700; letter-spacing: -0.01em;">${shortTitle}</span>
        <span style="font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 6px; background: rgba(255, 255, 255, 0.08); color: #D6F830; border: 1px solid rgba(214, 248, 48, 0.3);">
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

export const OpenStreetMapSatellite: React.FC<OpenStreetMapSatelliteProps> = ({
  projects,
  selectedProject,
  hoveredProject,
  onSelectProject,
  onHoverProject
}) => {
  const [mapLayer, setMapLayer] = useState<'satellite' | 'osm'>('satellite');
  const [activeKernFilter, setActiveKernFilter] = useState<string>('Gemeente');

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

          {/* Kern Pills */}
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

        <MapViewController
          targetProject={selectedProject}
          targetKern={activeKernFilter}
        />

        {projects
          .filter((p) => p && isValidCoord(p.coordinates?.lat, p.coordinates?.lng))
          .map((project) => {
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
                <div className="p-1 min-w-[210px] text-slate-100">
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
                    <a
                      href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${project.coordinates.lat},${project.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-white/10"
                      title="Open Street View panorama in nieuwe tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Street View</span>
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
          <span className="text-slate-400 text-[11px]">
            OpenStreetMap & Satelliet (Luchtfoto) • {projects.length} locaties
          </span>
        </div>
      </div>
    </div>
  );
};

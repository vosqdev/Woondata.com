import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  BookOpen, 
  TrendingUp, 
  ArrowRight,
  Database,
  Building2,
  Users
} from 'lucide-react';
import { WonenInDrontenDataDashboard } from './WonenInDrontenDataDashboard';
import { WoonwaardenGrid } from './WoonwaardenGrid';
import { KnowledgePlatformSection } from './KnowledgePlatformSection';
import { WoonperspectiefSection } from './WoonperspectiefSection';

interface InzichtViewProps {
  onOpenQuickscan?: () => void;
  onNavigateToDevelopers?: () => void;
}

export const InzichtView: React.FC<InzichtViewProps> = ({
  onOpenQuickscan,
  onNavigateToDevelopers
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'marktdata' | 'woonwaarden' | 'kennisbank' | 'woonvisie'>('marktdata');

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900">
      
      {/* Dark Navy Header Banner */}
      <section className="bg-[#070D1C] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>BELEID, DATA &amp; ONDERZOEK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Woonmarkt &amp; inzicht
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Actueel en objectief inzicht in de woningbouwopgave, demografie, de 7 gemeentelijke Woonwaarden en markttrends in Dronten, Biddinghuizen en Swifterbant.
          </p>
        </div>
      </section>

      {/* Subtab Content */}
      <div>
        {activeSubTab === 'marktdata' && (
          <div className="animate-fadeIn">
            <WonenInDrontenDataDashboard 
              onBack={() => {
                if (onNavigateToDevelopers) onNavigateToDevelopers();
              }}
            />
          </div>
        )}

        {activeSubTab === 'woonwaarden' && (
          <div className="animate-fadeIn">
            <WoonwaardenGrid 
              backgroundImage="https://www.image2url.com/r2/default/images/1788464129594-e0860c93-a90d-4878-b5e6-d10d0cdd8bd4.webp"
            />
          </div>
        )}

        {activeSubTab === 'kennisbank' && (
          <div className="animate-fadeIn">
            <KnowledgePlatformSection 
              onOpenQuickscan={onOpenQuickscan}
            />
          </div>
        )}

        {activeSubTab === 'woonvisie' && (
          <div className="animate-fadeIn">
            <WoonperspectiefSection />
          </div>
        )}
      </div>

    </div>
  );
};

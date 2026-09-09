import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Lightbulb, 
  CheckSquare, 
  ArrowRight, 
  MapPin, 
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { IMPACT_CASES } from '../data/mockData';
import { Kern, ImpactCase } from '../types';

export const ImpactRegister: React.FC = () => {
  const [selectedKern, setSelectedKern] = useState<string>('Alle');

  const filteredCases = IMPACT_CASES.filter(
    (c) => selectedKern === 'Alle' || c.kern === selectedKern
  );

  return (
    <section className="py-16 sm:py-24 bg-[#070D1C] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Image with Clean Dark Overlay Filter */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://www.image2url.com/r2/default/images/1788079965120-dd102bbe-0e2d-4a09-ba58-215e6a8dcaad.jpeg"
          alt="Aantoonbare Impact & Transparantie Dronten"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Balanced filter for clear photo visibility and high text legibility */}
        <div className="absolute inset-0 bg-[#070D1C]/50 backdrop-contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/75 via-transparent to-[#070D1C]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#070D1C]/90 text-[#C9F31D] border border-white/15 mb-4 shadow-sm backdrop-blur-md font-display">
              <CheckSquare className="w-3.5 h-3.5 text-[#C9F31D]" />
              <span>Aantoonbare Impact & Transparantie</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Dit hoorden we • Dit adviseerden we • Dit is gedaan
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mt-2 leading-relaxed font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Participatie zonder vrijblijvendheid. Bekijk hoe opmerkingen uit het woonwensenpanel hebben geleid tot concrete aanpassingen in bestemmingsplannen en nieuwbouwontwerpen.
            </p>
          </div>

          {/* Kern Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full self-start md:self-auto shadow-lg border border-slate-200 font-display">
            {['Alle', 'Dronten'].map((k) => (
              <button
                key={k}
                onClick={() => setSelectedKern(k)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                  selectedKern === k
                    ? 'bg-[#070D1C] text-[#C9F31D] shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Impact Cards Grid */}
        <div className="space-y-6">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all relative group overflow-hidden"
            >
              {/* Case Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#070D1C] text-[#C9F31D] text-xs font-black rounded-full font-display uppercase tracking-wider shadow-xs">
                    {c.kern}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 font-display tracking-tight">
                    {c.project}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    ({c.year})
                  </span>
                </div>

                <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full border font-display ${
                  c.status === 'Gerealiseerd' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                  c.status === 'In uitvoering' 
                    ? 'bg-blue-50 text-blue-800 border-blue-200' :
                    'bg-slate-100 text-slate-800 border-slate-200'
                }`}>
                  {c.status}
                </span>
              </div>

              {/* 3 Steps Pipeline Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {/* 1. Dit hoorden we in het panel */}
                <div className="space-y-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-300">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wider font-display">
                    <MessageSquare className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>1. Dit hoorden we in het panel</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {c.watWeHoorden}
                  </p>
                </div>

                {/* 2. Dit adviseerde het platform */}
                <div className="space-y-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-300">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider font-display">
                    <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>2. Dit adviseerde het platform</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {c.watWeAdviseerden}
                  </p>
                </div>

                {/* 3. Dit is ermee gedaan */}
                <div className="space-y-2.5 bg-[#070D1C] text-white border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md transition-all">
                  <div className="flex items-center gap-2 text-xs font-black text-[#C9F31D] uppercase tracking-wider font-display">
                    <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
                    <span>3. Dit is ermee gedaan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                    {c.watIsGedaan}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


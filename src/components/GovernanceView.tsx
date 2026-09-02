import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  FileCheck2, 
  Scale, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle,
  Building,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  return (
    <section id="governance" className="py-20 bg-[#060B12] text-white border-b border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D6F830]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D6F830]/15 text-[#D6F830] border border-[#D6F830]/30 mb-3 shadow-[0_0_12px_rgba(214,248,48,0.15)] font-display">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Onafhankelijkheidsstatuut & Privacyprotocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Governance, Dataveiligheid en Onafhankelijkheid
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Betrouwbaar advies ontstaat alleen met strikte scheiding van belangen. Het platform hanteert een transparant onafhankelijkheidsstatuut en AVG-datamodel.
          </p>
        </div>

        {/* 4 Governance Organs (PDF Chapter 6.2) */}
        <div className="mb-14">
          <div className="text-xs font-bold text-[#D6F830] uppercase tracking-wider mb-4 flex items-center gap-2 font-display">
            <span className="w-2 h-2 rounded-full bg-[#D6F830] animate-pulse" />
            <span>Bestuurlijke Inrichting (PDF Hoofdstuk 6.2)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Bestuur Platform */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Bestuur Platform</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Rol:</strong> Koers, middelen, dienstverlening en kwaliteitsbewaking.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <strong className="text-slate-300">Samenstelling:</strong> De drie initiatiefnemers met strikt gescheiden portefeuilles.
              </div>
            </div>

            {/* 2. Onafhankelijke Onderzoeksraad */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-[#D6F830]/30 rounded-2xl p-5 space-y-3 hover:border-[#D6F830]/50 transition-all shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D6F830]/10 rounded-full blur-xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-[#D6F830]/20 text-[#D6F830] border border-[#D6F830]/30 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Onderzoeksraad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Rol:</strong> Toetst onderzoeksmethodiek, representativiteit en publicatiekwaliteit.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <strong className="text-slate-300">Samenstelling:</strong> Onafhankelijk onderzoeker, woningcorporatie, bewoners- en gebiedsexpertise.
              </div>
            </div>

            {/* 3. Datasteward */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-white">Datasteward</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Rol:</strong> Beheert definities, autorisaties, datakwaliteit en bewaartermijnen.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <strong className="text-slate-300">Samenstelling:</strong> Aangewezen functionaris, functioneel onafhankelijk van verkoopteams.
              </div>
            </div>

            {/* 4. Woningmarktberaad */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-slate-300 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-sm font-bold text-white">Woningmarktberaad</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Rol:</strong> Prioriteren, besluiten volgen en gezamenlijke acties afspreken.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <strong className="text-slate-300">Samenstelling:</strong> Gemeente Dronten, marktpartijen, corporaties en maatschappelijke partners.
              </div>
            </div>
          </div>
        </div>

        {/* 6 Privacy & Firewall Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D6F830] uppercase tracking-wider font-display">
              <Lock className="w-4 h-4" />
              Privacy- & AVG-Principes (Par. 6.1)
            </div>
            <h3 className="text-xl font-bold text-white">
              De Chinese Wall tussen Onderzoek en Verkoop
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Om het vertrouwen van inwoners, gemeenteraad en ontwikkelaars te waarborgen, gelden onwrikbare datagrenzen:
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#D6F830] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Gescheiden toestemming:</strong> Woononderzoek, projectnieuwsbrieven en verkooptoewijzing vereisen elk een aparte, niet-aangevinkte opt-in.
                </span>
              </div>
              <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#D6F830] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Uitsluitend geaggregeerde rapportage:</strong> Resultaten worden nooit op individueel niveau gedeeld met makelaars of ontwikkelaars.
                </span>
              </div>
              <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#D6F830] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Pseudonimisering:</strong> Onderzoeksbestanden worden ontdaan van herleidbare persoonsgegevens conform de AVG-handleiding.
                </span>
              </div>
            </div>
          </div>

          {/* Vovon Development Role Card */}
          <div className="lg:col-span-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D6F830] uppercase tracking-wider font-display">
              <Sparkles className="w-4 h-4 text-[#D6F830]" />
              Rol van Vovon Development (PDF Hoofdstuk 10-12)
            </div>
            <h3 className="text-xl font-bold text-white">
              Onafhankelijke Procesregisseur & Data-partner
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vovon Development treedt op als de onafhankelijke strategische schakel tussen Nieuwbouw Dronten, de gemeente, ontwikkelaars en onderzoeksinstellingen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">Gebiedsontwikkeling</div>
                <p className="text-[11px] text-slate-400">Verbindt marktvraag met locatiekwaliteit en gemeentelijke doelen.</p>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">Verantwoorde AI</div>
                <p className="text-[11px] text-slate-400">Analyse van duizenden open antwoorden met menselijke eindcontrole.</p>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">Procesregie Beraad</div>
                <p className="text-[11px] text-slate-400">Faciliteert de 5-stappen cyclus van signaal naar beleid.</p>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-0.5">Kennisdeling</div>
                <p className="text-[11px] text-slate-400">Periodieke kwaliteitsborging en kwartaalrapportages.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


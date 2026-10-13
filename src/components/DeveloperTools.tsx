import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Info,
  X,
  Phone,
  Mail,
  Calendar,
  Send,
  Lock,
  ExternalLink,
  ChevronRight,
  Clock,
  FileCheck,
  Search,
  Sliders,
  BarChart2,
  BarChart3,
  Users2,
  Compass,
  CheckCircle2,
  Target,
  Trees,
  HeartHandshake,
  Users,
  Leaf,
  TrendingUp,
  Zap,
  BookOpen,
  FileText,
} from 'lucide-react';

interface DeveloperToolsProps {
  onNavigateToWoonwaarden?: () => void;
  onOpenPortal?: () => void;
  onOpenBuurtPaspoort?: () => void;
  onOpenWoningmarktData?: () => void;
  onOpenRealtimeDashboard?: () => void;
  onOpenOntdekPlatform?: () => void;
}

export const DeveloperTools: React.FC<DeveloperToolsProps> = ({
  onNavigateToWoonwaarden,
  onOpenPortal,
  onOpenBuurtPaspoort,
  onOpenWoningmarktData,
  onOpenRealtimeDashboard,
  onOpenOntdekPlatform
}) => {
  // Contact Dialog State
  const [contactSubject, setContactSubject] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    planLocation: 'Dronten',
    notes: ''
  });

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const formObj = new FormData(formEl);
      const netlifyData = new URLSearchParams();

      formObj.forEach((val, key) => {
        netlifyData.append(key, val.toString());
      });

      netlifyData.set('form-name', 'contact-advies');
      netlifyData.set('ontvanger', 'aanvraag@woondata.com');
      netlifyData.set('onderwerp', `Nieuwe aanvraag Contact & Advies: ${contactSubject || 'Algemeen'} (${formData.organization || formData.name})`);
      netlifyData.set('onderwerp_keuze', contactSubject || 'Algemene kennismaking & planadvies');
      netlifyData.set('naam', formData.name.trim());
      netlifyData.set('organisatie', formData.organization.trim());
      netlifyData.set('plangebied', formData.planLocation);
      netlifyData.set('email', formData.email.trim());
      netlifyData.set('telefoon', formData.phone.trim() || 'Niet ingevuld');
      netlifyData.set('toelichting', formData.notes.trim() || 'Geen toelichting opgegeven');

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyData.toString(),
      });

      if (!res.ok) {
        console.warn('Netlify contact submit status:', res.status, res.statusText);
      }
    } catch (err) {
      console.warn('Netlify contact submit fallback (preview/lokaal):', err);
    } finally {
      setIsSubmitting(false);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactSubject(null);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          planLocation: 'Dronten',
          notes: ''
        });
      }, 3500);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-slate-900 selection:bg-[#C9F31D] selection:text-black">
      
      {/* ========================================================= */}
      {/* 1. HERO INTRODUCTIE                                       */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 border-b border-slate-800/80 bg-[#080E1B] overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.image2url.com/r2/default/images/1788079965120-dd102bbe-0e2d-4a09-ba58-215e6a8dcaad.jpeg"
            alt="Woningbouwontwikkeling Dronten"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.05] transform scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1B]/80 via-[#080E1B]/55 to-[#080E1B]/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080E1B]/40 via-transparent to-[#080E1B]/75" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 lg:gap-12">
            <div className="max-w-[750px]">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4 font-display">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D] shadow-[0_0_10px_#C9F31D]"></span>
                <span>Voor ontwikkelaars &amp; partners</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display">
                Van marktinzicht naar een beter woningbouwplan
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed font-normal">
                Onderbouw plannen met actuele woonwensen, regionale marktdata en gevalideerde vraagbehoefte in Dronten, Biddinghuizen en Swifterbant.
              </p>
            </div>

            {/* Knop Neem contact op: rechts naast de tekst, niet eronder */}
            <div className="shrink-0 md:pb-1">
              <button
                onClick={() => {
                  setContactSubject('Algemene kennismaking & planadvies');
                  scrollToSection('contact-advies');
                }}
                className="px-6 py-3.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-slate-950 text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer font-display shadow-[0_0_20px_rgba(201,243,29,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-slate-950" />
                <span>Neem contact op</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. AFBEELDING 1: DATA DIE BOUWT AAN WONEN & BOUWEN        */}
      {/* ========================================================= */}
      <section id="data-bouwt" className="py-20 sm:py-28 bg-[#FFFFFF] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
            <div className="lg:col-span-6 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.1] font-display">
                Data die bouwt <br />
                aan wonen en <br />
                <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">woningbouw</span>
              </h2>
              <div className="pt-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-display flex items-center gap-2">
                <span className="font-extrabold text-[#080E1B]">WONEN • BOUWEN • DATA</span>
                <span>•</span>
                <span>DRONTEN &amp; REGIO</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Woondata brengt actuele woningbouw, woonwensen en marktdata samen in één onafhankelijk platform. Van vraag, aanbod en verhuisbewegingen tot plancapaciteit, bestemmingsplannen en vergunningen — zodat inwoners, gemeente en ontwikkelaars sneller en doordachter bouwen aan de juiste woningen op de juiste plek.
              </p>
            </div>
          </div>

          {/* 4 Feature Cards Grid: Wonen - Bouwen - Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Woningmarktdata */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Woningmarktdata
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Actuele marktcijfers, transactieprijzen, WOZ-trends en vraag- en aanbodverhoudingen per wijk en kern.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    50+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Databronnen (CBS, Kadaster, Funda, WOZ)
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Onafhankelijke data
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Woningbouw & Plannen */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Woningbouw &amp; Plannen
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Monitoring van de bouwopgave, plancapaciteit, kavels, faseringen en vergunningen van initiatief tot oplevering.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    3.309
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Woningen bouwopgave (tot 2030)
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    18+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Actieve projecten &amp; locaties
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Woonwensen & Behoefte */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Woonwensen &amp; Behoefte
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Inzicht in wat inwoners écht zoeken: starters, gezinnen, senioren, gewenste woningtypen en prijsklassen.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    100+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Betrokken inwoners in woonpanel
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    3 kernen
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Dronten, Biddinghuizen &amp; Swifterbant
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Participatie & Draagvlak */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Participatie &amp; Draagvlak
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Actuele input uit de Woonwensenscan, co-creatie reacties en bewonerswensen om bezwaarrisico&apos;s en procedures vooraf te minimaliseren.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    6
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Participatieniveaus (Omgevingswet)
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Draagvlak- en omgevingsdialoog
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>


      {/* ========================================================= */}
      {/* 6. CTA ONDERAAN                                           */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-[#080E1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.image2url.com/r2/default/images/1788082088937-f93ce974-0653-46db-8114-d34a6f1ded62.jpg"
            alt="Locatie- & projectontwikkeling Dronten"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] saturate-[1.05] transform scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Lighter overlays just like homepage, balancing clear photo visibility with readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1B]/75 via-[#080E1B]/45 to-[#080E1B]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E1B]/60 via-transparent to-[#080E1B]/35" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-widest font-display block mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Directe Samenwerking
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Plan of locatie bespreken?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-2xl font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              We denken graag vroegtijdig mee over markt, programma, doelgroepen en de haalbaarheid van woningbouwplannen.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => setContactSubject('Plan of locatie bespreken')}
                className="px-7 py-3.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer font-display shadow-[0_0_20px_rgba(201,243,29,0.35)] hover:scale-[1.02]"
              >
                <span>Plan een gesprek</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT & AANVRAAG DIALOG                                 */}
      {/* ========================================================= */}
      {contactSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#0D1527] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-700 relative text-white">
            <button
              onClick={() => setContactSubject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-[#121829] text-[#C9F31D] border border-slate-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-extrabold text-white font-display">Aanvraag ontvangen</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto font-normal">
                  Bedankt voor uw bericht betreffende <strong>{contactSubject}</strong>. Onze adviseurs nemen binnen 1 werkdag contact met u op.
                </p>
              </div>
            ) : (
              <form 
                name="contact-advies"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleContactSubmit} 
                className="space-y-4"
              >
                {/* Hidden Netlify fields */}
                <input type="hidden" name="form-name" value="contact-advies" />
                <input type="hidden" name="ontvanger" value="aanvraag@woondata.com" />
                <input type="hidden" name="onderwerp" value={`Nieuwe aanvraag Contact & Advies: ${contactSubject || 'Algemeen'} (${formData.organization || formData.name})`} />
                <input type="hidden" name="onderwerp_keuze" value={contactSubject || 'Algemene kennismaking & planadvies'} />

                {/* Honeypot field for bot protection */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Niet invullen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9F31D] block font-display">
                    Contact &amp; Advies
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 font-display">
                    {contactSubject}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-normal">
                    Vul uw gegevens in en wij nemen spoedig contact met u op voor een inhoudelijk overleg.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Naam contactpersoon *
                    </label>
                    <input
                      type="text"
                      name="naam"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Bijv. Mark van Dijk"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Organisatie / Bedrijf *
                      </label>
                      <input
                        type="text"
                        name="organisatie"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Bijv. Bouwbedrijf X"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Plangebied / Kern
                      </label>
                      <select
                        name="plangebied"
                        value={formData.planLocation}
                        onChange={(e) => setFormData({ ...formData, planLocation: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      >
                        <option value="Dronten">Dronten (Kerneiland / De Gilden / West)</option>
                        <option value="Biddinghuizen">Biddinghuizen</option>
                        <option value="Swifterbant">Swifterbant</option>
                        <option value="Meerdere kernen">Meerdere kernen</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="naam@organisatie.nl"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        name="telefoon"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 - 12345678"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Korte toelichting of vraagstuk
                    </label>
                    <textarea
                      rows={2}
                      name="toelichting"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Beschrijf beknopt de locatie, gewenste woningtypologieën of toetsingsvraag..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setContactSubject(null)}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer font-display disabled:opacity-50"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer font-display shadow-[0_0_15px_rgba(201,243,29,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Versturen...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-black" />
                        <span>Verstuur Aanvraag</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

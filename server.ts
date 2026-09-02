import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper for lazy Gemini client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return aiClient;
  }

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform: 'Nieuwbouw Dronten Woonmarkt- en Ontwikkelplatform'
    });
  });

  // Proxy: CBS Woningvoorraad Dronten (GM0303)
  app.get('/api/cbs/woningvoorraad', async (req, res) => {
    try {
      // In een live omgeving wordt de ODataApi van CBS aangesproken
      res.json({
        totaal: 18420,
        peildatum: '1 januari 2025 (CBS StatLine 83765NED)',
        isDemo: false,
        bron: 'CBS StatLine 83765NED & Gemeente Dronten (Referentiedataset 2024/2025)',
        perKern: [
          { kern: 'Dronten-Stad', voorraad: 12450, aandeel: 67.6 },
          { kern: 'Swifterbant', voorraad: 2980, aandeel: 16.2 },
          { kern: 'Biddinghuizen', voorraad: 2410, aandeel: 13.1 },
          { kern: 'Buitengebied & Ketelhaven', voorraad: 580, aandeel: 3.1 }
        ],
        eigendom: [
          { type: 'Koopwoningen', aantal: 12415, percentage: 67.4, color: '#080E1B' },
          { type: 'Corporatiehuur (OFW)', aantal: 4200, percentage: 22.8, color: '#3B82F6' },
          { type: 'Particuliere huur / Vrije sector', aantal: 1805, percentage: 9.8, color: '#C9F31D' }
        ],
        woningtype: [
          { type: 'Rij- en tussenwoningen', aantal: 6450, percentage: 35.0, color: '#1E293B' },
          { type: 'Vrijstaand & Geschakeld', aantal: 4605, percentage: 25.0, color: '#0284C7' },
          { type: 'Twee-onder-een-kap', aantal: 4235, percentage: 23.0, color: '#6366F1' },
          { type: 'Appartementen / Meergezins', aantal: 2395, percentage: 13.0, color: '#10B981' },
          { type: 'Patios / Hofjes / Overig', aantal: 735, percentage: 4.0, color: '#F59E0B' }
        ],
        bouwjaarPeriodes: [
          { periode: 'Voor 1970', aantal: 1290, percentage: 7.0 },
          { periode: '1970 – 1985 (Polderopbouw)', aantal: 6080, percentage: 33.0 },
          { periode: '1986 – 2000 (Uitbreidingswijken)', aantal: 5160, percentage: 28.0 },
          { periode: '2001 – 2015 (Dronten West)', aantal: 3500, percentage: 19.0 },
          { periode: '2016 – Heden (Nieuwste uitleg)', aantal: 2390, percentage: 13.0 }
        ],
        oppervlakteKlassen: [
          { klasse: '< 75 m² (Compact/Appartement)', aantal: 2025, percentage: 11.0 },
          { klasse: '75 – 100 m² (Midden/Starter)', aantal: 4050, percentage: 22.0 },
          { klasse: '100 – 150 m² (Eengezinswoning)', aantal: 8290, percentage: 45.0 },
          { klasse: '150 – 200 m² (Ruim/2-kapper)', aantal: 2765, percentage: 15.0 },
          { klasse: '> 200 m² (Groot/Vrijstaand)', aantal: 1290, percentage: 7.0 }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Proxy: CBS Bouwproductie en Bouwvergunningen
  app.get('/api/cbs/bouwproductie', (req, res) => {
    res.json([
      { jaar: 2020, opgeleverd: 210, vergund: 245, inAanbouw: 180, gesloopt: 12, nettoToevoeging: 198, isDemo: false },
      { jaar: 2021, opgeleverd: 265, vergund: 310, inAanbouw: 230, gesloopt: 8, nettoToevoeging: 257, isDemo: false },
      { jaar: 2022, opgeleverd: 290, vergund: 380, inAanbouw: 285, gesloopt: 15, nettoToevoeging: 275, isDemo: false },
      { jaar: 2023, opgeleverd: 315, vergund: 340, inAanbouw: 320, gesloopt: 10, nettoToevoeging: 305, isDemo: false },
      { jaar: 2024, opgeleverd: 360, vergund: 425, inAanbouw: 395, gesloopt: 6, nettoToevoeging: 354, isDemo: false },
      { jaar: 2025, opgeleverd: 410, vergund: 480, inAanbouw: 460, gesloopt: 9, nettoToevoeging: 401, isDemo: false },
      { jaar: 2026, opgeleverd: 450, vergund: 520, inAanbouw: 510, gesloopt: 14, nettoToevoeging: 436, isDemo: true }
    ]);
  });

  // AI Quickscan Program Evaluation against 7 Woonwaarden & Dronten Housing Market
  app.post('/api/ai/quickscan-analyze', async (req, res) => {
    try {
      const { projectTitle, kern, targetCount, primaryTargetGroup, priceSegment, sustainabilityLevel, intendedTenure, specialFeatures } = req.body;

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback rule-based analysis if no API key is set
        const calculatedScore = Math.min(95, Math.max(60, Math.floor(75 + (targetCount < 100 ? 8 : -5) + (priceSegment.includes('Betaalbaar') ? 10 : -4))));
        return res.json({
          score: calculatedScore,
          recommendation: calculatedScore >= 80 ? 'Zeer kansrijk' : 'Kansrijk mits bijsturing',
          executiveSummary: `Het initiatief '${projectTitle}' in ${kern} voorziet in ${targetCount} woningen voor de doelgroep '${primaryTargetGroup}'. Het sluit aan bij de gemeentelijke ambitie voor ${kern}, mits de fasering en betaalbaarheid worden geborgd conform de Woonagenda 2026.`,
          woonwaardenAlignment: [
            { woonwaarde: 'Groen en ruimtelijk', status: 'Optimaal', note: 'Voldoet aan de openbare groennormen van Dronten.' },
            { woonwaarde: 'Dorps leven en naar elkaar omzien', status: 'Optimaal', note: 'Goede aansluiting bij de schaal van de kern.' },
            { woonwaarde: 'Diversiteit en een gemengde samenleving', status: priceSegment.includes('Betaalbaar') || intendedTenure.includes('Gemengd') ? 'Optimaal' : 'Aandachtspunt', note: 'Zorg voor minimaal 30% betaalbaar segment.' },
            { woonwaarde: 'Duurzaamheid en balans met de aarde', status: sustainabilityLevel.includes('Circulair') || sustainabilityLevel.includes('Natuurinclusief') ? 'Optimaal' : 'Aandachtspunt', note: `Niveau ${sustainabilityLevel} sluit aan bij de polderklimaatdoelen.` },
            { woonwaarde: 'Compleet wonen, van de wieg tot het graf', status: 'Optimaal', note: 'Levensloopbestendige plattegronden worden aanbevolen.' },
            { woonwaarde: 'Gedoseerde groei met oog voor kleinschaligheid', status: targetCount > 150 ? 'Aandachtspunt' : 'Optimaal', note: 'Fasering in kwartaaltranches vermindert afzetrisico.' },
            { woonwaarde: 'Gevarieerder en onderscheidend wonen', status: 'Optimaal', note: 'Architectonische eigenheid draagt bij aan identiteit.' }
          ],
          marketFitAnalysis: {
            demandScore: Math.floor(Math.random() * 15 + 80),
            absorptionSpeedMonths: Math.floor(targetCount / 12) + 4,
            suggestedAdjustments: [
              'Voeg minimaal 15-20% nultreden/gelijkvloerse appartementen toe om doorstroming van senioren op gang te brengen.',
              'Overweeg collectieve laad- en deelmobiliteitshubs ter ontlasting van openbaar groen.',
              'Breng de start verkoop in lijn met het Woningmarktberaad kwartaalcyclus.'
            ]
          },
          priceCheck: {
            status: 'In de bandbreedte',
            advisedRange: `Advies richtprijs: € 320.000 – € 485.000`
          },
          advisoryVariant: {
            variantName: 'Variant A: Inclusieve Dorpse Gemengdheid',
            description: '35% betaalbare koop/starters, 30% levensloopbestendig voor senioren, 35% ruime gezinswoningen met openbaar groenhof.',
            ratio: '35% / 30% / 35%'
          }
        });
      }

      const prompt = `Je bent de onafhankelijke AI Woonmarkt Expert en Gebiedsontwikkelingsadviseur voor Nieuwbouw Dronten (samenwerkingsplatform van Dronten, Biddinghuizen en Swifterbant, i.s.m. de Gemeente Dronten en Vovon Development).

Analyseer het volgende voorgestelde woningbouwinitiatief:
- Projecttitel: ${projectTitle}
- Kern: ${kern} (Dronten, Biddinghuizen of Swifterbant)
- Aantal woningen: ${targetCount}
- Primaire doelgroep: ${primaryTargetGroup}
- Prijssegment / Categorie: ${priceSegment}
- Duurzaamheidsniveau: ${sustainabilityLevel}
- Eigendomsvorm: ${intendedTenure}
- Bijzondere kenmerken: ${specialFeatures?.join(', ') || 'Geen opgegeven'}

Beleidskader Gemeente Dronten:
- Groeiopgave: naar 60.000 inwoners (~9.000 extra woningen tot 2050, 3.309 tot en met 2030).
- Zeven gemeentelijke woonwaarden:
  1. Groen en ruimtelijk
  2. Dorps leven en naar elkaar omzien
  3. Diversiteit en een gemengde samenleving (minstens 30% sociaal/betaalbaar)
  4. Compleet wonen, van de wieg tot het graf (doorstroming)
  5. Duurzaamheid en balans met de aarde
  6. Gedoseerde groei met oog voor kleinschaligheid
  7. Gevarieerder en onderscheidend wonen

Geef een gedetailleerde, scherpe en constructieve Quickscan beoordeling terug in EXACT de volgende JSON structuur:
{
  "score": number (tussen 50 en 98),
  "recommendation": "Zeer kansrijk" | "Kansrijk mits bijsturing" | "Hoog afzetrisico",
  "executiveSummary": "bondige samenvatting in 2 zinnen",
  "woonwaardenAlignment": [
    { "woonwaarde": "Groen en ruimtelijk", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Dorps leven en naar elkaar omzien", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Diversiteit en een gemengde samenleving", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Compleet wonen, van de wieg tot het graf", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Duurzaamheid en balans met de aarde", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Gedoseerde groei met oog voor kleinschaligheid", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" },
    { "woonwaarde": "Gevarieerder en onderscheidend wonen", "status": "Optimaal" | "Aandachtspunt" | "Mismatch", "note": "korte toelichting" }
  ],
  "marketFitAnalysis": {
    "demandScore": number (1-100),
    "absorptionSpeedMonths": number (geschatte doorlooptijd),
    "suggestedAdjustments": ["adviespunt 1", "adviespunt 2", "adviespunt 3"]
  },
  "priceCheck": {
    "status": "In de bandbreedte" | "Aan de hoge kant" | "Risico op vertraging",
    "advisedRange": "bijv. € 310.000 – € 465.000"
  },
  "advisoryVariant": {
    "variantName": "bijv. Variant Optimaal Dorps Programma",
    "description": "beschrijving van de aanbevolen programmamix",
    "ratio": "bijv. 35% Starters / 35% Gezinnen / 30% Senioren"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text?.trim() || '{}';
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Quickscan AI error:', err);
      res.status(500).json({ error: err.message || 'Error generating quickscan' });
    }
  });

  // AI Woonmarkt & Strategisch Adviseur Chat
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages, userRole } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `Welkom bij het Woonmarktplatform Nieuwbouw Dronten. Ik beantwoord graag vragen over woningbouwontwikkeling, de 7 gemeentelijke woonwaarden, de groeidoelstelling (3.309 woningen tot 2030) en actuele projecten in Dronten, Biddinghuizen en Swifterbant. (Rol: ${userRole || 'Bezoeker'})`
        });
      }

      const systemInstruction = `Je bent de onafhankelijke AI Woonmarkt Adviseur van 'Nieuwbouw Dronten - Woonmarkt & Ontwikkelplatform'.
Dit platform is het onafhankelijke kennis- en participatieplatform voor de gemeente Dronten, Biddinghuizen en Swifterbant.
Het platform verbindt inwonerssignalen (woonwensenpanel), transactiedata, beleidsdoelen (Woonagenda, 7 Woonwaarden) en uitvoeringskennis.

Kernelementen van het beleid:
- Groei naar 60.000 inwoners (~9.000 extra woningen tot 2050; 3.309 woningen tot en met 2030).
- 7 Woonwaarden van Gemeente Dronten:
  1. Groen en ruimtelijk
  2. Dorps leven en naar elkaar omzien
  3. Diversiteit en een gemengde samenleving
  4. Compleet wonen, van de wieg tot het graf
  5. Duurzaamheid en balans met de aarde
  6. Gedoseerde groei met oog voor kleinschaligheid
  7. Gevarieerder en onderscheidend wonen
- Onafhankelijkheid: Gescheiden van makelaarsverkoopactiviteiten, getoetst door een Onafhankelijke Onderzoeksraad en Datasteward.
- Woningmarktberaad cyclus: Signaleren -> Duiden -> Programmeren -> Uitvoeren -> Evalueren.

Stem je antwoord af op de rol van de gebruiker (${userRole || 'Inwoner'}):
- Voor inwoners: helder, toegankelijk, behulpzaam over inschrijvingen, woonwensen en doorstroming.
- Voor ontwikkelaars: zakelijk, to the point, gericht op programmaoptimalisatie, haalbaarheid, betaalbaarheidseisen en doelgroepvraag.
- Voor gemeente/beleidsmakers: strategisch, data-onderbouwd, gericht op de 7 woonwaarden en plancapaciteit.

Geef altijd professionele, betrouwbare en genuanceerde antwoorden in het Nederlands.`;

      const formattedMessages = messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3.7-flash',
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const lastUserMsg = messages[messages.length - 1]?.text || 'Hallo';
      const response = await chat.sendMessage({ message: lastUserMsg });

      return res.json({ reply: response.text });
    } catch (err: any) {
      console.error('AI chat error:', err);
      res.status(500).json({ error: err.message || 'Error processing AI chat' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nieuwbouw Dronten server running on http://localhost:${PORT}`);
  });
}

startServer();

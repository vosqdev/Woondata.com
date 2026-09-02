// PDOK & Geografische Service voor de Gemeente Dronten
export interface PdokLocation {
  id: string;
  name: string;
  type: 'kern' | 'wijk' | 'projectlocatie';
  coordinates: [number, number]; // [lat, lng]
  zoomLevel: number;
  description: string;
  woningAantalIndicatie?: number;
}

export const DRONTEN_LOCATIES: PdokLocation[] = [
  {
    id: 'dronten-centrum',
    name: 'Dronten (Centrum & Station)',
    type: 'kern',
    coordinates: [52.5255, 5.7196],
    zoomLevel: 13,
    description: 'Hoofdkern met hoogste voorzieningenniveau, station Hanzelijn en centrumuitbreiding.'
  },
  {
    id: 'dronten-west',
    name: 'Dronten West & De Gilden',
    type: 'wijk',
    coordinates: [52.5210, 5.6980],
    zoomLevel: 14,
    description: 'Groene, ruime woonwijk met veel eengezinswoningen en kavels.'
  },
  {
    id: 'dronten-noord',
    name: 'Dronten Noord (Hanzekwartier)',
    type: 'projectlocatie',
    coordinates: [52.5350, 5.7150],
    zoomLevel: 14,
    description: 'Belangrijkste transformatie- en nieuwbouwzone nabij station Dronten.'
  },
  {
    id: 'swifterbant',
    name: 'Swifterbant',
    type: 'kern',
    coordinates: [52.5700, 5.6350],
    zoomLevel: 13,
    description: 'Dorps en groen wonen met focus op levensloopgeschiktheid en jonge gezinnen.'
  },
  {
    id: 'biddinghuizen',
    name: 'Biddinghuizen',
    type: 'kern',
    coordinates: [52.4550, 5.6900],
    zoomLevel: 13,
    description: 'Hechte gemeenschap, veel recreatie en behoefte aan seniorenhofjes en betaalbare koop.'
  }
];

class PdokService {
  // Haal geografische centroiden en grenzen op
  getKernLocaties(): PdokLocation[] {
    return DRONTEN_LOCATIES;
  }

  // Zoek adres of locatie via PDOK Locatieserver (met fallback)
  async geocodeLocatie(query: string): Promise<[number, number] | null> {
    try {
      const url = `https://api.pdok.nl/bzk/locatieserver/v3/suggest?q=${encodeURIComponent(query + ' Dronten')}&rows=1`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.response?.docs?.length > 0) {
          const id = data.response.docs[0].id;
          const lookupRes = await fetch(`https://api.pdok.nl/bzk/locatieserver/v3/lookup?id=${id}`);
          if (lookupRes.ok) {
            const lookupData = await lookupRes.json();
            const doc = lookupData.response?.docs?.[0];
            if (doc?.centroide_ll) {
              const [lng, lat] = doc.centroide_ll.replace('POINT(', '').replace(')', '').split(' ').map(Number);
              return [lat, lng];
            }
          }
        }
      }
    } catch (e) {
      console.warn('PDOK geocoding lookup fallback:', e);
    }
    // Fallback naar centrum Dronten
    return [52.5255, 5.7196];
  }
}

export const pdokService = new PdokService();

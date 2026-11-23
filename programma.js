const statoProgramma = document.getElementById('stato-programma');
const grigliaEventi = document.getElementById('griglia-eventi');

function formattaData(dataIso) {
  const mappaDate = {
    '2026-06-12': 'Venerdì 12 giugno',
    '2026-06-13': 'Sabato 13 giugno'
  };
  return mappaDate[dataIso] || dataIso;
}

async function caricaProgramma() {
  // 1. Stato CARICAMENTO
  statoProgramma.textContent = 'Caricamento del programma...';
  grigliaEventi.innerHTML = '';

  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch('dati/eventi.json'),
      fetch('dati/sedi.json')
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error('Errore nel recupero dei file JSON');
    }

    const datiEventi = await rispostaEventi.json();
    const datiSedi = await rispostaSedi.json();

    // 2. Stato VUOTO
    if (!Array.isArray(datiEventi) || datiEventi.length === 0) {
      statoProgramma.textContent = 'Nessun evento in programma.';
      return;
    }

    // Pulisce il messaggio di caricamento prima di mostrare le schede
    statoProgramma.textContent = '';

    // 3. Stato SUCCESSO
    datiEventi.forEach((evento) => {
      const sedeTrovata = datiSedi.find((sede) => sede.id === evento.sede_id);
      const nomeSede = sedeTrovata ? sedeTrovata.nome : 'Sede da definire';

      const card = document.createElement('article');
      card.className = 'event-card';

      card.innerHTML = `
        <img src="${evento.immagine}" alt="${evento.immagine_alt}" width="900" height="600">
        <div class="event-body">
          <p class="event-meta">${formattaData(evento.data)} · ${evento.orario} · ${evento.categoria}</p>
          <h3>${evento.titolo}</h3>
          <p>${evento.descrizione}</p>
          <p class="event-place"><strong>Sede:</strong> ${nomeSede}</p>
        </div>
      `;

      grigliaEventi.appendChild(card);
    });
  } catch (errore) {
    // 4. Stato ERRORE
    console.error(errore);
    statoProgramma.textContent = 'Il programma non è disponibile.';
  }
}

caricaProgramma();
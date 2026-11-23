const riquadroMeteo = document.getElementById('riquadro-meteo');

const URL_METEO =
  'https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome';

async function caricaMeteoTorino() {
  try {
    const risposta = await fetch(URL_METEO);

    if (!risposta.ok) {
      throw new Error('Risposta non valida dal servizio meteo');
    }

    const dati = await risposta.json();
    const attuale = dati.current;
    const unita = dati.current_units;

    // Estrae l'orario dal formato ISO (es. "2026-11-23T14:30" -> "14:30")
    const oraRilevazione = attuale.time ? attuale.time.split('T')[1] : '';

    riquadroMeteo.innerHTML = `
      <p><strong>Temperatura attuale:</strong> ${attuale.temperature_2m} ${unita.temperature_2m}</p>
      <p><strong>Velocità del vento:</strong> ${attuale.wind_speed_10m} ${unita.wind_speed_10m}</p>
      <p class="event-meta">Rilevazione attuale a Torino${oraRilevazione ? ` (ore ${oraRilevazione})` : ''}, non previsione per le date del festival.</p>
      <p class="event-meta">Fonte dati: <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a> (licenza CC BY 4.0).</p>
    `;
  } catch (errore) {
    console.error(errore);
    riquadroMeteo.innerHTML = `
      <p>Condizioni meteo a Torino al momento non disponibili.</p>
    `;
  }
}

caricaMeteoTorino();
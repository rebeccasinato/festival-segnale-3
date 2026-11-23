# Resoconto del lavoro con l'AI — Segnale

## Sessione 1 — 23 novembre 2026

### 1. Strutturazione dei dati JSON (`dati/sedi.json` e `dati/eventi.json`)
* **Richiesta:** Completare i file parziali `sedi.json` (solo sede 1) ed `eventi.json` (solo eventi 1 e 4) forniti nello ZIP, inserendo le altre due sedi e i restanti quattro eventi estratti dal mio `programma.html` senza rinumerare gli ID.
* **Proposta AI:** Generazione dei due array JSON completi con 3 sedi (`id` 1, 2, 3) e 6 eventi (`id` da 1 a 6) collegati tramite la chiave esterna `sede_id`.
* **Azione e verifica:** Ho copiato solo la cartella `dati/` nella mia repository esistente senza sovrascrivere i file HTML/CSS già realizzati. Ho incollato i JSON completi e verificato la corrispondenza di titoli, orari, percorsi delle immagini e attributi `alt`.

### 2. Documentazione dello schema relazionale (`dati/SCHEMA.md`)
* **Richiesta:** Scrivere lo schema dati in formato Mermaid `erDiagram` e documentare entità, campi, chiavi primarie/esterne, relazione e modalità di utilizzo nella pagina.
* **Proposta AI:** Struttura completa del file `SCHEMA.md` con relazione `SEDE ||--o{ EVENTO : ospita`, elenco dei campi con tipi ed esempi, e nota sul flusso di aggiornamento.
* **Azione e verifica:** Ho creato il file `dati/SCHEMA.md` e completato le sezioni finali su quantità (6 eventi, 3 sedi) e gestione editoriale, verificando che non ci fossero campi extra inventati rispetto alle specifiche.

### 3. Generazione dinamica del programma (`programma.html` e `programma.js`)
* **Richiesta:** Sostituire le schede statiche in `programma.html` con un caricamento dinamico via JavaScript dai file JSON, gestendo i quattro stati previsti (caricamento, successo, elenco vuoto, errore o `sede_id` inesistente).
* **Proposta AI:** Rimozione delle card statiche in `programma.html` lasciando vuoto il contenitore `#griglia-eventi` e creazione di `programma.js` con `Promise.all` e `fetch` sui due file JSON.
* **Azione e verifica:** Ho aggiornato `programma.html` e creato `programma.js`. Ho aperto la pagina tramite Live Preview controllando nel pannello Network lo stato `200` per entrambi i JSON, la comparsa delle 6 schede e il comportamento in caso di `sede_id` non valido (*"Sede da definire"*), array vuoto `[]` e file mancante.

### 4. Integrazione meteo in tempo reale (`info.html` e `meteo.js`)
* **Richiesta:** Aggiungere in `info.html` un riquadro con le condizioni meteo attuali a Torino usando l'API pubblica Open-Meteo, indicando la licenza e gestendo eventuali errori solo dentro il riquadro.
* **Proposta AI:** Inserimento della sezione `#riquadro-meteo` in `info.html` e creazione dello script `meteo.js` con chiamata singola all'endpoint Open-Meteo per le coordinate di Torino (`45.0703, 7.6869`), visualizzando `temperature_2m`, `wind_speed_10m`, orario di rilevazione e fonte `Open-Meteo (CC BY 4.0)`.
* **Azione e verifica:** Ho verificato con Live Preview che i dati reali vengano mostrati correttamente e che, simulando un indirizzo API errato, l'errore resti confinato al riquadro meteo senza compromettere galleria Swiper e mappa uMap.
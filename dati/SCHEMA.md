# Schema dati — Festival Segnale

## 1. Entità e campi

### SEDE (`dati/sedi.json`)
Rappresenta gli spazi fisici in cui si svolgono gli appuntamenti del festival.
* **id** (numero, chiave primaria): identificativo univoco della sede (es. `1`).
* **nome** (testo): denominazione dello spazio (es. `"Officina Nord — Sede centrale"`).
* **indirizzo** (testo): via, numero civico e città della sede (es. `"Corso Duca degli Abruzzi 24, Torino"`).

### EVENTO (`dati/eventi.json`)
Rappresenta i singoli appuntamenti in calendario.
* **id** (numero, chiave primaria): identificativo univoco dell'evento (es. `1`).
* **titolo** (testo): nome dell'appuntamento (es. `"Lettere in movimento"`).
* **data** (testo, formato ISO `AAAA-MM-GG`): giorno di svolgimento (es. `"2026-06-12"`).
* **orario** (testo, formato `HH:MM`): ora di inizio (es. `"10:00"`).
* **categoria** (testo): tipologia di appuntamento (es. `"Incontro"`, `"Laboratorio"`, `"Mostra"`).
* **descrizione** (testo): testo introduttivo sull'attività (es. `"Come cambia un messaggio quando cambiano le lettere?..."`).
* **immagine** (testo): percorso relativo dell'illustrazione (es. `"assets/lettere-in-movimento.svg"`).
* **immagine_alt** (testo): testo alternativo descrittivo per l'accessibilità (es. `"Lettere geometriche disposte su una griglia"`).
* **sede_id** (numero, chiave esterna): riferimento all'`id` della sede ospitante in `sedi.json` (es. `1`).

## 2. Chiavi e relazione
* **Chiavi primarie:** `id` in `SEDE` e `id` in `EVENTO`[cite: 20].
* **Chiave esterna:** `sede_id` in `EVENTO`, che collega ciascun appuntamento alla rispettiva sede[cite: 20].
* **Relazione:** Una sede può ospitare zero o più eventi; ogni evento si svolge in una sola sede[cite: 20].

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        number id
        string nome
        string indirizzo
    }
    EVENTO {
        number id
        string titolo
        string data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine_alt
        number sede_id
    }

    ## 3. Quantità e gestione
- **Quantità:** Il dataset attuale contiene **6 eventi** e **3 sedi**[cite: 9].
- **Chi aggiorna i dati e come:** L'organizzazione del festival aggiorna direttamente i file JSON nella cartella `dati/` tramite editor di testo (VS Code) e li pubblica sulla repository GitHub, senza dover modificare la struttura HTML delle pagine.

## 4. Utilizzo nella pagina
La pagina `programma.html` carica entrambi i file JSON tramite JavaScript (`programma.js`), incrocia `sede_id` con `id` delle sedi e genera dinamicamente le schede degli appuntamenti mostrando data, orario, categoria, titolo, immagine, descrizione e il nome della sede ospitante[cite: 11, 12].
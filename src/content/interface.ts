import type { Language } from './scenarios';
export const interfaceText = {
  de: {
    brand: 'Schritt für Schritt', descriptor: 'Anleitung für den Notfall', simulation: 'Dieser Prototyp wurde vollständig mit KI erstellt.',
    language: 'Sprache wählen', themeDark: 'Dunkle Ansicht aktivieren', themeLight: 'Helle Ansicht aktivieren', skip: 'Zum Inhalt',
    eyebrow: 'SIMULIERTE NOTFALLSITUATIONEN', headline: 'Eine klare Handlung.\nSchritt für Schritt.', intro: 'Wähle eine Situation. Die Anleitung zeigt dir, was du als Nächstes tun sollst.',
    choose: 'Situation auswählen', scenario: 'SZENARIO', open: 'Szenario öffnen', steps: 'Schritte',
    studyNote: 'Ein Forschungsprototyp für eine begleitete Studie. Keine echten Warnungen oder Notrufe.',
    privacy: 'Ohne Anmeldung. Ohne Standortzugriff. Ohne Aufzeichnung.', info: 'Hinweise zur Studie',
    back: 'Zurück', selection: 'Zur Szenarioauswahl', warning: 'SIMULIERTE WARNUNG', situation: 'Die Situation', start: 'Anleitung starten',
    before: 'Vor dem Start', studyContext: 'Diese Situation ist eine Übung. Führe die Handlungen nur im vorbereiteten Versuchsaufbau aus.',
    step: 'Schritt', of: 'von', pace: 'Du steuerst den Ablauf.', next: 'Weiter', finish: 'Anleitung abschliessen', navigation: 'Schrittnavigation',
    finishedEyebrow: 'ÜBUNG ABGESCHLOSSEN', finished: 'Die Anleitung ist abgeschlossen.', finishedText: 'Dieser simulierte Durchgang ist beendet. Die Studienleitung übernimmt jetzt.',
    notAllClear: 'Das ist keine Entwarnung für einen echten Notfall.', restart: 'Neuen Durchgang starten', review: 'Letzten Schritt ansehen',
    infoTitle: 'Über diesen Prototyp', infoIntro: 'Diese Anwendung wird in einer begleiteten Studie zu verständlichen Notfallanleitungen verwendet.',
    infoBody: 'Es gibt keine echten Warnungen, Anrufe, Standortabfragen oder automatische Messung. Die Studienleitung erfasst Zeit und Fehler separat. Sprache und Ansicht gelten nur für den aktuellen Durchgang.',
    infoOffline: 'Nach dem vollständigen ersten Laden funktioniert die veröffentlichte Anwendung auch offline. Die App-Dateien werden dafür lokal im Browser zwischengespeichert.',
    infoSafety: 'Der Versuchsaufbau muss vor Beginn geprüft und erklärt werden. Die Szenarien sind keine allgemeingültige Anleitung für echte Notfälle.',
    close: 'Schliessen', offlineReady: 'Offline verfügbar', offlineLoading: 'Offline-Version wird vorbereitet', offlineFailed: 'Offline-Version nicht verfügbar',
    stop: 'Du kannst die Übung jederzeit mit der Studienleitung beenden.', footer: 'Human-Centered Security & Privacy · Forschungsprototyp',
    version: 'PROTOTYP 01'
  },
  en: {
    brand: 'Step by step', descriptor: 'Emergency guidance', simulation: 'This prototype was created entirely with AI.',
    language: 'Choose language', themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode', skip: 'Skip to content',
    eyebrow: 'SIMULATED EMERGENCY SITUATIONS', headline: 'One clear action.\nStep by step.', intro: 'Choose a situation. The guide shows you what to do next.',
    choose: 'Choose a situation', scenario: 'SCENARIO', open: 'Open scenario', steps: 'steps',
    studyNote: 'A research prototype for a facilitated study. No real alerts or emergency calls.',
    privacy: 'No account. No location access. No tracking.', info: 'Study information',
    back: 'Back', selection: 'Back to scenario selection', warning: 'SIMULATED WARNING', situation: 'The situation', start: 'Start guide',
    before: 'Before you start', studyContext: 'This situation is a simulation. Only carry out the actions in the prepared study setting.',
    step: 'Step', of: 'of', pace: 'You control the pace.', next: 'Next', finish: 'Complete guide', navigation: 'Step navigation',
    finishedEyebrow: 'SIMULATION COMPLETE', finished: 'You have completed the guide.', finishedText: 'This simulated session has ended. The study facilitator will take over now.',
    notAllClear: 'This is not an all-clear for a real emergency.', restart: 'Start a new session', review: 'Review the last step',
    infoTitle: 'About this prototype', infoIntro: 'This application is used in a facilitated study on understandable emergency guidance.',
    infoBody: 'There are no real alerts, calls, location requests or automatic measurements. The study facilitator records time and errors separately. Language and theme apply only to the current session.',
    infoOffline: 'After the first complete load, the published application also works offline. App files are cached locally in your browser for this purpose.',
    infoSafety: 'The study setting must be checked and explained before starting. These scenarios are not universal guidance for real emergencies.',
    close: 'Close', offlineReady: 'Available offline', offlineLoading: 'Preparing offline version', offlineFailed: 'Offline version unavailable',
    stop: 'You can stop the simulation with the study facilitator at any time.', footer: 'Human-Centered Security & Privacy · Research prototype',
    version: 'PROTOTYPE 01'
  }
} satisfies Record<Language, Record<string, string>>;

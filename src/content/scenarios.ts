export type Language = 'de' | 'en';
export type Localized = Record<Language, string>;
export type IllustrationName = 'landslide' | 'flood' | 'exit' | 'sideways' | 'meeting' | 'wait' | 'stairs' | 'basement' | 'complete';
export type Step = { id: string; title: Localized; explanation: Localized; illustration: IllustrationName };
export type Scenario = { id: 'landslide' | 'flood'; number: string; name: Localized; summary: Localized; warning: Localized; situation: Localized; setup: Localized; illustration: IllustrationName; steps: Step[] };
const t = (de: string, en: string): Localized => ({ de, en });

// Source: project PDF, pp. 6–7. Safety decisions and study prerequisites:
// docs/SCENARIO_REVIEW.md. These are controlled study scripts, not live alerts.
export const scenarios: Scenario[] = [
  {
    id: 'landslide', number: '01', name: t('Erdrutsch', 'Landslide'), illustration: 'landslide',
    summary: t('Ein Hang gerät in Bewegung. Verlasse den gefährdeten Bereich.', 'A slope starts to move. Leave the area at risk.'),
    warning: t('Gefahr durch einen Erdrutsch', 'Landslide danger'),
    situation: t('Du bist zu Hause. Am nahen Hang sind Knacken und Rumpeln zu hören. Erde und Steine können abrutschen.', 'You are at home. You hear cracking and rumbling from a nearby slope. Earth and rocks may slide down.'),
    setup: t('Die Studienleitung zeigt dir vor dem Start den markierten Weg und den Treffpunkt.', 'Before you start, the study facilitator shows you the marked route and meeting point.'),
    steps: [
      { id: 'leave', illustration: 'exit', title: t('Verlasse das Haus.', 'Leave the house.'), explanation: t('Nutze den Ausgang, den dir die Studienleitung gezeigt hat. Halte dich nicht auf, um Dinge zu holen.', 'Use the exit the study facilitator showed you. Do not delay to collect belongings.') },
      { id: 'sideways', illustration: 'sideways', title: t('Gehe seitlich vom Hang weg.', 'Move sideways away from the slope.'), explanation: t('Folge dem markierten Weg quer zur Rutschrichtung. Der Weg führt aus dem gefährdeten Bereich.', 'Follow the marked route across the direction of the slide. It leads out of the area at risk.') },
      { id: 'meeting', illustration: 'meeting', title: t('Gehe zum markierten Treffpunkt.', 'Go to the marked meeting point.'), explanation: t('Der Treffpunkt liegt im Versuchsaufbau auf erhöhtem, stabilem Gelände abseits des Hangs.', 'In the study setup, the meeting point represents higher, stable ground away from the slope.') },
      { id: 'wait', illustration: 'wait', title: t('Bleibe am Treffpunkt.', 'Stay at the meeting point.'), explanation: t('Gehe nicht zum Haus zurück. Warte auf die weiteren Anweisungen der Einsatzkräfte, dargestellt durch die Studienleitung.', 'Do not return to the house. Wait for further instructions from emergency responders, represented by the study facilitator.') }
    ]
  },
  {
    id: 'flood', number: '02', name: t('Hochwasser', 'Flood'), illustration: 'flood',
    summary: t('Das Wasser steigt. Suche Schutz im oberen Stockwerk.', 'Water levels are rising. Take shelter on an upper floor.'),
    warning: t('Gefahr durch Hochwasser', 'Flood danger'),
    situation: t('Du bist im Erdgeschoss. Nach starkem Regen steigt der nahe Fluss. Die Strasse und der Keller sind bereits überflutet.', 'You are on the ground floor. After heavy rain, the nearby river is rising. The street and basement are already flooded.'),
    setup: t('Die Studienleitung zeigt dir vor dem Start den trockenen Weg ins obere Stockwerk.', 'Before you start, the study facilitator shows you the dry route to the upper floor.'),
    steps: [
      { id: 'basement', illustration: 'basement', title: t('Halte dich vom Keller fern.', 'Stay away from the basement.'), explanation: t('Der Keller steht unter Wasser. Dort besteht Lebensgefahr durch Wasser und Strom.', 'The basement is flooded. Water and electricity there can be life-threatening.') },
      { id: 'upstairs', illustration: 'stairs', title: t('Gehe in ein oberes Stockwerk.', 'Go to an upper floor.'), explanation: t('Nutze die trockene Treppe, die dir die Studienleitung gezeigt hat. Gehe nicht auf die überflutete Strasse.', 'Use the dry stairs the study facilitator showed you. Do not go onto the flooded street.') },
      { id: 'wait', illustration: 'wait', title: t('Bleibe im oberen Stockwerk.', 'Stay on the upper floor.'), explanation: t('Warte auf die weiteren Anweisungen der Einsatzkräfte, dargestellt durch die Studienleitung. Gehe nicht ins Wasser.', 'Wait for further instructions from emergency responders, represented by the study facilitator. Do not enter the water.') }
    ]
  }
];

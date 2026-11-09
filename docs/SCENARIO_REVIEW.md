# Prüfung der Szenarien / Scenario review

Stand / Reviewed: 09.11.2026. Status: **Entwurf für eine begleitete Simulation / Draft for a facilitated simulation.** No claim of emergency-service endorsement or safety certification.

## Quellen / Sources

- Supplied `human_centered_security_thingie.pdf`: p. 6 landslide, p. 7 flood; pp. 8–11 observation and classroom setup. The PDF's candidate Alertswiss messages are project drafts, not verified official messages.
- Supplied Figma screenshot: visual reference only. The design URL could not be retrieved. Generic headphone, closed-eye and emergency-call steps were not adopted.
- [Kanton Aargau: Hochwasser](https://www.ag.ch/de/themen/sicherheit/bevoelkerungsschutz/verhaltensempfehlungen/hochwasser), checked 09.11.2026: avoid flooded streets and buildings; leave ground/basement floors and wait upstairs.
- [Alertswiss: Gefahren kennen, Hochwasser](https://www.alert.swiss/de/vorsorge/gefahren-kennen.html), checked 09.11.2026: avoid basements, underground parking and waterways; follow authorities. This is a supporting cross-check, not an approved bespoke evacuation plan.

## Konflikte und Entscheidungen / Conflicts and decisions

1. **Flood: leaving versus sheltering.** PDF p. 7 describes an already flooded street and basement. Its checklist then says to leave the house and use an unspecified map, contradicting its own advice to move upstairs and avoid flooded streets. The app uses three actions: stay away from the basement, use the pre-checked dry stairs to an upper floor, stay upstairs awaiting instructions. There is no outdoor flood evacuation route. This interpretation is consistent with the Aargau guidance above.
2. **Landslide: acute danger versus packing.** PDF p. 6 asks for belongings, shoes and a jacket before evacuation, despite describing acute danger and immediate departure. Collecting items is omitted so the script does not encourage delay. The resulting four screens cover leaving the house, moving laterally on the marked path, going to the marked meeting point, and staying there. The immediate departure priority is an editorial interpretation of the PDF, not an independently certified local response plan.
3. **Landslide: evacuation versus sheltering in a building.** PDF p. 6 includes both alternatives without conditions. The app models only its intended, pre-briefed home-evacuation study. It cannot decide whether a real building is safe to leave or shelter in.
4. **Missing map.** Neither a safe route nor a real meeting point is supplied. No arbitrary map, street name, compass bearing or left/right turn is invented. The app explicitly references a physically marked route shown by the facilitator before the study. This is an operational prerequisite, not a GPS/navigation feature.
5. **Flood electrical controls.** The PDF's conditional suggestion to switch off power is omitted from the participant task: electrical access, dryness, competence and isolation are unspecified. The prototype never sends participants to a flooded electrical installation.
6. **Emergency calls and sensory steps.** No real call links, audio, headphones or closed-eye instructions are included. They are not necessary to the PDF's movement tasks. The prototype plays no siren, despite the PDF's simulated scenario description.
7. **Completion.** Completion means the simulated interaction is finished. It is explicitly not an all-clear. The final action remains waiting for responder instructions, represented in the study by the facilitator.

## Offene Punkte vor einer Studie / Unresolved prerequisites before a study

- The study team must approve the revised action order and both translations. No such sign-off has been provided.
- Landslide: physically define and inspect an exit, a route lateral to the simulated slide and a higher, stable meeting area away from the slope and waterways. An unspecified hill or generic upstairs direction is insufficient.
- Flood: establish the starting position on a dry ground floor and a dry, accessible route to a suitable upper floor. There is no instruction for a blocked stairway, an unsafe building, entrapment or a participant already in water. Those cases are outside this fixed script.
- Explain the classroom metaphor (PDF pp. 10–11) consistently. The same stairs cannot mean “toward the dangerous slope” and “safe upstairs refuge” without scenario-specific briefing. Check accessibility and agree how participants with mobility limitations take part before starting; no untested alternative route is implied.
- PDF p. 8 measures time to an outdoor meeting point for both scenarios. The revised flood endpoint is the designated upper-floor refuge. Update the observation checklist, timing endpoint and critical-error definitions before comparing conditions. Keep simulator completion clicks separate from physical task completion.
- Review simplified language and illustrations with intended participants. The source's broad autism characterizations must not substitute for individual access requirements.
- Validate these scripts with a qualified local emergency/planning professional before any use outside a controlled simulation. The app has no live situation assessment.

## Deutsche Kurzfassung

Die Hochwasser-Checkliste im PDF ist widersprüchlich. Der Prototyp führt deshalb über einen vorher geprüften trockenen Weg nach oben und niemals auf die überflutete Strasse. Beim Erdrutsch entfällt das verzögernde Sammeln von Gegenständen. Fluchtweg, seitliche Rutschrichtung und Treffpunkt müssen vor dem Versuch markiert und erklärt werden. Ein sicherer Weg, die Freigabe der Texte und die Eignung der Treppe sind noch nicht nachgewiesen. Vor dem Test muss die Studienleitung diese Punkte klären und die Messkriterien für das Hochwasser anpassen. Die Texte bleiben ein Simulationsentwurf.

# PetroVale SDN Design Workshop

Open `index.html` in a browser to run the learner experience.

This folder contains a self-contained web page for the second PetroVale Energy scenario. Learners take the role of SDN Network Architect and move through 33 one-way design decisions as PetroVale designs Cisco ACI for data center, Cisco SD-WAN for WAN, Cisco SD-Access for campus, and ISE/SGT policy for identity-based segmentation.

The left-side menu opens reference content on the right:

- Questions
- Company Background
- Current Network Diagram
- Scenario Updates

Thirteen curated scenario updates are released progressively across the 33 decisions. An update appears only when a stakeholder introduces a material constraint, technology misconception, operational risk, or governance requirement that changes how the related question should be assessed. Routine questions do not generate artificial context records.

The question set includes:

- Diagram-selection questions.
- Authentication-flow questions.
- Enforcement-point questions.
- Migration-diagram questions.
- Traffic-flow selection questions.
- Matrix, multi-select matrix, dropdown, ordering, single-choice, and multi-choice decisions.

Files:

- `index.html` - Chapter 2 design workshop web page.
- `styles.css` - layout, visual styling, diagram-choice styling, and latest-context highlight.
- `app.js` - one-way decision flow, scenario update unlocks, scoring, missed-decision review, and explanations.
- `assets/` - local SVG diagrams for the design scenario.
- `assessment-source.md` - source notes for the scenario and question set.

Learners can only move forward. The final screen shows score, missed decisions, recommended answers, and explanations.

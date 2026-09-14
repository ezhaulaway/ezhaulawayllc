# Interactive Trailer Pricing Guide

## What I’ll build
- Add an interactive trailer section to the pricing page.
- Divide the trailer into four selectable load levels: ¼, ½, ¾, and full.
- Reveal stacked junk inside the trailer as visitors hover, focus, or tap each level.
- Show the matching estimate beside the trailer:
  - Minimum pickup: $125
  - ¼ trailer: $200
  - ½ trailer: $400
  - ¾ trailer: $600
  - Full trailer: $800
- Include clear “estimated price” wording so visitors understand final quotes can vary by weight, access, and special disposal needs.

## Interaction and accessibility
- Desktop visitors can hover over trailer sections or use the load-size controls.
- Phone and tablet visitors can tap a load size.
- Keyboard visitors can select every level, with visible focus and readable labels.
- The selected fill amount and price will remain visible after selection.

## Visual direction
- Use a custom side-view trailer graphic styled to match the existing EZ Haulaway colors.
- Fill the trailer progressively from front to back with recognizable junk shapes.
- Add restrained transitions and respect reduced-motion settings.

## Technical details
- Create a focused React component for the trailer estimator and add it to the pricing page before the pricing principles.
- Use the project’s existing semantic color tokens and controls.
- Keep the estimator informational only; the existing quote flow remains unchanged.
- Verify desktop and mobile layouts and interactions in the live preview.

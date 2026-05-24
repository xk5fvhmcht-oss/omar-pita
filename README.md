# Omar Pita Master

**Science-verified pita bread calculator · PWA · offline-ready**

🫓 [Open the app](https://xk5fvhmcht-oss.github.io/omar-pita/)

---

## What it does

Omar Pita Master calculates precise ingredient quantities and a step-by-step timeline for baking pita bread. Every recommendation is driven by fermentation science — not fixed percentages copied from a recipe.

Set your batch size, fermentation plan, oven, and mixer. The app tells you exactly how much yeast and sugar to use, when to start each step, and what temperature to target for your dough.

---

## Features

**Science-verified fermentation model**
- Q10-based activity model calibrated to real bake data
- Dual formula toggle — new physics (suppF=0.518, K=0.493) vs v40 classic — for validation comparison during real-bake testing
- Fermentation potential meter with threshold markers and zone messages
- Room temperature and fridge temperature info boxes with live advice

**Dynamic yeast recommendation**
- Activity-driven calculation — bulk time, room temperature, fridge time, and fridge temperature all feed into one continuous model
- Linear ramp below 4h bulk anchored to published Middle Eastern pita recipe data (1.75% IDY at 1h/72°F)
- Q10 temperature adjustment throughout — cooler kitchen gets more yeast, warmer gets less
- ADY bloom warning — lower end of range when blooming, upper end when adding dry
- Correct ADY/IDY conversion — ADY always displays 1.333× IDY

**Dynamic sugar recommendation**
- Same activity model as yeast, same direction — more fermentation activity means less sugar needed
- Rapid same-day (1–2h): 2% sugar — needed for fast gas production and browning
- Long cold retard (4h bulk + 24h+): sugar graduates to zero for IDY, pinch for ADY bloom
- Sourdough mode: sugar removed entirely — LAB and wild yeast work on flour sugars only
- ADY floor: 0.25% minimum to support reliable bloom activation
- Scientifically grounded: sugar competes with flour maltose development in long ferments and is counterproductive for complex flavor development

**Precise water temperature**
- Desired dough temperature calculation (DDT) — 3-factor for yeasted, 4-factor for sourdough
- Newtonian cooling glide time to target temperature
- Ice calculation with correct latent heat physics when cold water is needed
- Dough temperature checkpoint — type in your actual post-mix temperature for real-time guidance

**Mixer-specific protocols**
- Spiral (Ooni Halo Pro), KitchenAid, hand, food processor
- Oil-last protocol for spiral, KA, and hand — gluten develops first
- Salt timing notes for spiral and KA
- Friction factor calibrated per mixer with real-world validation

**Timeline**
- Step-by-step schedule from bake time backwards
- Live countdown on every future step — turns red within 1 hour
- Past step detection with visual indicator
- ADY bloom step with timing guidance
- Oven-specific bake notes (baking steel vs Gozney)

**Bake journal**
- Save up to 20 bakes with all parameters and personal notes
- Reload any previous bake's settings instantly
- Export all entries to clipboard or text overlay for permanent storage in Notes

**Two themes**
- Artisan — warm, typographic, recipe-card feel
- Pro — precision mode with numerical data, formula config, and technical status bar

**PWA — works offline**
- Install to home screen from Safari: Share → Add to Home Screen
- Always open from the home screen icon for persistent storage

---

## Fermentation model

The app uses a Q10-based activity model:

```
activity = bulk × Q10(roomTemp) × 0.90 + fridgeHours × 0.518 × Q10(fridgeTemp)
```

**New physics (default):** suppF = 0.518 constant — Q10 alone handles temperature scaling. Old linear formula double-counted temperature, giving 1h RT = 27.7h fridge. Correct value is 1h RT = 6.9h fridge (literature: 6–8h).

**Yeast formula:** K = 0.493, calibrated to real bake anchor — 1.0g ADY for 10×110g pita, 4h/75°F bulk + 34h/39°F retard. Retard penalty max(0.15, 1/√(1+fH/12)) retained for enriched dough.

**v40 classic toggle:** K = 0.35, linear suppF — original empirical formula preserved for comparison during validation period.

---

## Recipe

Enriched dough — all quantities as baker's percentage of flour weight:

| Ingredient | % | Notes |
|---|---|---|
| Flour | 100% | Bread or AP |
| Water | 58–75% | Adjustable |
| Salt | 1.8% | |
| EVOO | 6% | Add after gluten develops |
| Milk powder | 4% | |
| Sugar | 0–2% | Activity-driven — see model |
| Mahlab | 0.5% | |

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Complete app — single file, all HTML/CSS/JS |
| `sw.js` | Service worker for offline caching |
| `apple-touch-icon.png` | Home screen icon |

---

## Version history

| Version | Key changes |
|---|---|
| v47.0 | Dynamic sugar graduation model — activity-driven, sourdough always 0% |
| v46.0 | Bake journal export — clipboard and text overlay for iOS PWA |
| v45.0 | Q10 temperature adjustment on linear ramp anchor |
| v44.0 | Linear ramp below 4h bulk — anchored to published pita recipe data |
| v43.0 | Fermentation potential rename, threshold markers, info box zone messages |
| v42.0 | Dual formula toggle, suppF=0.518, K=0.493, ACTIVITY_OVER=13.0 |
| v41.0 | Room/fridge info boxes, live countdown, dough temp checkpoint, bake journal |
| v40.0 | Retard penalty, K recalibration, fridge slider max 41°F |

---

## Validation

Real bake calibration point: 10×110g pita, 4h bulk at 75°F, 34h retard at 39°F.
- Confirmed upper bound: 2.6g ADY → blown out (over-fermented)
- New formula target: 1.0g ADY
- v40 classic reference: 1.21g ADY

Both formulas recommend less than half the yeast that caused the blown-out bake.

---

Built with Claude · Anthropic

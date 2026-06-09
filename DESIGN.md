# ASCEND Career Pathway — Design System

## Brand Identity
- **Product name:** ASCEND Career Pathway
- **Provider brand:** ASCEND Strategy Co.
- **Tagline:** From Chaos to Clarity. A Structured System for Your Success.
- **Tone:** Calm, confident, structured, results-oriented — premium executive aesthetic; execution-focused, not motivational

## Color Palette
| Role | Hex | Name |
|---|---|---|
| Primary Dark / Background | `#111111` | Deep Charcoal |
| Action Accent / CTA | `#C75B12` | Burnt Orange |
| Warm Background Tint / Cards | `#F5E9DC` | Soft Beige |
| Secondary Accent / Highlights | `#C9A86A` | Muted Gold |
| Surface | `#1A1A1A` | Dark Surface |
| Text Primary | `#F5E9DC` | Soft Beige |
| Text Secondary | `#9E9E9E` | Muted Grey |

## Typography
- **Primary font:** Inter (sans-serif) — clean, modern, professional
- **Headings:** Bold weight, tight tracking — commanding and structured
- **Body:** Regular weight, comfortable line-height for readability on mobile
- **Labels/Captions:** Small, uppercase, letter-spaced — tactical UI feel

## Elevation & Surfaces
- Dark layered surfaces: `#111111` base → `#1A1A1A` cards → `#222222` modals
- Subtle borders: `rgba(201,168,106,0.15)` gold tint for card edges
- No heavy drop shadows — use surface elevation and border tints instead
- Progress bars and badges use Burnt Orange or Muted Gold fill

## Components
- **Bottom navigation bar** — 5 tabs: Dashboard, Assessment, Roadmap, Resources, AI Strategist; icons + labels; active state uses Burnt Orange
- **Dashboard cards** — dark surface cards with a subtle gold border, Burnt Orange accent for priority items and next actions
- **Progress indicators** — linear progress bars in Burnt Orange fill on dark track; percentage labels in Muted Gold
- **Action buttons** — primary: Burnt Orange fill, white text, rounded corners; secondary: outlined with Muted Gold border
- **Assessment tiles** — card-based with icons, structured form inputs in dark surfaces
- **Roadmap timeline** — vertical timeline with phase nodes; completed = gold, active = orange, upcoming = grey
- **Resource cards** — icon + title + short description, tappable, dark surface
- **AI chat interface** — full-screen chat, user bubbles in Burnt Orange, AI bubbles in dark surface with gold text, sticky input bar at bottom

## Mobile-First Principles
- Minimum tap target: 44px
- Single-column layouts with 16px horizontal padding
- Sticky bottom navigation — always visible
- Cards and sections scroll vertically within each tab
- No horizontal scrolling
- Fast, minimal transitions — no decorative animations

## Anti-References
- No bright whites or light themes as primary
- No pastel or "soft coaching" aesthetics
- No excessive animations or gamification elements
- No cluttered dashboards — always lead with the single most important next action
Build the frontend and interactive client-side MVP for a hackathon product called:

# Reloop

Tagline:

"Find the next best life for every item."

==================================================
1. PRODUCT CONCEPT
==================================================

Reloop is a campus circular-economy platform.

Students can:

- BUY unused items
- SELL unused items
- EXCHANGE items
- DONATE items
- REPAIR items
- REFURBISH items
- UPCYCLE items
- RECYCLE items

Examples:

Nike jacket bought but cannot be returned
→ SELL to another student

Old textbook
→ SELL / EXCHANGE / DONATE

Broken hostel chair
→ REPAIR / UPCYCLE

Broken charger
→ REPAIR / PARTS RECOVERY / RECYCLE

Cardboard box
→ REUSE / DONATE / RECYCLE

The key product concept is:

### CIRCULAR DECISION ENGINE

The application determines the most appropriate next life for an item.

Possible outcomes:

SELL
EXCHANGE
DONATE
REPAIR
REFURBISH
UPCYCLE
RECYCLE

IMPORTANT:

For this Figma Make implementation, focus on:

- frontend
- UX/UI
- navigation
- client-side interactions
- mock/demo data
- realistic loading states
- polished visual storytelling
- simulated workflows

Do NOT attempt to build a complicated custom backend architecture.

Do NOT build:
- NestJS microservices
- Redis/BullMQ infrastructure
- Python backend
- Docker infrastructure
- production payment system
- complex external AI infrastructure

The backend will be completed later by another coding agent.

==================================================
2. FRONTEND STACK
==================================================

Use:

- Next.js / React
- TypeScript
- Tailwind CSS
- shadcn/ui where useful
- Framer Motion
- GSAP
- GSAP ScrollTrigger
- Lenis / @studio-freight/react-lenis if supported
- lucide-react

Use modular React components.

Keep business logic separated from presentation.

Use mock local data for now.

==================================================
3. DESIGN LANGUAGE
==================================================

Visual direction:

### "Neo-Brutalism meets Modern SaaS"

The product must feel:

- premium
- bold
- modern
- technical
- campus-oriented
- highly polished
- experimental
- playful without looking childish

Avoid:
- generic SaaS templates
- generic green sustainability dashboards
- excessive gradients
- soft neumorphism
- excessive glassmorphism
- generic AI dashboard aesthetics

==================================================
4. COLORS
==================================================

Background:

#F8F9FA

Alternative:

#F4F5F7

Black:

#111111

Primary:

#00DF81

Secondary:

Warm amber/yellow

Create CSS variables:

--background
--foreground
--primary
--accent
--muted
--border
--amber

==================================================
5. BORDERS / SHADOWS / SHAPES
==================================================

Major components:

2px–3px black borders

Use:

rounded-2xl
rounded-3xl

Primary hard shadow:

4px 4px 0 #000

Hover shadow:

7px 7px 0 #000

Use pill components for:
- status
- filters
- actions
- badges
- CTAs

==================================================
6. TYPOGRAPHY
==================================================

Use a distinctive geometric display font if available.

Preferred:

Cabinet Grotesk or similar

Body:

Inter or similar neutral sans-serif

Headers:
- bold
- tight
- large
- uppercase where appropriate

Use typography as part of the visual design.

==================================================
7. GLOBAL ANIMATION SYSTEM
==================================================

Use Framer Motion for:

- entrance animations
- hover states
- spring physics
- card interactions
- modal transitions
- menus
- filters
- microinteractions

Use:

stiffness: 400
damping: 25

On hover:

translateY: -4px

On click:

scale: 0.98

Use GSAP for:

- ScrollTrigger
- pinned sections
- scroll-scrubbed timelines
- complex scroll choreography

Use CSS keyframes for:

- infinite marquees
- simple looping decorative animation

Use Lenis for:

- smooth page scrolling

Do not use multiple animation libraries for the exact same effect.

==================================================
8. ACCESSIBILITY
==================================================

Respect:

prefers-reduced-motion

When reduced motion is enabled:

- reduce parallax
- disable custom cursor
- reduce scroll transformations
- simplify rotating elements
- keep content immediately readable

Ensure:
- keyboard navigation
- semantic elements
- visible focus
- accessible labels
- readable contrast
- touch-friendly controls

==================================================
9. CUSTOM CURSOR
==================================================

Create:

CustomCursor

Desktop only.

Use:
- useMotionValue
- useSpring

Render:
- inner dot
- outer trailing frame

Hover:
- expand
- change accent
- react to buttons/links

Click:
- scale

Disable on:
- mobile
- touch
- coarse pointer

Never block pointer events.

==================================================
10. SMOOTH SCROLLER
==================================================

Create:

SmoothScroller

Use Lenis if supported.

Target approximately:

lerp: 0.1
duration: 1.5
smoothWheel: true
wheelMultiplier: 1.2
touchMultiplier: 2

Scroll to top on initial page load.

Never interfere with:
- forms
- inputs
- dialogs
- modal scroll
- authentication
- native scroll containers

==================================================
11. BACKGROUND SYSTEM
==================================================

Create:

BackgroundShapes

and:

AmbientGlow

BackgroundShapes:
- blurred shapes
- translucent surfaces
- thin borders
- subtle rotation
- subtle vertical movement
- long easeInOut animation

AmbientGlow:
- radial mouse-following glow
- desktop only
- pointer-events-none
- transform-gpu

Also add subtle low-opacity architectural line art:

- campus buildings
- paths
- blocks
- geometric structures

Never interfere with content.

==================================================
12. CUSTOM SCROLL PROGRESS
==================================================

Create:

ScrollProgress

Right-side custom progress indicator.

Use:
- useScroll
- useSpring
- useTransform

Support:
- click to jump
- desktop drag
- ResizeObserver
- hide on touch

==================================================
13. LANDING PAGE
==================================================

Build this exact flow:

NAVBAR
↓
HERO
↓
STAT RIBBON
↓
DIAGONAL MARQUEE
↓
WHY Reloop
↓
STICKY SOP TIMELINE
↓
CIRCULAR DECISION ENGINE DEMO
↓
MARKETPLACE PREVIEW
↓
IMPACT PREVIEW
↓
TESTIMONIAL BENTO
↓
FINAL CTA
↓
KINETIC FOOTER

==================================================
14. FLOATING NAVBAR
==================================================

Create fixed centered pill navbar.

Use:
- backdrop blur
- black border
- rounded-full
- hard shadow

Links:

Marketplace
Analyze
Impact
How It Works
Login
Sign Up

Sign Up:
- mint
- black border
- hard shadow
- overlapping notification badge

Navbar becomes slightly more compact while scrolling.

==================================================
15. HERO
==================================================

Main headline:

"FIND THE NEXT BEST LIFE FOR EVERY ITEM."

Supporting message:

"Buy, sell, exchange, donate, repair, upcycle and recycle within your campus."

Primary CTA:

LIST AN ITEM

Secondary:

EXPLORE MARKETPLACE

Right side:

Create layered faux-3D system cards:

1.
LIVE TASKS
"5 items found nearby"

2.
CIRCULAR MATCH
"Nike Jacket → 94% Match"

3.
CIRCULAR DECISION
"Repair → Best Next Life"

Cards should:
- overlap
- rotate slightly
- use perspective
- use hard shadows
- use status pills
- respond to mouse movement

Use:
useMotionValue
useTransform
useSpring

==================================================
16. HERO TYPEWRITER
==================================================

Use subtle rotating copy:

SELL.
EXCHANGE.
REPAIR.
UPCYCLE.
RECYCLE.

Do not overuse.

==================================================
17. STAT RIBBON
==================================================

Show:

1,284
ITEMS RECIRCULATED

342
ITEMS REPAIRED

98
ITEMS UPCYCLED

₹2.4L
VALUE RECIRCULATED

Responsive:
desktop 4 columns
tablet 2 columns
mobile stacked

Animate counters on viewport entry.

==================================================
18. DIAGONAL MARQUEE
==================================================

Create multiple stacked ribbons.

Rotate approximately -3 degrees.

Alternate:
mint
amber

Use CSS infinite animation.

Text:

FIND A SECOND LIFE
RELOOP
KEEP IT CIRCULATING
SELL • REUSE • REPAIR • UPCYCLE

Avoid horizontal overflow except intentionally for the marquee.

==================================================
19. STICKY SOP TIMELINE
==================================================

Create:

"HOW Reloop WORKS"

Pinned split-screen section.

LEFT:

01 LIST
02 ANALYZE
03 FIND NEXT LIFE
04 TRACK IMPACT

RIGHT:

Dynamic visual UI cards.

Use GSAP ScrollTrigger:

pin: true
scrub: 1

Draw an SVG line connecting the steps.

Synchronize:
- line drawing
- card entrance
- card exit
- opacity
- small scale
- position

with scroll.

Ensure correct React cleanup.

==================================================
20. SOP DEMO CONTENT
==================================================

STEP 01:

LIST

Nike Jacket

Price:
₹3000

Action:
SELL

STEP 02:

ANALYZE

Clothing
New
High resale potential

STEP 03:

NEXT LIFE

SELL

96 Circular Score

12 potential matches

STEP 04:

IMPACT

Transferred to another student.

Passport updated.

==================================================
21. RADIAL EMBLEM
==================================================

Create SVG circular typography.

Use textPath:

"RELOOP • KEEP IT CIRCULATING •"

Rotate continuously 360 degrees.

Use as:
- hero decoration
- section badge
- CTA decoration

==================================================
22. BENTO TESTIMONIALS
==================================================

Create asymmetric masonry/bento cards.

Each has:

★★★★★

Quote

Name

Course / Year

Role/context

Example:

"Sold my unused jacket in one day."

CSE • 3rd Year

Use varying card sizes and accent colors.

Mobile:
single-column stack.

==================================================
23. KINETIC FOOTER
==================================================

Black footer.

Huge watermark:

CAMPUSLOOP

Oversized and slightly animated.

Utility links:

Marketplace
Analyze Item
Impact
How It Works
Login
Sign Up

Final CTA:

"GIVE YOUR NEXT ITEM A NEXT LIFE."

Use mint and amber accents.

==================================================
24. APPLICATION PAGES
==================================================

Build these frontend routes/pages:

/
Landing

/marketplace
Marketplace

/marketplace/[id]
Item detail

/list
Create listing

/analyze
Analyze item

/passport/[id]
Waste passport

/dashboard
Student dashboard

/impact
Impact

/map
Campus map

==================================================
25. MARKETPLACE UI
==================================================

Build a polished marketplace interface.

Filters:

Category
Price
Condition
Location
Operation

Operations:

SELL
EXCHANGE
DONATE

Cards should show:

- image
- item name
- price
- condition
- location
- seller
- operation
- circular score

Add:
- search
- save
- express interest

Use realistic seeded mock data.

==================================================
26. LISTING PAGE
==================================================

Create listing form:

Item name
Description
Category
Price
Condition
Operation
Image
Location

Use React Hook Form + Zod if available.

Add client-side validation.

Make it feel polished and intuitive.

==================================================
27. ITEM ANALYZER UI
==================================================

Create /analyze.

User can:
- upload image
- enter description

Display simulated analysis:

Category
Material
Condition
Reusability
Repairability
Upcyclability
Recyclability

Example:

Broken Chair

Furniture
Wood + Metal
Damaged

Repairability:
91%

Reusability:
84%

Upcyclability:
78%

Recyclability:
61%

Create an animated results panel.

==================================================
28. CIRCULAR DECISION ENGINE UI
==================================================

Implement the frontend representation of the engine.

It should show:

RECOMMENDED ACTION

REPAIR

Circular Score:

91 / 100

Reason:

"High repairability and strong reuse potential."

Alternatives:

UPCYCLE
RECYCLE

The algorithm can initially be client-side/mock.

Design the code so the backend agent can later replace it with an API call.

==================================================
29. NEXT LIFE VISUALIZATION
==================================================

Create:

ITEM
↓
ANALYZE
↓
POSSIBLE FUTURES
↓
BEST NEXT LIFE
↓
ACTION
↓
NEW OWNER / NEW USE

Use animated flow lines and cards.

==================================================
30. MATCHING UI
==================================================

Display:

Potential Matches

Student A — 94%
Student B — 82%
Student C — 76%

Show why the match exists:

- category
- price
- proximity
- condition

Use polished match cards.

==================================================
31. WASTE PASSPORT UI
==================================================

Create:

/passport/[id]

Example ID:

CL-2026-0001

Display:

LISTED
↓
INTERESTED
↓
SOLD
↓
TRANSFERRED
↓
REPAIRED
↓
RECYCLED

Use animated lifecycle timeline.

Include QR code.

The QR can initially point to the frontend passport route.

==================================================
32. CAMPUS MAP UI
==================================================

Create:

/map

Use Leaflet if practical, otherwise prepare a map-ready component with mock location data.

Show:

- listings
- repair points
- recycling points
- donation points

==================================================
33. IMPACT DASHBOARD UI
==================================================

Create:

/impact

Metrics:

Items recirculated
Sold
Donated
Repaired
Upcycled
Recycled
Estimated waste avoided
Estimated economic value recirculated

Clearly label environmental values as estimates.

Animate metric cards when visible.

==================================================
34. STUDENT DASHBOARD
==================================================

Create:

/dashboard

Show:

My Listings
My Interests
Saved Items
Transactions
Waste Passports
Circular Impact

Use cards and activity timeline.

==================================================
35. MOCK DATA
==================================================

Create realistic demo data.

Listings:

Nike Jacket
Engineering Mathematics Book
Scientific Calculator
Hostel Chair
Cycle
Charger
Backpack
Desk Lamp
Badminton Racket
Cardboard Boxes

Students:

Aarav
Riya
Rahul
Ananya
etc.

Use generic fictional data.

Locations:

Hostel Blocks
Library
Academic Block
Cafeteria
Repair Center
Recycling Point

==================================================
36. BACKEND-READY ARCHITECTURE
==================================================

IMPORTANT:

The frontend must be ready for a later backend integration.

Create a clean service/data layer.

Example:

lib/
  api/
    marketplace.ts
    analysis.ts
    matching.ts
    passport.ts
    impact.ts

For now these can return mock data.

Do NOT hardwire mock data directly into dozens of components.

Components should consume typed data/services.

Clearly mark backend integration points.

==================================================
37. STATE
==================================================

For the current prototype, use appropriate client state.

The application should support simulated:

- creating a listing
- changing listing status
- expressing interest
- updating lifecycle
- analyzing an item
- viewing matches

Persist locally when practical.

Prepare the architecture so these actions can later become real API calls.

==================================================
38. RESPONSIVE BEHAVIOR
==================================================

Desktop:
- full two-column hero
- 3D cards
- pinned timeline
- bento grid
- floating navigation

Tablet:
- simplified hero
- smaller visual cards
- 2-column layout where useful

Mobile:
- one-column
- stacked cards
- no custom cursor
- no mouse glow
- reduced parallax
- simplified timeline
- touch-friendly controls

No accidental horizontal overflow.

==================================================
39. PERFORMANCE
==================================================

Prioritize smooth interaction.

Avoid:
- excessive blur
- huge DOM trees
- unnecessary re-renders
- layout animations
- uncontrolled GSAP instances

Prefer:
- transform
- opacity
- lazy loading
- optimized images
- CSS animation for infinite loops

Clean up:
- ScrollTrigger
- event listeners
- motion subscriptions
- Lenis

==================================================
40. FINAL FRONTEND QUALITY BAR
==================================================

The result should feel like a real startup product:

"A premium campus circular-economy platform."

It should NOT feel like:

"A generated hackathon template."

The landing page should be visually memorable.

The marketplace should feel usable.

The Circular Decision Engine should feel like the product differentiator.

The frontend must demonstrate this story:

USER HAS AN ITEM
↓
UNDERSTAND THE ITEM
↓
FIND POSSIBLE FUTURES
↓
CHOOSE BEST NEXT LIFE
↓
CONNECT TO NEXT PERSON / PROCESS
↓
TRACK LIFECYCLE
↓
MEASURE IMPACT

==================================================
41. IMPORTANT
==================================================

Do NOT spend time implementing a real database or sophisticated backend.

Do NOT implement:
- NestJS
- Prisma
- Redis
- BullMQ
- Python FastAPI
- real payments
- production AI infrastructure
- complex authorization
- production deployment infrastructure

Those will be handled by another AI coding agent.

Your responsibility is to produce the best possible:
- frontend
- UI
- UX
- interactions
- animations
- client-side mock workflows
- reusable components
- backend-ready API boundaries

Before changing anything, inspect the existing project structure and reuse compatible code rather than unnecessarily rewriting unrelated files.
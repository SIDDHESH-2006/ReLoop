UPDATE THE EXISTING RELOOP APPLICATION.

IMPORTANT:
Do NOT redesign the existing visual language.
Do NOT change the established color palette, typography, borders, hard shadows, rounded shapes, animations, cursor, background grid, floating shapes, or overall Neo-Brutalist + Modern SaaS aesthetic.

This is a STRUCTURE + AUTHENTICATION + NAVIGATION correction.

Preserve the existing design components and reuse them.

==================================================
1. PUBLIC VS AUTHENTICATED EXPERIENCE
==================================================

RELOOP must now have two clearly separated experiences:

PUBLIC EXPERIENCE
- Landing page
- About / Explore About Us
- Get Started / role selection
- Food Institution onboarding
- Recycler / Upcycler onboarding
- NGO / Donation Organisation onboarding
- Coming Soon pages

AUTHENTICATED STUDENT EXPERIENCE
- Student Marketplace
- Student Dashboard
- Analyze
- Impact
- Student profile-related pages
- Student-specific navigation

The public experience must NOT look like the logged-in student portal.

==================================================
2. REMOVE NAVBAR FROM ALL PUBLIC PAGES
==================================================

IMPORTANT:

On ANY page that does NOT require student login:

DO NOT SHOW THE NAVBAR.

This includes:

/
Landing Page

/about
About RELOOP

/get-started
Role Selection

/food-institutions
Food Institution onboarding

/recyclers-upcyclers
Recycler / Upcycler onboarding

/ngos-donations
NGO / Donation onboarding

Coming Soon pages

Any other public onboarding/information page.

There must be NO:

- Marketplace navbar
- Analyze navbar link
- Impact navbar link
- Login menu
- Student portal navigation
- authenticated user controls

on these public pages.

Do NOT replace the navbar with another navbar.

Keep these pages focused and immersive.

==================================================
3. STUDENT NAVBAR ONLY AFTER STUDENT LOGIN
==================================================

The existing navbar should become an AUTHENTICATED STUDENT PORTAL NAVBAR.

It must only appear after successful Student Login.

The intended flow is:

LANDING
↓
GET STARTED
↓
ROLE SELECTION
↓
STUDENT LOGIN
↓
AUTHENTICATION SUCCESS
↓
STUDENT MARKETPLACE
↓
STUDENT NAVBAR BECOMES VISIBLE

The navbar should NOT appear before authentication.

==================================================
4. STUDENT NAVBAR CONTENT
==================================================

After successful student login, show the existing navbar design.

Keep the existing RELOOP visual language.

Student navbar should contain appropriate authenticated student links such as:

RELOOP branding
Marketplace
Analyze
Impact
Dashboard
Profile / Account
Logout

Use the existing navbar styling already present in the project.

Do NOT redesign the navbar.

Only change WHEN it is shown.

It should be mounted conditionally based on authenticated student state.

==================================================
5. STUDENT OAUTH / LOGIN IS CURRENTLY NOT WORKING
==================================================

Fix the Student OAuth flow.

IMPORTANT:

The Student Login button currently does NOT successfully authenticate.

Make the OAuth flow functional.

Use the authentication system already present in the project.

If Supabase Auth is being used:
- connect Student Login to Supabase OAuth
- use the correct provider
- handle redirect
- handle callback
- persist session
- detect authenticated user
- redirect authenticated student to Student Marketplace
- show loading state during authentication
- show a clear error if authentication fails
- prevent unauthenticated users from accessing student-only pages

Do NOT fake successful login.

Do NOT simply navigate to the marketplace when the login button is clicked.

The system must actually verify the authentication state.

==================================================
6. AUTHENTICATION FLOW
==================================================

Required flow:

Landing
↓
GET STARTED
↓
Role Selection
↓
STUDENT LOGIN
↓
OAuth / Authentication
↓
Authentication Callback
↓
Session Created
↓
Student Marketplace

If login fails:

Stay on /student-login

Show:

"Authentication failed. Please try again."

If authentication is in progress:

Show an appropriate loading state.

If already authenticated:

Automatically redirect to Student Marketplace.

==================================================
7. PROTECTED STUDENT ROUTES
==================================================

These pages should require student authentication:

/marketplace
/marketplace/[id]
/list
/analyze
/dashboard
/impact
/student/*

The exact existing route structure may be reused.

If an unauthenticated user attempts to access these routes:

redirect to:

/student-login

Do NOT expose student portal content before authentication.

==================================================
8. PUBLIC LANDING PAGE FOOTER
==================================================

The current landing page footer contains content that belongs to the Student Portal.

Remove those student-portal-specific elements from the public landing page.

Specifically remove/rework links such as:

- Marketplace
- Analyze Item
- Impact
- Dashboard
- other authenticated student functionality

from the PUBLIC landing-page footer.

The public footer should contain only general/public-facing content.

==================================================
9. PUBLIC FOOTER CONTENT
==================================================

Replace the student-portal footer navigation with general RELOOP information.

Keep the same existing footer visual design and black/mint aesthetic.

Use content such as:

RELOOP

"Find the next best life for every item."

GENERAL

About RELOOP
How It Works
Our Services
Contact

PARTNER WITH RELOOP

Food Institutions
Recyclers / Upcyclers
NGOs / Donation Organisations

CONTACT

Email:
hello@reloop.example

Phone:
+91 XXXXX XXXXX

Location:
Campus Circular Economy Network

SOCIAL / GENERAL

LinkedIn
Instagram
Email

IMPORTANT:

Do not use fake real-world contact information.

Use placeholders where actual information has not been provided.

For example:

hello@reloop.example

Do not imply these are real production contact details.

==================================================
10. PUBLIC FOOTER SHOULD FEEL GENERAL
==================================================

The public footer should communicate:

"What is RELOOP?"

"What does RELOOP do?"

"Who can participate?"

"How can organisations work with RELOOP?"

It should NOT feel like the navigation panel of the Student Marketplace.

The Student Portal gets its own authenticated navbar/navigation.

==================================================
11. LANDING PAGE CONTENT
==================================================

Keep the current landing page visual design.

Do NOT add a navbar to the landing page.

Keep:

RELOOP branding
Hero
Circular economy statement
GET STARTED
EXPLORE ABOUT US
Existing visual shapes
Existing animation
Existing background
Existing cursor
Existing design system

The landing page remains the public entry point.

==================================================
12. ABOUT PAGE
==================================================

About page is public.

Therefore:

NO NAVBAR.

Show:

RELOOP branding
What RELOOP is
Services
How RELOOP works
Student ecosystem
Food waste ecosystem
Recycling/upcycling ecosystem
Donation ecosystem
General contact information

Use the existing visual design system.

==================================================
13. GET STARTED PAGE
==================================================

This is public.

NO NAVBAR.

Show the four role options:

1. Student Login
2. Food Institutions
3. Recyclers / Upcyclers
4. NGOs / Donation Organisations

Maintain the existing card design.

Student:

↓
Student Login

Food Institution:

↓
Questionnaire
↓
Coming Soon

Recycler / Upcycler:

↓
Questionnaire
↓
Coming Soon

NGO:

↓
Questionnaire
↓
Coming Soon

==================================================
14. IMPORTANT LANDING PAGE CLEANUP
==================================================

The landing page should NOT contain detailed Student Portal functionality.

The public page should not show:

Marketplace metrics that imply a logged-in user
Student dashboard content
Analyze interface
Student transactions
Student activity
Student-only controls

Keep the landing page focused on:

RELOOP
Circular economy
What RELOOP does
Who participates
Get Started
Explore About Us
General contact information

==================================================
15. ROLE-BASED EXPERIENCE
==================================================

The site should now visually communicate:

PUBLIC

RELOOP
↓
What we do
↓
Choose your role

Then:

STUDENT
↓
Authentication
↓
Student Portal

FOOD INSTITUTION
↓
Setup Form
↓
COMING SOON

RECYCLER / UPCYCLER
↓
Setup Form
↓
COMING SOON

NGO / DONATION
↓
Setup Form
↓
COMING SOON

==================================================
16. STUDENT PORTAL
==================================================

Once authentication succeeds, the student enters the existing Student Marketplace.

Only from this point should the Student Portal navbar appear.

The Student Portal can contain:

RELOOP
Marketplace
Analyze
Impact
Dashboard
Profile
Logout

Preserve the existing Student Marketplace design.

Do NOT move Student Marketplace content into the public landing page.

==================================================
17. ROUTE-AWARE NAVBAR LOGIC
==================================================

Implement the navbar conditionally.

Pseudo-behavior:

if public page:
    hide navbar

if student authentication page:
    hide navbar

if authenticated student portal:
    show navbar

if unauthenticated attempt to protected route:
    redirect to student login

The navbar must not flash briefly before authentication is determined.

Use a proper loading/authentication state to prevent visual flicker.

==================================================
18. SESSION HANDLING
==================================================

On initial app load:

1. Check authentication session.
2. Show appropriate loading state if needed.
3. Determine whether user is authenticated.
4. Render the Student Portal navbar only if authenticated.
5. Protect student-only routes.

Handle session refresh gracefully.

==================================================
19. DO NOT CHANGE THE VISUAL DESIGN
==================================================

ABSOLUTELY PRESERVE:

✓ Existing color scheme
✓ Existing typography
✓ Existing black borders
✓ Existing hard shadows
✓ Existing rounded corners
✓ Existing mint accent
✓ Existing amber accent
✓ Existing background grid
✓ Existing floating shapes
✓ Existing cursor
✓ Existing glow
✓ Existing animation system
✓ Existing Student Marketplace design
✓ Existing button design
✓ Existing card design

Only modify:

- navbar visibility logic
- authentication flow
- OAuth
- protected routes
- public footer content
- separation between public site and student portal

==================================================
20. FINAL USER EXPERIENCE
==================================================

PUBLIC:

Open RELOOP
↓
Landing Page
↓
GET STARTED / EXPLORE ABOUT US

No navbar.

GET STARTED:
↓
Role Selection

No navbar.

Student:
↓
Student Login
↓
OAuth
↓
Authentication
↓
Student Marketplace
↓
NOW SHOW STUDENT NAVBAR

Food Institution:
↓
Questions
↓
COMING SOON

Recycler / Upcycler:
↓
Questions
↓
COMING SOON

NGO:
↓
Questions
↓
COMING SOON

Public Footer:
↓
About
Services
Partners
Contact

Student Portal:
↓
Student-specific navbar
↓
Marketplace / Analyze / Impact / Dashboard / Profile / Logout

==================================================
21. FINAL QUALITY CHECK
==================================================

Before considering this complete, verify:

PUBLIC PAGES:
✓ No navbar

LANDING:
✓ No student portal content
✓ General footer
✓ RELOOP branding
✓ Get Started
✓ Explore About Us

ROLE SELECTION:
✓ No navbar
✓ Four clean role options

STUDENT:
✓ OAuth actually works
✓ Session actually persists
✓ Redirect after successful login
✓ Marketplace opens after login
✓ Navbar appears after login

PROTECTED ROUTES:
✓ Cannot access without authentication

PUBLIC FOOTER:
✓ General RELOOP information
✓ Contact details
✓ Partner information
✓ No student-only navigation

STUDENT FOOTER/NAVIGATION:
✓ Student-specific navigation available after login

MOST IMPORTANT:

Do NOT redesign the website.

Do NOT introduce a new visual system.

Do NOT move Student Portal content into the public landing page.

Separate the PUBLIC RELOOP website from the AUTHENTICATED STUDENT PORTAL while preserving the exact existing visual identity.
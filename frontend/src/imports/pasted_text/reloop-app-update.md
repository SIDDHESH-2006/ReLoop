UPDATE ONLY THE SPECIFIC PARTS OF THE EXISTING RELOOP APPLICATION DESCRIBED BELOW.

THIS IS NOT A REDESIGN.

DO NOT CHANGE ANY UNRELATED PAGE, COMPONENT, LAYOUT, COLOR, TYPOGRAPHY, ANIMATION, SPACING, IMAGE, BACKGROUND, CARD, CURSOR, FOOTER, OR EXISTING FUNCTIONALITY.

Use the SAME design components already present throughout the RELOOP application.

The screenshots provided in this request are VISUAL REFERENCES for the existing design language and the requested SELL flow.

==================================================
1. GLOBAL DESIGN RULE — ABSOLUTELY IMPORTANT
==================================================

Keep the existing RELOOP design system EXACTLY as it is.

Reuse the same:

- background
- grid
- mint green
- amber
- black
- white
- typography
- font sizes
- font weights
- borders
- rounded corners
- hard shadows
- pills
- cards
- input fields
- dropdowns
- buttons
- icon treatment
- cursor
- hover physics
- page transitions
- animations
- spacing
- responsive behavior

DO NOT introduce a new visual system.

Every new component must look like it already belongs to RELOOP.

Use the existing components instead of creating visually different replacements.

==================================================
2. CHANGE ONLY THE AUTHENTICATED STUDENT NAVBAR
==================================================

Modify the existing authenticated student navbar.

Do NOT show this navbar on public pages.

This navbar is specifically for the logged-in Student Portal.

Keep the RELOOP branding on the LEFT exactly as it currently appears.

LEFT:

RELOOP logo/icon
RELOOP text

Do NOT redesign the branding.

==================================================
3. NEW NAVBAR STRUCTURE
==================================================

The authenticated student navbar should now be:

LEFT:

RELOOP

CENTER:

SELL
BUY
RENT
DONATE

RIGHT:

SELL BUTTON
USER ICON

The layout should be:

RELOOP        SELL   BUY   RENT   DONATE        [ SELL ]   [ USER ]

Keep generous spacing.

Do NOT make the navbar crowded.

Use the same pill-shaped navbar container and existing navbar visual styling.

==================================================
4. NAVBAR SELL BUTTON
==================================================

The SELL button in the navbar must use the SAME button design as the existing green "Get Started" button.

Use:

- mint green fill
- black border
- black hard shadow
- elliptical/pill shape
- existing typography
- existing hover animation
- existing click animation

Text:

SELL

Do NOT create a new button style.

It should visually feel like the existing "Get Started" CTA, but with the text:

SELL

==================================================
5. USER ICON
==================================================

On the right side of the navbar, next to SELL:

Add a User/Profile icon.

Use the existing icon system, preferably lucide-react if that is already used.

The icon should visually match the existing design.

On click, it can open the existing student profile/account interaction if one exists.

Do NOT create a visually unrelated profile component.

==================================================
6. REPAIR BUTTON — SPECIAL EMPHASIS
==================================================

Add a prominent:

REPAIR

button using the SAME design language as the existing "Get Started" / SELL button.

The only major visual difference:

### REPAIR MUST USE RED INSTEAD OF MINT GREEN.

Use a strong red that works with the existing RELOOP black/white design.

Keep:

- same elliptical shape
- same black border
- same hard black shadow
- same typography
- same hover physics
- same button dimensions where practical

Do NOT create a completely new red design.

The red is ONLY being used to visually emphasize REPAIR.

Place the REPAIR button prominently within the relevant Student Portal marketplace/action area.

Do NOT place it randomly or redesign the page.

==================================================
7. EXISTING MARKETPLACE MUST NOT BE REDESIGNED
==================================================

The existing Student Marketplace is already designed.

DO NOT redesign it.

DO NOT change:

- product cards
- filters
- marketplace layout
- search
- item images
- existing page background
- existing card structure
- existing animations

Only integrate the new navigation and relevant SELL/REPAIR actions.

==================================================
8. SELL NAVBAR FLOW
==================================================

When a logged-in student clicks:

SELL

in the navbar,

navigate to a new SELL setup page.

This page must use the SAME visual structure and components as the existing:

FOOD INSTITUTION SETUP

page.

Specifically use the same:

- large page heading style
- small uppercase section label
- white bordered form cards
- numbered section circles
- black borders
- hard shadows
- input fields
- dropdowns
- spacing
- background
- floating shapes
- responsive structure
- button design

Do NOT create a new form visual system.

==================================================
9. SELL PAGE
==================================================

Page heading:

SELL AN ITEM

Small label:

SELL

Supporting text:

"Tell us about the item you're selling so RELOOP can determine its best selling path."

The page should contain a professional form.

==================================================
10. SELL FORM — REQUIRED FIELDS
==================================================

Ask the following in the exact logical order:

### 01 PRODUCT DETAILS

Product Name

Product Category

Use a dropdown.

Categories can include:

- Clothing
- Books
- Electronics
- Furniture
- Sports
- Bags & Accessories
- Hostel / Household
- Other

==================================================

### 02 PRODUCT AGE

First ask:

PRODUCT AGE

Use a clean selection/dropdown.

Suggested options:

- Brand New
- Less than 6 months
- 6 months – 1 year
- 1–2 years
- 2–3 years
- 3–5 years
- More than 5 years
- Approximate / Unknown

The user specifically requested AGE to be asked before condition.

==================================================

### 03 CONDITION

Ask:

CONDITION OF THE PRODUCT

Options:

- New
- Like New
- Good
- Fair
- Used
- Damaged

Use the same pill/dropdown/input components already used in RELOOP.

==================================================

### 04 ORIGINAL BUYING PRICE

Ask:

BUYING PRICE

Supporting label:

"Approximate price paid when originally purchased."

Field:

₹ ______

This means the price at which the student originally bought the item.

For very old products, allow approximate values.

==================================================

### 05 TARGET SELLING PRICE

Ask:

TARGET SELLING PRICE

Supporting label:

"What price would you ideally like to receive?"

Field:

₹ ______

==================================================

### 06 ADDITIONAL DETAILS

Also collect, where appropriate:

Description

Product Brand

Purchase Year / Approximate Purchase Date

Optional Image Upload

Any defects / damage

These should use existing RELOOP form components.

==================================================
11. ANALYSE BUTTON
==================================================

At the bottom of the SELL setup form:

Use the existing primary CTA button design.

Text:

ANALYSE

This should navigate to the analysis result page.

For now:

### DO NOT CONNECT TO A REAL BACKEND.

Use a MOCK Circular Decision Engine result.

The backend will be implemented later.

Create a clean service boundary so this mock can later be replaced by the backend response.

==================================================
12. MOCK ANALYSIS PAGE
==================================================

After clicking ANALYSE:

Navigate to:

SELL ANALYSIS

Use the SAME visual structure as the existing analysis page shown in the reference.

Preserve:

- left analysis information card
- right black recommendation card
- progress bars
- tags
- badges
- background
- floating shapes
- existing spacing
- hard shadows
- typography

Do NOT redesign the analysis page.

==================================================
13. LEFT ANALYSIS PANEL
==================================================

The left panel should display the submitted item information and mock calculated values.

Example:

CLOTHING

NYLON / POLYESTER

LIKE NEW

REUSABILITY
96%

REPAIRABILITY
70%

UPCyclability
55%

RECYCLABILITY
40%

These percentages are only example mock values.

The actual UI should use the student's entered information.

Keep the exact existing progress-bar visual language.

==================================================
14. RIGHT BLACK ANALYSIS BOX
==================================================

IMPORTANT CHANGE:

The existing black recommendation box currently has:

SELL

with a circular score.

For this SELL flow, change the purpose of this box.

DO NOT remove the black box.

DO NOT remove the circular visual.

Keep the same visual composition.

Instead of showing a generic:

SELL
100 SCORE

the black card should show:

### SELLING ANALYSIS

And inside the circular element:

show a selling recommendation indicator rather than a generic circular decision score.

Examples:

PRICE TOO HIGH

PRICE IS FAIR

PRICE CAN BE INCREASED

PRICE CAN BE REDUCED

The recommendation should be visually prominent.

==================================================
15. MOCK SELLING PRICE ANALYSIS
==================================================

Create a simple MOCK pricing recommendation based on:

- Original buying price
- Product age
- Product condition
- Target selling price

For example:

Original Price:
₹4000

Target Selling Price:
₹3500

Condition:
Like New

Result:

SELLING ANALYSIS

PRICE CAN BE REDUCED

Recommended Range:

₹2800–₹3200

Suggested Price:

₹3000

Reason:

"The target price is slightly high compared with the item's age and current condition."

OR:

PRICE IS FAIR

Suggested Price:

₹3000

Reason:

"The target price is reasonable for the product's age and condition."

OR:

PRICE CAN BE INCREASED

Suggested Price:

₹3600

Reason:

"The item is in excellent condition and the target price is below the estimated campus resale range."

This is MOCK logic.

Do NOT implement actual financial prediction.

Do NOT connect to an external pricing API.

Create deterministic frontend mock logic so the backend can replace it later.

==================================================
16. BLACK CARD CONTENT STRUCTURE
==================================================

Use:

SELLING ANALYSIS

[ CIRCULAR / STATUS VISUAL ]

PRICE CAN BE REDUCED

Suggested Price:
₹3000

Recommended Range:
₹2800 – ₹3200

Short explanation.

The existing visual style of the black recommendation card must remain.

==================================================
17. EDIT BUTTON
==================================================

Add an:

EDIT

button on the analysis page.

Position it on the LEFT side near the analysis/result area.

When clicked:

return to the previous SELL form page

while preserving all entered values.

The student should be able to edit:

- age
- condition
- buying price
- target selling price
- other information

and then click ANALYSE again.

Do not reset the form unnecessarily.

==================================================
18. NEXT LIFE JOURNEY
==================================================

Keep the existing:

### THE NEXT LIFE JOURNEY

visual component.

Do NOT redesign it.

Use the same sequence visual style:

ITEM
→
ANALYZE
→
POSSIBLE FUTURES
→
SELL
→
NEW OWNER / USE

However, adapt the final stage to the selling workflow.

Example:

ITEM
→
ANALYZE
→
SELLING ANALYSIS
→
RECOMMENDED PRICE
→
NEW OWNER

Keep the existing component styling.

==================================================
19. TWO ACTION BUTTONS BELOW NEXT LIFE JOURNEY
==================================================

Immediately below the Next Life Journey, create TWO actions.

These must use the SAME button components already used throughout RELOOP.

### BUTTON 1

Text:

PROCEED TO SELL

This means:

"I want to sell at my original target price."

It should continue to the next selling/listing step.

Use the existing primary mint button styling.

==================================================

### BUTTON 2

Text:

PROCEED WITH THE SUGGESTION

This means:

"I accept the RELOOP recommended selling price."

It should continue using the suggested price.

Use a visually distinct but still existing RELOOP button style.

Do NOT invent a new design system.

==================================================
20. BUTTON POSITIONING
==================================================

The user specifically requested the actions below the journey.

Arrange them cleanly:

             [ PROCEED TO SELL ]

        [ PROCEED WITH THE SUGGESTION ]

EDIT remains on the LEFT near the analysis/result area.

Do not place all three buttons in one cramped row.

Maintain generous spacing.

==================================================
21. SELL FLOW
==================================================

Complete intended flow:

STUDENT MARKETPLACE
↓
SELL NAVBAR BUTTON
↓
SELL ITEM FORM
↓
AGE
↓
CONDITION
↓
BUYING PRICE
↓
TARGET SELLING PRICE
↓
ANALYSE
↓
MOCK SELLING ANALYSIS
↓
PRICE RECOMMENDATION
↓
NEXT LIFE JOURNEY
↓
EDIT
OR
PROCEED TO SELL
OR
PROCEED WITH THE SUGGESTION

==================================================
22. FUTURE BACKEND INTEGRATION
==================================================

The Circular Decision Engine is BACKEND-OWNED.

For now:

Use mock analysis.

However, structure the frontend so that the backend can later provide:

{
  recommendation,
  suggestedPrice,
  priceRange,
  reason,
  score,
  alternatives
}

Do not hardcode the analysis directly inside the visual components.

Create a clean service function such as:

analyzeSellingPrice(data)

For now it returns mock values.

Later the backend developer can replace its implementation.

==================================================
23. REPAIR BUTTON
==================================================

Add the REPAIR button using the SAME visual design as the existing green SELL/GET STARTED CTA.

Only change:

GREEN → RED

Text:

REPAIR

The button should eventually lead to a Repair workflow.

For this task, ONLY create the visual button and its navigation point if a Repair route already exists.

Do NOT redesign the Repair page unless specifically requested.

==================================================
24. NAVBAR RESPONSIVE BEHAVIOR
==================================================

Desktop:

RELOOP | SELL BUY RENT DONATE | SELL | USER

Tablet:

Maintain readable spacing.

Mobile:

Use the existing mobile navbar system, but preserve the same navigation structure.

Do not allow overflow.

The SELL button remains visually prominent.

==================================================
25. NO OTHER CHANGES
==================================================

This instruction is extremely important.

DO NOT modify:

- Landing page
- About page
- Role selection page
- Food Institution Setup
- Recycler / Upcycler Setup
- NGO Setup
- Existing Marketplace content
- Existing Analyze page outside the new SELL flow
- Existing Impact page
- Existing footer
- Existing background
- Existing animations
- Existing cursor
- Existing colors
- Existing typography
- Existing design system

ONLY modify:

1. Authenticated Student Navbar content
2. Add emphasized REPAIR button
3. New SELL flow
4. SELL mock analysis
5. SELL recommendation interface
6. Next Life Journey actions
7. Required navigation between these elements

==================================================
26. FINAL VISUAL RULE
==================================================

Every new page MUST look like the existing Food Institution Setup / Analyze pages.

Reuse their:

- section cards
- numbered headers
- form layouts
- input styles
- dropdowns
- buttons
- shadows
- borders
- background
- floating decorative shapes
- typography
- spacing

Do not create a different visual language for SELL.

==================================================
27. FINAL ACCEPTANCE TEST
==================================================

Verify all of the following:

NAVBAR

✓ RELOOP on left
✓ SELL
✓ BUY
✓ RENT
✓ DONATE
✓ Green SELL button
✓ User icon

SELL FLOW

✓ Click SELL
✓ SELL setup page opens
✓ Product age requested first
✓ Condition requested
✓ Buying price requested
✓ Target selling price requested
✓ ANALYSE button works
✓ Mock analysis appears
✓ Existing analysis design preserved
✓ Black recommendation box preserved
✓ Shows SELLING ANALYSIS
✓ Price recommendation displayed
✓ Suggested price displayed
✓ Reason displayed
✓ Circular/status visual preserved
✓ EDIT button works
✓ Form values remain when editing
✓ Next Life Journey preserved
✓ PROCEED TO SELL button exists
✓ PROCEED WITH THE SUGGESTION button exists

REPAIR

✓ REPAIR button exists
✓ Same shape/design as SELL
✓ Red instead of green
✓ Existing design components reused

MOST IMPORTANT:

DO NOT CHANGE ANYTHING ELSE.

Use the existing RELOOP components everywhere.

The objective is to EXTEND the current RELOOP Student Portal, not redesign it.
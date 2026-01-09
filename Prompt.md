Build me a modern e-commerce website called "Mart – For You" that looks and feels like something you'd actually want to shop on. I want it built with React and Tailwind CSS, using Vite for the build tooling. No backend needed-everything should work with local state and browser storage, but it should feel real and polished enough that someone could mistake it for an actual production store.

For products, give me around a hundred items spread across eight categories-things like electronics, fashion, home goods, beauty products, fitness gear, food and beverages, books, and toys. Each product needs a good image from Unsplash, a realistic price, a proper description, stock quantity, and shipping estimate. Sprinkle in some sale items with discounted prices throughout the catalog. Make the product data feel authentic with category-appropriate details-electronics should mention specs, books should have page counts, toys should have age recommendations, that sort of thing.

The shopping experience needs to feel snappy and intuitive. Users should be able to search products instantly as they type, filter by category, and toggle to see only items on sale. These filters should update the URL so people can share or bookmark specific views. The product grid should be responsive-one column on phones, scaling up to four columns on big screens.

The cart is where I want things to feel really thoughtful. When someone hasn't added a product yet, show them an "Add to Cart" button. But once it's in their cart, swap that button for quantity controls right there on the product card-no need to open the cart just to adjust quantities. If they reduce the quantity to zero, remove the item automatically. Respect stock limits and let users know when they've hit the maximum. Show the cart item count on a badge in the navigation so it's always visible.

For checkout, offer three shipping tiers: free slow shipping, a mid-priced standard option, and express delivery for people in a hurry. Calculate tax at around eight percent and show a clear breakdown of subtotal, shipping, tax, and total. The actual checkout should be simulated-generate an order number, show a nice success animation, and let them continue shopping. I want both a quick cart modal accessible from any page and a full dedicated cart page for people who want more space to review their order.

Users need a profile where they can manage their personal info-name, email, phone, and address. Build it with two modes: a clean view showing their information in cards, and an edit mode with a proper form. Validate everything appropriately-emails should look like emails, required fields should be required. Include save and cancel buttons that actually work and show feedback when changes are saved. Add a little profile dropdown in the header for quick access.

The whole site needs to support dark mode. Check what the user's system prefers when they first visit, but let them toggle it manually too. The light theme should feel bright and clean with blue accents. The dark theme should be comfortable for nighttime browsing with slate grays and softer blues. Remember their preference between visits.

Build a toast notification system for feedback. When someone adds something to their cart, saves their profile, or completes checkout, give them a brief success message. If something goes wrong or they hit a limit, show an appropriate error or warning. These should pop up, hang around for a few seconds, then dismiss themselves. On mobile, put them at the bottom center of the screen. On desktop, the bottom right feels more natural.

For pages, start with an animated landing screen that welcomes people to the store. Make it visually interesting with the logo, a tagline, and a button to enter. Include a theme toggle here too. The home page should have an eye-catching hero section-ideally with a video background-followed by the product catalog with navigation and filters. Create a dedicated products page that's essentially the full catalog view with all the search and filter functionality. Build an offers page specifically for sale items with a promotional feel and savings callouts. The cart page gives people space to review everything before checkout. The profile page handles viewing and editing user information. And don't forget a friendly 404 page for when people get lost.

Navigation should adapt to screen size gracefully. On phones, use a hamburger menu that opens a full-screen sidebar with all the categories. On tablets, show a more compact navigation with overflow handling. On desktop, spread everything out comfortably. Keep the search bar, cart button, and navigation sticky so they're always accessible while scrolling.

Speaking of responsive design, this needs to work beautifully everywhere. Phones as small as 320 pixels wide, tablets in portrait and landscape, and desktop monitors of all sizes. Mobile layouts should be single-column with large touch targets. Tablets can go to two or three columns. Desktop gets the full four-column treatment with hover effects. Pay attention to awkward in-between sizes like the iPad Mini-nothing should feel cramped or overflow weirdly.

Use Framer Motion for animations throughout. Page transitions, hover effects on cards, modals sliding in and out, toasts appearing and disappearing, buttons responding to interaction, a celebratory animation when checkout completes. Keep everything smooth and purposeful-animations should make the experience feel premium, not slow it down or get annoying.

Accessibility matters. Add a skip link so keyboard users can jump to the main content. Use proper semantic HTML and ARIA labels where needed. Everything should be navigable by keyboard alone with visible focus indicators. Colors need enough contrast to be readable. Forms need proper labels and clear error messages. Respect reduced motion preferences for users who get motion sick.

All user data should persist. Cart contents, profile information, theme preference-save it all to localStorage so it survives page refreshes and return visits. The landing page redirect can use sessionStorage so people see the welcome screen once per browser session but not every single page load.

Wrap everything in an error boundary so the whole app doesn't crash if something goes wrong. Show a friendly error screen with options to try again or go home. During development, show the actual error details for debugging.

Performance should be excellent. Lazy load the page components, split the vendor libraries into separate chunks, optimize images, and aim for a Lighthouse score above 90. The site should feel instant.

Set up the codebase professionally with ESLint and Prettier for consistent formatting, Vitest for testing, and proper code organization using context providers for state management and custom hooks for reusable logic. No prop drilling-pass data through context where it makes sense. Write tests for the important stuff.

Configure deployment for flexibility-it should work on Vercel, Netlify, GitHub Pages, or a plain nginx server without special configuration. Using hash-based routing helps with this since it doesn't require server-side route handling.

To be clear about what this isn't: there's no real backend, no user authentication, no actual payment processing. This is a frontend demonstration of how a proper e-commerce experience should look and feel. It's the kind of thing you'd show in a portfolio or use as a starting point before integrating real services.

The end result should be something I'd be proud to show off-a shopping site that feels complete, professional, and genuinely pleasant to use.

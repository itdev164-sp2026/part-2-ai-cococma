# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:

My name: Cole Abraham
A short bio (1-2 sentences about being a web development student)
A "Skills" section that displays at least 6 skills in a responsive
Tailwind CSS grid (use cards with icons from lucide-react)
Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

## what happened
It initially cleaned up the old content in page.tsx then updated the emta data in the layout in order to reflect the new Developer profile page. it verified its results and then the prompt finished.
 
## Prompt 2
could you add in my github profile picture into the website to the right of my name and background? my user is cococma

## what happened
It added new lines into the page.tsx file that ported my githubs profile picture directly to the site.

## reflection
It works very efficiently and does tasks that would take me around 10 minutes in 30 seconds.



## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.


**What happened:**

It made some issues with the layout and the resolution not filling the screen properly but overall laid out decent architecture

### Prompt 2

The sidebar does not close on mobile when clicking the Overview menu item
because it links to "/" which is already the current page. Fix this so the
sidebar closes on mobile when any menu item is clicked, even if it links
to the current page.

**What happened:**

It fixed it on the first try and the tab menu is now responsive

### Reflection

The agent did a very poor job of formatting the resolution correctly and overcomplicated several different portions of it, initially breaking down parts of the activity-1 code, fortunately i was able to go through and refactor it so it both worked better and worked correclty.


## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

The agent corretly did not use useEffect or useState, and was able to perform the task quite well.

### Prompt 2 

**What I asked:**

The breadcrumb in src/app/layout.tsx always shows "Overview" because the page
name is hardcoded. Extract the breadcrumb into its own client component at
src/components/breadcrumb-nav.tsx that uses usePathname() from next/navigation
to display the correct page name. Map "/" to "Overview", "/projects" to
"Projects", and "/settings" to "Settings". Keep "ITDEV-164" as the first
breadcrumb segment. Then update layout.tsx to use the new component.

**What happened:**

The agent succesfully optimized the breadcrumbing feature and it now works as it should when switching between pages

### Reflection

It definitely feels a good bit different now that it is dynamically fetching the data from supabase and giving the projects directly based on the changes over there. Super cool! it was a lot easier then doing something like this before in other similar projects.

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

the agent correctly made the schema and it worked in the correct neccessities for each row.

### Prompt 2

**What I asked:**

Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

All files were successfuly updated/created and it was able to work within the confines of the query i gave it well enough.

### Reflection

This has definitely taught me a bit more about howthe backend and front end speak to each other, it also makes me wary of potential cyber security risks and the need for authentication that i am excited to get to in the next assignment.

## Activity 5: Securing the App with Supabase Auth

### Prompt 1

Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**

It added 4 files and modified 4 files and correctly used getuser which made the transition seemless

### Reflection

I didn't have to manually change anything the agent handled all exceptions well and created a good finished product,
i did have to reprompt in order to be able to add in new projects again but was able to figure it out quickly.


## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

**What happened:**

it did use role based authenticators however only 2 out of the 3 were passed on the first go

### Prompt 2

**What I asked:**

There is a problem with the 3rd playwright test and it is saying this:
    Error: expect(locator).toBeVisible() failed

    Locator: getByRole('link', { name: 'Overview' })
    Expected: visible
    Error: strict mode violation: getByRole('link', { name: 'Overview' }) resolved to 2 elements:
        1) <a href="/" data-size="default" data-active="false" data-state="closed" data-sidebar="menu-button" data-slot="sidebar-menu-button" class="peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 active:bg-sidebar-accent active:text-sideba…>…</a> aka locator('ul').getByRole('link', { name: 'Overview' })
        2) <span role="link" aria-current="page" aria-disabled="true" data-slot="breadcrumb-page" class="font-normal text-foreground">Overview</span> aka getByLabel('breadcrumb').getByRole('link', { name: 'Overview' })

    Call log:
      - Expect "toBeVisible" with timeout 5000ms
      - waiting for getByRole('link', { name: 'Overview' })


      52 |     await page.waitForURL("/", { timeout: 10_000 });
      53 |
    > 54 |     await expect(page.getByRole("link", { name: "Overview" })).toBeVisible();
         |                                                                ^
      55 |     await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
      56 |     await expect(page.getByRole("link", { name: "Settings" })).toBeVisible();
      57 |   });
        at C:\Users\Cole\Documents\GitHub\WebDev2\part-2-ai-cococma\tests\auth.spec.ts:54:64

    Error Context: test-results\auth-Authentication-sideba-54eb9--Settings-links-after-login\error-context.md

  1 failed
    tests\auth.spec.ts:36:7 › Authentication › sidebar shows Overview, Projects, and Settings links after login 
  2 passed (7.3s)
can you help me?

**What happened:**

The model found the problem pretty quickly having to do with the breadcrumb that made it register 2 of the same things and fixed it in the first round

### Reflection

I dont see the tests as clearly for sure especially with the package helping however it seems to do a very good job at making specific error catches

### Course Reflection

This was a very interesting experiment and its definitely a very useful tool in defined spaces however i think having prior knowledge of how systems and programming works makes a larger difference than some might tihnk.
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

The agent did a very poor job of formatting the resolution correctly and overcomplicated several different portions of it, fortunately i was able to go through and refactor it so it both worked better and worked correclty.

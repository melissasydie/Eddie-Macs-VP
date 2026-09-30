# Eddie Macs Logo Favicon & Shareable Menus Page URL

Implement the official Eddie Macs logo as the website favicon for browser tabs and mobile home-screens, and create a dedicated, shareable `/menu` URL route with dynamic view synchronization and social preview metadata.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Choices from Clarification**:
> - **Primary Menu URL**: `/menu` will be the dedicated direct link for sharing menus, with `/menus` seamlessly aliased to `/menu`.
> - **URL Scope**: A clean, single shareable `/menu` page that displays the complete interactive menu hub and category selectors.
> - **Favicon Style**: Classic transparent Eddie Macs logo, properly formatted and linked for all desktop and mobile browsers.

---

### 1. Overview & Core Concept

- **What It Does**: 
  1. Enhances the browser tab presentation by displaying the authentic Eddie Macs logo as the site favicon and Apple touch icon.
  2. Introduces a dedicated `/menu` route (and `/menus` alias) that enables staff and patrons to share a direct link to the menus via WhatsApp, social channels, or QR codes, landing visitors straight into the interactive food & drink menus.
- **Target Audience / Persona**: Club members, sports fans, party planners, and casual diners looking for quick menu access or sharing food options with groups.
- **Key Value**: Professional brand consistency across browser tabs and seamless 1-click sharing of club menus without requiring patrons to hunt through the home page.

---

### 2. User Experience & Visual Design

- **Browser Tab & Bookmarks**:
  - Clear, high-visibility Eddie Macs logo favicon in every browser tab, bookmarks bar, and mobile home-screen shortcut.
  - Contextual `<title>` metadata dynamically reflecting when the user is viewing the Menu Hub (*"Menu – Eddie Macs @ VP"*) vs the Home page.
- **Direct Navigation & Shareable Link Flow**:
  1. **Direct Entry**: Visiting `https://.../menu` instantly loads the Menus view, skipping the hero banner while preserving full access to top navigation.
  2. **In-App Switching**: Clicking "MENU" from anywhere on the site smoothly transitions the view and updates the browser address bar to `/menu` without full-page reloads.
  3. **Social Sharing**: When shared on WhatsApp, Facebook, or messaging apps, the link provides clear title and description metadata highlighting Eddie Macs dining and specials.

---

### 3. Key Product Decisions & Trade-Offs

- **Dedicated Route with Seamless PublicView Integration**:
  - *Chosen Approach*: Route `/menu` through React Router directly into the existing public portal with an initial view parameter (`initialView="menus"`), while synchronizing browser history on navigation.
  - *Why*: Retains the full rich interactive experience (categories, daily specials, food menus, WhatsApp booking triggers) without code duplication or state fragmentation.
  - *Alternatives Considered*: Creating an isolated, stripped-down standalone menu page; rejected because users would lose quick access to WhatsApp bookings, about info, and event links.
- **High-DPI Multi-Format Favicon Support**:
  - *Chosen Approach*: Support both standard PNG favicons and modern SVG/touch-icon references in `index.html` referencing the crisp Eddie Macs logo asset.
  - *Why*: Ensures maximum compatibility across modern desktop browsers (Chrome, Safari, Firefox, Edge) and mobile devices.

---

### 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────┐
│                   Browser / Client                     │
│  - URL: /menu (or /)                                   │
│  - Favicon: /assets/images/eddies_logo_white.png       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   React Router                         │
│  - /          ──> PublicView (default home)            │
│  - /menu      ──> PublicView (initialView: menus)      │
│  - /menus     ──> Redirect to /menu                    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   PublicView                           │
│  - Synchronizes active view with URL (/ <-> /menu)     │
│  - Updates document.title ("Menu - Eddie Macs @ VP")  │
│  - Interactive category filters & menu item grid       │
│  - Function & table reservation links to WhatsApp      │
└────────────────────────────────────────────────────────┘
```

- **Interactive State & URL Synchronization**:
  - When the URL matches `/menu`, the initial state sets `currentView = 'menus'`.
  - When the user clicks the "MENU" nav item, the browser URL transitions to `/menu`.
  - When navigating back to "HOME", the browser URL transitions back to `/`.
  - Document title and meta description dynamically reflect the active view for SEO and sharing preview quality.

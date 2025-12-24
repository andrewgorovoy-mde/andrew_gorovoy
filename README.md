# Portfolio Site

A hand-drawn, sketchy-style portfolio website built with Rough.js. Black and white color scheme only.

## Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Global styles and layout
│   └── components.css      # Component-specific styles
├── scripts/
│   ├── main.js            # Main entry point - initializes everything
│   ├── rough-drawer.js    # Rough.js utility functions for drawing
│   └── sections/
│       ├── hero.js        # Hero section logic
│       ├── about.js       # About section logic
│       ├── projects.js    # Projects section logic
│       └── contact.js    # Contact section logic
├── package.json
└── README.md
```

## File Descriptions

### HTML
- **index.html**: Main HTML structure with semantic sections. Each section has a unique ID for easy targeting.

### Styles
- **styles/main.css**: Global styles, CSS variables, layout, typography, and responsive breakpoints.
- **styles/components.css**: Styles for specific components like buttons, cards, and navigation.

### Scripts
- **scripts/main.js**: Entry point that initializes all sections and handles global functionality.
- **scripts/rough-drawer.js**: Utility module for Rough.js drawing functions. Provides reusable drawing methods.
- **scripts/sections/**: Individual section modules that handle their own Rough.js drawings and interactions.

## Editing Guide

### Adding a New Project
1. Open `scripts/sections/projects.js`
2. Add a new object to the `projects` array
3. Each project should have: `title`, `description`, `technologies`, `link` (optional)

### Modifying Colors
- All colors are defined in `styles/main.css` under CSS variables (`--color-black`, `--color-white`)
- Change these variables to modify the entire site's color scheme

### Adding a New Section
1. Add HTML section in `index.html`
2. Create a new file in `scripts/sections/` (e.g., `skills.js`)
3. Import and initialize in `scripts/main.js`

### Adjusting Rough.js Style
- Modify drawing options in `scripts/rough-drawer.js`
- Each section can override default options when calling drawing functions

## Development

```bash
# Install dependencies
npm install

# Run local server
npm run dev
```

## Deployment to GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Site will be available at `https://[username].github.io/[repository-name]`

## Dependencies

- **roughjs**: Library for creating hand-drawn, sketchy graphics


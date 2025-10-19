# 🎨 CodeMint

An open-source hub for frontend developers to discover, learn, and contribute components, CSS snippets, UI blocks, effects, and color utilities.

## 🚀 Features

- **Components Gallery**: Reusable React components with copy-paste code
- **CSS Snippets Hub**: Useful CSS snippets for modern designs
- **UI Blocks Library**: Ready-to-use UI sections and templates
- **Effects Lab**: Interactive CSS effects and animations
- **Color Utilities**: Beautiful color palettes and gradients
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all device sizes
- **Contributor-Friendly**: Easy to add new content

## 🛠️ Tech Stack

- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM (routing)
- Vite (build tool)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/roshansuthar1105/frontend-playground.git
cd frontend-playground
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
frontend-playground/
├── public/
├── src/
│   ├── components/          # Shared components (Navbar, Footer)
│   ├── pages/              # Page components
│   │   ├── ComponentsGallery/
│   │   │   └── components/ # Individual component files
│   │   ├── UIBlocksLibrary/
│   │   │   └── blocks/     # Individual block files
│   │   └── ...other pages
│   ├── data/               # JSON data files
│   ├── utils/              # Utility functions
│   ├── routes/             # App routing
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

## 🤝 How to Contribute

We welcome contributions from developers of all skill levels! Here's how you can help:

### Adding Components

1. Create a new `.jsx` file in `src/pages/ComponentsGallery/components/`
2. Export your component as default
3. Add metadata to `src/data/components.json`:
```json
{
  "title": "Your Component",
  "path": "YourComponent",
  "tags": ["button", "UI"],
  "contributor": "YourUsername"
}
```

### Adding CSS Snippets

Add your snippet to `src/data/snippets.json`:
```json
{
  "title": "Your Snippet",
  "css": ".your-class { color: red; }",
  "type": "effect",
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["animation", "hover"]
}
```

### Adding UI Blocks

1. Create a new `.jsx` file in `src/pages/UIBlocksLibrary/blocks/`
2. Add metadata to `src/data/blocks.json`

### Adding Effects

Add your effect to `src/data/effects.json`:
```json
{
  "name": "Your Effect",
  "type": "animation",
  "previewClass": "your-effect",
  "css": "@keyframes your-effect { ... }",
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["animation", "hover"]
}
```

### Adding Colors

Add your color palette to `src/data/colors.json`:
```json
{
  "name": "Your Palette",
  "type": "gradient",
  "colors": ["#hex1", "#hex2", "#hex3"],
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["warm", "vibrant"]
}
```

## 📝 Guidelines

- Ensure your code is responsive and accessible
- Use Tailwind CSS for styling
- Include proper TypeScript types if applicable
- Test your components on different screen sizes
- Follow React best practices

## 🎯 Roadmap

- [ ] TypeScript migration
- [ ] Component search and filtering
- [ ] User authentication
- [ ] Favorites system
- [ ] Component playground
- [ ] More animation examples

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

Thanks to all our contributors and the amazing frontend community!

---

Made with ❤️ by the Community
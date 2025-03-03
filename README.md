# PicoScenes Documentation Website

This repository contains the documentation website for PicoScenes, a powerful middleware for modern Wi-Fi integrated sensing and communication (Wi-Fi ISAC) research.

## About the Theme

This website uses a custom Jekyll theme designed specifically for technical documentation. The theme features:

- Clean, modern design optimized for readability
- Responsive layout that works on desktop and mobile devices
- Sidebar navigation with automatic section detection
- Syntax highlighting for code blocks
- Optimized typography for technical content
- Support for tables, blockquotes, and other Markdown elements

## Local Development

To run this website locally:

1. Install Jekyll and Bundler:
   ```
   gem install jekyll bundler
   ```

2. Clone this repository:
   ```
   git clone https://github.com/yourusername/PicoScenes-github-pages.git
   cd PicoScenes-github-pages
   ```

3. Install dependencies:
   ```
   bundle install
   ```

4. Start the local server:
   ```
   bundle exec jekyll serve
   ```

5. Open your browser and visit: `http://localhost:4000`

## Theme Customization

The theme can be customized by modifying the following files:

- `_config.yml` - Main configuration file
- `assets/css/style.scss` - Main stylesheet
- `_layouts/default.html` - Default layout template

### Color Scheme

The color scheme can be adjusted by modifying the variables at the top of `assets/css/style.scss`:

```scss
$theme-color: #0066cc;      // Primary theme color
$secondary-color: #333333;   // Secondary color for headings
$accent-color: #ff9900;      // Accent color for highlights
```

## Content Structure

Content is organized in Markdown files in the root directory. The navigation menu is configured in `_config.yml` under the `header_pages` section.

## Adding New Pages

To add a new page:

1. Create a new Markdown file in the root directory
2. Add YAML front matter at the top:
   ```yaml
   ---
   title: Your Page Title
   description: Brief description of the page
   ---
   ```
3. Add the page to the `header_pages` list in `_config.yml` if you want it to appear in the navigation

## License

This theme is designed specifically for the PicoScenes documentation website.
import type { SiteConfig } from '@types'

const config: SiteConfig = {
  // Absolute URL to the root of your published site, used for generating links and sitemaps.
  site: 'https://dev.alerosa.me',
  // The name of your site, used in the title and for SEO.
  title: 'Tech Projects & Journal',
  // The description of your site, used for SEO and RSS feed.
  description:
    'From code to servers: building, experimenting, and learning across software, homelabbing, and DevOps',
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: 'Diego Rosales',
  // Keywords for SEO, used in the meta tags.
  tags: ['.NET', 'Linux', 'Docker', 'Homelab', 'DevOps', 'Astro'],
  // Path to the image used for generating social media previews.
  // Needs to be a square JPEG file due to limitations of the social card generator.
  // Try https://squoosh.app/ to easily convert images to JPEG.
  socialCardAvatarImage: './src/content/avatar.jpg',
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: 'JetBrains Mono Variable',
  // For pagination, the number of posts to display per page.
  pageSize: 5,
  // The navigation links to display in the header.
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Archive',
      url: '/posts',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/dalrosales',
      external: true,
    },
  ],
  // The theming configuration for the site.
  themes: {
    // The theming mode. One of "single" | "select" | "light-dark-auto".
    mode: 'light-dark-auto',
    // The default theme identifier, used when themeMode is "select" or "light-dark-auto".
    // Make sure this is one of the themes listed in `themes` or "auto" for "light-dark-auto" mode.
    default: 'auto',
    // Shiki themes to bundle with the site.
    // https://expressive-code.com/guides/themes/#using-bundled-themes
    // These will be used to theme the entire site along with syntax highlighting.
    // To use light-dark-auto mode, only include a light and a dark theme in that order.
    // include: [
    //   'github-light',
    //   'github-dark',
    // ]
    include: [
      //'andromeeda',
      //'aurora-x',
      //'ayu-dark',
      //'catppuccin-frappe',
      //'catppuccin-latte',
      //'catppuccin-macchiato',
      //'catppuccin-mocha',
      //'dark-plus',
      //'dracula',
      //'dracula-soft',
      //'everforest-dark',
      //'everforest-light',
      //'github-dark',
      //'github-dark-default',
      //'github-dark-dimmed',
      //'github-dark-high-contrast',
      //'github-light',
      //'github-light-default',
      //'github-light-high-contrast',
      //'gruvbox-dark-hard',
      //'gruvbox-dark-medium',
      //'gruvbox-dark-soft',
      //'gruvbox-light-hard',
      //'gruvbox-light-medium',
      //'gruvbox-light-soft',
      //'houston',
      //'kanagawa-dragon',
      //'kanagawa-lotus',
      //'kanagawa-wave',
      //'laserwave',
      //'light-plus',
      //'material-theme',
      //'material-theme-darker',
      //'material-theme-lighter',
      //'material-theme-ocean',
      //'material-theme-palenight',
      //'min-dark',
      //'min-light',
      //'monokai',
      //'night-owl',
      //'nord',
      //'one-dark-pro',
      //'one-light',
      //'plastic',
      //'poimandres',
      //'red',
      //'rose-pine',
      //'rose-pine-dawn',
      //'rose-pine-moon',
      //'slack-dark',
      //'slack-ochin',
      //'snazzy-light',
      //'solarized-dark',
      //'solarized-light',
      //'synthwave-84',
      //'tokyo-night',
      //'vesper',
      //'vitesse-black',
      'vitesse-light',
      'vitesse-dark',
    ],
  },
  // Social links to display in the footer.
  socialLinks: {
    github: 'https://github.com/dalrosales',
    email: 'mailto:dalrosales@outlook.com',
    linkedin: 'https://www.linkedin.com/in/dalrosales/',
    rss: true, // Set to true to include an RSS feed link in the footer
  },
  giscus: undefined,
  // Configuration for Giscus comments.
  // To set up Giscus, follow the instructions at https://giscus.app/
  // You'll need a GitHub repository with discussions enabled and the Giscus app installed.
  // Take the values from the generated script tag at https://giscus.app and fill them in here.
  // If you don't want to use Giscus, set this to undefined.
  //giscus: {
  //  repo: 'stelcodes/multiterm-astro',
  //  repoId: 'R_kgDOPNnBig',
  //  category: 'Giscus',
  //  categoryId: 'DIC_kwDOPNnBis4CteOc',
  //  reactionsEnabled: true, // Enable reactions on post itself
  //},
}

export default config

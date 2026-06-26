import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: '/ligalive/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      title: 'LigaLive — Live Football Scores, Results & Statistics',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'Follow live football scores, results and statistics from local and international leagues in real time on LigaLive.',
        },
        { name: 'theme-color', content: '#020617' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
      script: [
        {
          // Set theme before paint to avoid flash of incorrect color mode. Dark is the default.
          innerHTML: `(function(){try{var t=localStorage.getItem('ligalive-theme');var d=t? t==='dark' : true;document.documentElement.classList.toggle('dark', d);}catch(e){document.documentElement.classList.add('dark');}})();`,
          tagPosition: 'head',
        },
      ],
    },
  },
})

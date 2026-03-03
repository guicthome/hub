import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Hub Grupo CSV",
  description: "Portal central do ecossistema Grupo CSV - AxiaCare®, MedValor®, TheraTech®",
  lang: 'pt-BR',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' }],
    ['meta', { property: 'og:title', content: 'Hub Grupo CSV | Portal Central' }],
    ['meta', { property: 'og:description', content: 'Ecossistema de soluções em saúde: AxiaCare®, MedValor®, TheraTech®' }],
    ['meta', { property: 'og:image', content: 'https://hub.grupocsv.com/og/og_hub.png' }],
    ['meta', { property: 'og:url', content: 'https://hub.grupocsv.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/visual-identity/grupo-csv/logo/png/grupo-csv_logo_horizontal_full-color_positive_transparent.png',
    siteTitle: 'Hub Grupo CSV',

    nav: [
      { text: 'Início', link: '/' },
      {
        text: 'Empresas',
        items: [
          { text: 'AxiaCare', link: '/axia/' },
          { text: 'MedValor', link: '/medvalor/' },
          { text: 'TheraTech', link: '/thera/' },
        ]
      },
      {
        text: 'Parceiros',
        items: [
          { text: 'Unimed GV', link: '/unimed/' },
          { text: 'Unihealth GV', link: '/unihealth/' },
          { text: 'ICDS', link: '/icds/' },
        ]
      },
      { text: 'Compliance', link: '/compliance/' },
      { text: 'Fundador', link: '/founder/' },
      { text: 'Compass\u2122', link: '/compass/' },
      { text: 'Signal\u2122', link: '/signal/' },
      { text: 'Infra', link: '/_infra/' },
    ],

    sidebar: {
      '/compass/': [
        {
          text: 'Compass\u2122',
          items: [
            { text: 'Central Compass\u2122', link: '/compass/' },
            {
              text: '2026',
              collapsed: false,
              items: [
                { text: '001 \u2014 Metas ACO', link: '/compass/edicoes/2026/001/compass' },
              ]
            },
          ]
        }
      ],
      '/signal/': [
        {
          text: 'Signal\u2122',
          items: [
            { text: 'Central Signal\u2122', link: '/signal/' },
            {
              text: '2026',
              collapsed: false,
              items: [
                { text: 'S09 \u2014 23 Fev-1 Mar', link: '/signal/edicoes/2026/S09/signal' },
                { text: 'S08 \u2014 23 Fev-1 Mar', link: '/signal/edicoes/2026/S08/signal' },
                { text: 'S07 \u2014 16-23 Fev', link: '/signal/edicoes/2026/S07/signal' },
              ]
            },
            { text: 'Padr\u00e3o Editorial', link: '/signal/policies/padrao-editorial' },
            { text: 'Guia Operacional', link: '/signal/skills/gerar-signal' },
            { text: 'Template', link: '/signal/templates/signal_template' },
          ]
        }
      ],
      '/_infra/': [
        {
          text: 'Infraestrutura Cognitiva',
          items: [
            { text: 'Visão Geral', link: '/_infra/' },
            {
              text: 'CSV Core',
              collapsed: false,
              items: [
                { text: 'Definição', link: '/_infra/csv-core/definition' },
                { text: 'Sistema de Identidade', link: '/_infra/csv-core/identity-system' },
                { text: 'Assets', link: '/_infra/csv-core/assets' },
                { text: 'Guia de Logos', link: '/_infra/assets/logo-usage-guide' },
                { text: 'Playbook Hub', link: '/_infra/csv-core/playbook-hub' },
                { text: 'Fundador', link: '/_infra/csv-core/founder' },
              ]
            },
            { text: 'AxiaCare Mandate', link: '/_infra/axiacare/mandate' },
            { text: 'MedValor Mandate', link: '/_infra/medvalor/mandate' },
            { text: 'TheraTech Mandate', link: '/_infra/thera/mandate' },
            { text: 'Padrão de Footer', link: '/_infra/standards/footer' },
            { text: 'Arquivo de Páginas', link: '/_infra/archive/' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/grupocsv/hub' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/gui-thome' }
    ],



    search: {
      provider: 'local'
    },

    outline: {
      label: 'Nesta página'
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Próximo'
    },

    darkModeSwitchLabel: 'Tema',
    returnToTopLabel: 'Voltar ao topo',
    sidebarMenuLabel: 'Menu',
  }
})

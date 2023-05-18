<script setup lang="ts">
// https://github.com/vueuse/head
useHead({
  title: 'Tech Depot',
  meta: [
    { name: 'description', content: 'A collection of useful tools for software development.' },
    { name: 'author', content: 'Jonas Froeller' },
    { name: 'keywords', content: 'webdev,softwaredev,stack,tools' },
    { property: 'og:site_name', content: 'TechDepot' },
    { property: 'og:description', content: 'A collection of useful tools for software development.' },
    { property: 'og:image', content: '/pwa-512x512.png' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/pwa-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/safari-pinned-tab.svg',
      color: () => isDark.value ? '#00aba9' : '#ffffff',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/pwa-512x512.png',
      sizes: '512x512',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<script lang="ts">
export default {
  methods: {
    toggleNavigation() {
      const currentValue = this.$el.getAttribute('data-navigation-open')
      const newValue = currentValue === 'true' ? 'false' : 'true'
      this.$el.setAttribute('data-navigation-open', newValue)

      const navigationBar = this.$el.querySelector('[data-navigation-bar]')

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          navigationBar.classList.remove('hidden')
          navigationBar.classList.remove('fixed', 'bg-[#121212]', 'p-2', 'border', 'rounded-lg', 'flex', 'flex-col', 'top-1/2', 'left-1/2', 'translate-y-[-50%]', 'translate-x-[-50%]')
          this.$el.setAttribute('data-navigation-open', 'false')
        }
        else {
          navigationBar.classList.add('hidden')
        }
      })

      if (newValue === 'true') {
        navigationBar.classList.remove('hidden')
        navigationBar.classList.add('fixed', 'bg-[#121212]', 'p-2', 'border', 'rounded-lg', 'flex', 'flex-col', 'top-1/2', 'left-1/2', 'translate-y-[-50%]', 'translate-x-[-50%]')
      }
      else {
        navigationBar.classList.add('hidden')
        navigationBar.classList.remove('fixed', 'bg-[#121212]', 'p-2', 'border', 'rounded-lg', 'flex', 'flex-col', 'top-1/2', 'left-1/2', 'translate-y-[-50%]', 'translate-x-[-50%]')
      }
    },
  },
}
</script>

<template>
  <header sticky top-0 z-999 w-full class="bg-[#121212] text-white" py-2 pl-4 pr-4 shadow-md>
    <nav flex items-center justify-between text-xl>
      <div lg:flex="~ gap-4" data-navigation-bar class="hidden">
        <RouterLink to="/" :title="t('button.home')" flex="~ gap-1" icon-btn>
          <div i-carbon-home />
          {{ t('button.home') }}
        </RouterLink>

        <RouterLink icon-btn to="/about" :title="t('button.about')" flex="~ gap-1">
          <div i-carbon-dicom-overlay />
          {{ t('button.about') }}
        </RouterLink>
      </div>
      <div flex lg:hidden data-navigation-open="false" @click="toggleNavigation">
        <div space-y-2>
          <span block h-0.5 w-8 bg-gray-600 />
          <span block h-0.5 w-8 bg-gray-600 />
          <span block h-0.5 w-8 bg-gray-600 />
        </div>
      </div>

      <div flex="~ gap-2">
        <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
        </button>

        <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
          <div i-carbon-language />
        </a>

        <a icon-btn rel="noreferrer" href="https://github.com/jonasfroeller/Vue_TechDepot" target="_blank" title="GitHub">
          <div i-carbon-logo-github />
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <header sticky top-0 w-full pl-2 pr-2 pt-6>
    <nav flex justify-between text-xl>
      <div flex="~ gap-6">
        <RouterLink to="/" :title="t('button.home')" flex="~ gap-1" icon-btn>
          <div i-carbon-home />
          {{ t('button.home') }}
        </RouterLink>

        <RouterLink icon-btn to="/about" :title="t('button.about')" flex="~ gap-1">
          <div i-carbon-dicom-overlay />
          {{ t('button.about') }}
        </RouterLink>
      </div>

      <div flex="~ gap-2">
        <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
          <div i="carbon-sun dark:carbon-moon" />
        </button>

        <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
          <div i-carbon-language />
        </a>

        <a icon-btn rel="noreferrer" href="https://github.com/jonasfroeller" target="_blank" title="GitHub">
          <div i-carbon-logo-github />
        </a>
      </div>
    </nav>
  </header>
</template>

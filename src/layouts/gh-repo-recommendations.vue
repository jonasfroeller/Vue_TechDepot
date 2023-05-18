<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <HeaderVue />
  <h1 flex justify-center break-all py-4 text-center text-5xl>
    {{ t('gh-repo-recommendations.title') }}
  </h1>
  <StarredReposVue />
  <FooterVue />
</template>

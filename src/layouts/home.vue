<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <HeaderVue />
  <h1 flex justify-center break-all py-4 text-center text-5xl>
    {{ t('home.title') }}
  </h1>
  <MainVue />
  <FooterVue />
</template>

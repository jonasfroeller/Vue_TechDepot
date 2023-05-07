<script setup lang="ts">
defineOptions({
  name: 'Home',
})
const history = searchHistory()
const search = ref(history.input)

const router = useRouter()
function go() {
  if (search.value)
    router.push(`search/${encodeURIComponent(search.value)}?category=all`)
}

const { t } = useI18n()
</script>

<template>
  <div flex>
    <SearchInputVue
      v-model="search"
      :placeholder="t('search.placeholder')"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button
        m-3 text-sm btn
        :disabled="!search"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

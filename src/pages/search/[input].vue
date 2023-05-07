<script setup lang="ts">
const props = defineProps<{ input: string }>()
const router = useRouter()
const history = searchHistory()
const { t } = useI18n()

watchEffect(() => {
  history.addInput(props.input)
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-search-locate-mirror inline-block />
    </div>
    <p>
      {{ t('search.current', { search: props.input }) }}
    </p>

    <template v-if="history.input.length">
      <ul mt-4 text-sm>
        <li v-for="prevText in history.previousInputs" :key="prevText">
          <RouterLink :to="`/search/${prevText}`" replace>
            {{ prevText }}
          </RouterLink>
        </li>
      </ul>
    </template>

    <div>
      <button
        m="3 t6" text-sm btn
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>

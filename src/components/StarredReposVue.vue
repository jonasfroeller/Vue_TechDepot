<script setup lang="ts">
import { type Repo } from '~/types'
import { fetchStarredRepos } from '~/modules/fetch_starred_repos'

const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'GetRequestAsyncAwait',
  data() {
    return {
      repos: [] as Repo[],
      error: null as string | null,
    }
  },
  async created() {
    const username = 'jonasfroeller'
    fetchStarredRepos(username)
      .then((repos) => {
        this.repos = Array.from(repos.values())
      })
      .catch((error) => {
        this.error = error
      })
  },

  methods: {
    copyToClipboard(event: Event) {
      const element = event.target as HTMLElement
      const text = element?.getAttribute('data-text') ?? ''
      navigator.clipboard.writeText(text)
    },
  },
}
</script>

<template>
  <section mt-8 p-4 text-center>
    <h2 text-4xl>
      {{ t('home.recommended') }}
    </h2>
    <div v-if="repos.length > 0" grid grid-cols-1 my-4 gap-4 lg:grid-cols-2 xl:grid-cols-3 :data-amount="repos.length">
      <div v-for="(repo, index) in repos" :key="index" border rounded-lg p-4 :data-repo-id="repo.id">
        <h2 flex flex-wrap items-center justify-center gap-2 text-2xl font-medium :data-user-id="repo.owner.id">
          <a :href="repo.html_url ?? '#'" text-green-600 hover:underline>{{ repo.name }}</a>
          by
          <a :href="repo.owner.html_url" my-2 flex items-center text-green-600 hover:underline>
            <img :src="repo.owner.avatar_url" alt="avatar" mr-2 h-8 w-8 rounded-full>
            {{ repo.owner.login }}</a>
        </h2>
        <div mb-2 flex flex-col justify-between gap-2 lg:flex-row>
          <div w-full text-left>
            <p mb-2 break-all text-lg text-gray-600>
              {{ repo.description }}
            </p>
          </div>
          <ul justify-right hidden w-25 flex-col border-t py-2 text-right lg:flex>
            <li flex items-center justify-between>
              <span i-carbon-data-volume inline-block /> {{ repo.size }}
            </li>
            <li flex items-center justify-between>
              <span i-carbon-star inline-block /> {{ repo.stargazers_count }}
            </li>
            <li flex items-center justify-between>
              <span i-carbon-view inline-block /> {{ repo.watchers_count }}
            </li>
            <li flex items-center justify-between>
              <span i-carbon-branch inline-block /> {{ repo.forks_count }}
            </li>
            <li flex items-center justify-between border-b>
              <span i-carbon-error inline-block /> {{ repo.open_issues_count }}
            </li>
          </ul>
        </div>
        <hr>
        <div my-2 flex flex-wrap gap-2 sm:flex-nowrap>
          <ul flex flex-row flex-wrap justify-center gap-4 border-b border-t py-2 text-right lg:hidden lg:flex-col lg:gap-0>
            <li flex items-center>
              <span i-carbon-data-volume inline-block /> {{ repo.size }}
            </li>
            <li flex items-center>
              <span i-carbon-star inline-block /> {{ repo.stargazers_count }}
            </li>
            <li flex items-center>
              <span i-carbon-view inline-block /> {{ repo.watchers_count }}
            </li>
            <li flex items-center>
              <span i-carbon-branch inline-block /> {{ repo.forks_count }}
            </li>
            <li flex items-center>
              <span i-carbon-error inline-block /> {{ repo.open_issues_count }}
            </li>
          </ul>
          <div h-fit w-full border rounded-lg p-2 lg:w-full>
            <p text-blue-400>
              Created at: {{ new Date(repo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
            <p text-green-400>
              Updated at: {{ new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
            <p>Language: {{ repo.language }}</p>
            <p v-if="repo.homepage !== '' && repo.homepage !== null">
              Website: <a :href="repo.homepage" break-all hover:underline>{{ repo.homepage.split("/")[2].split(".")[0] }}</a>
            </p>
            <p v-if="repo?.license?.spdx_id !== null" text-purple-400>
              License: <a hover:underline :href="repo?.license?.url ?? '#'">{{ repo?.license?.spdx_id }}</a>
            </p>
          </div>
          <div h-fit flex flex-wrap gap-2>
            <div v-for="topic in repo.topics" :key="topic" h-fit border rounded-full px-2 py-1>
              {{ topic }}
            </div>
          </div>
        </div>
        <hr>
        <div mt-2 flex flex-gap-2 text-left>
          <p cursor-pointer truncate rounded-lg bg-gray-200 p-1 text-black :data-text="repo.clone_url" @click="copyToClipboard($event)">
            {{ repo.clone_url }}
          </p>
          <p cursor-pointer truncate rounded-lg bg-gray-200 p-1 text-black :data-text="repo.git_url" @click="copyToClipboard($event)">
            {{ repo.git_url }}
          </p>
          <p cursor-pointer truncate rounded-lg bg-gray-200 p-1 text-black :data-text="repo.ssh_url" @click="copyToClipboard($event)">
            {{ repo.ssh_url }}
          </p>
        </div>
        <p v-if="repo.archived" my-2 border border-2 rounded-md text-orange-200>
          This repository is archived!
        </p>
        <p v-if="repo.is_template" my-2 border border-2 rounded-md text-green-200>
          This repository is a template!
        </p>
      </div>
    </div>
    <div v-else-if="error !== null">
      couldn't load data
    </div>
    <div v-else>
      loading...
    </div>
  </section>
</template>

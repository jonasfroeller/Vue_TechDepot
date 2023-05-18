<script setup lang="ts">
import { type Repo } from '~/types'
import { fetchStarredRepos } from '~/modules/fetch_starred_repos'
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
      // eslint-disable-next-line no-alert
      alert('Copied to clipboard')
    },
  },
}
</script>

<template>
  <section mb-6 mt-2 p-4 text-center>
    <div v-if="repos.length > 0" grid grid-cols-1 my-4 gap-4 lg:grid-cols-2 xl:grid-cols-3 :data-amount="repos.length">
      <div v-for="(repo, index) in repos" :key="index" border rounded-lg p-4 :data-repo-id="repo.id">
        <h2 flex flex-wrap items-center justify-center gap-2 break-all text-2xl font-medium :data-user-id="repo.owner.id">
          <a :href="repo.html_url ?? '#'" text-green-600 hover:underline>{{ repo.name }}</a>
          by
          <a :href="repo.owner.html_url" my-2 flex items-center break-all text-green-600 hover:underline>
            <img :src="repo.owner.avatar_url" alt="avatar" mr-2 h-8 w-8 rounded-full>
            {{ repo.owner.login }}</a>
        </h2>
        <div flex flex-col gap-2>
          <div w-full text-left>
            <p mb-2 break-all text-lg text-gray-600>
              {{ repo.description }}
            </p>
          </div>
          <ul w-full flex flex-wrap border-t py-2>
            <li mr-6 flex items-center gap-1>
              <span i-carbon-data-volume inline-block /> {{ repo.size }}
            </li>
            <li mr-6 flex items-center gap-1>
              <span i-carbon-star inline-block /> {{ repo.stargazers_count }}
            </li>
            <li mr-6 flex items-center gap-1>
              <span i-carbon-view inline-block /> {{ repo.watchers_count }}
            </li>
            <li mr-6 flex items-center gap-1>
              <span i-carbon-branch inline-block /> {{ repo.forks_count }}
            </li>
            <li flex items-center gap-1>
              <span i-carbon-error inline-block /> {{ repo.open_issues_count }}
            </li>
          </ul>
        </div>
        <hr>
        <div my-2 flex flex-wrap gap-2 sm:flex-nowrap>
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
              License: <a hover:underline :href="repo?.license?.url ?? '#'">{{ repo?.license?.spdx_id ?? "None" }}</a>
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
          <p cursor-pointer truncate rounded-lg bg-gray-400 bg-opacity-25 p-1 :data-text="repo.clone_url" @click="copyToClipboard($event)">
            {{ repo.clone_url }}
          </p>
          <p cursor-pointer truncate rounded-lg bg-gray-400 bg-opacity-25 p-1 :data-text="repo.git_url" @click="copyToClipboard($event)">
            {{ repo.git_url }}
          </p>
          <p cursor-pointer truncate rounded-lg bg-gray-400 bg-opacity-25 p-1 :data-text="repo.ssh_url" @click="copyToClipboard($event)">
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
      <div class="loading-wrapper">
        <div class="loading-animation">
          <div border-6 border-teal-600 />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  @keyframes loading-animation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .loading-animation div {
    position: absolute;
    width: 30px;
    height: 30px;
    border-top-color: transparent;
    border-radius: 50%;
  }

  .loading-animation div {
    animation: loading-animation 1s linear infinite;
    top: 100px;
    left: 100px
  }

  .loading-wrapper {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .loading-animation {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }

  .loading-animation div {
    box-sizing: content-box;
  }
</style>

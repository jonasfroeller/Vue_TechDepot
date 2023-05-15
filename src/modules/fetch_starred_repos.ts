import axios from 'axios'
import { type Repo } from '~/types'

// const MAX_REQUESTS_PER_HOUR = 5000
const REQUESTS_PER_MINUTE = 60
const RATE_LIMIT_DELAY = 60 * 1000 / REQUESTS_PER_MINUTE

export async function fetchStarredRepos(username: string): Promise<Map<number, Repo>> {
  let page = 1
  const repos: Map<number, Repo> = new Map()

  while (true) {
    await delay(RATE_LIMIT_DELAY)

    const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
      params: {
        page,
        per_page: 100,
      },
    })

    const repoData: Repo[] = response.data

    for (const repo of repoData)
      repos.set(repo.id, repo)

    const nextPageUrl = getNextPageUrl(response.headers.link)
    if (!nextPageUrl)
      break

    page = getPageFromUrl(nextPageUrl)
  }

  return repos
}

function getNextPageUrl(linkHeader: string): string | null {
  const links = linkHeader.split(',')

  for (const link of links) {
    const [url, rel] = link.split(';').map(part => part.trim())
    if (rel === 'rel="next"') {
      const nextPageUrl = url.match(/<(.*?)>/)
      return nextPageUrl ? nextPageUrl[1] : null
    }
  }

  return null
}

function getPageFromUrl(url: string): number {
  const regex = /page=(\d+)/
  const match = url.match(regex)
  if (match)
    return parseInt(match[1])

  return 1
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

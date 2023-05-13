import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Repo {
  id: number
  name: string
  description: string | null
  owner: {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }
  html_url: string | null
  created_at: string
  updated_at: string
  git_url: string
  clone_url: string
  ssh_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  language: string
  archived: boolean
  license: {
    spdx_id: string
    url: string
  } | null
  is_template: boolean
  topics: string[] | null
}

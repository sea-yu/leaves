import { linkProjects } from './link-projects'
import { useMemo } from 'react'
import { projectMeta } from './project-meta'

const projects = [
  ...projectMeta,
  ...linkProjects,
]

export const getProjectMeta = () => projects

export const useProjectMeta = () => {
  return useMemo(() => projects, [])
}

export const getProjectsByTag = (tag: string) => {
  return projects.filter(project => project.meta.tags?.includes(tag))
}

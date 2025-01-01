import { ProjectMeta } from './types';

export type { ProjectMeta, RegisteredProject } from './types';

export const registerProjectMeta = (meta: ProjectMeta) => {
  // 注册信息会被vite插件提取
  // 这个类现在只是为了类型检查
}

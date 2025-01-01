export interface ProjectMeta {
  title: string;
  description?: string;
  tags?: string[];
  createTime?: string;
  icon?: string;
  hidden?: boolean;
}

export interface RegisteredProject extends ProjectMeta {
  path: string;
}

export interface PluginOptions {
  path?: string,
  pattern?: string,
  output?: string,
} 
import type { Plugin } from 'vite'
import { resolve } from 'path';
import type { PluginOptions } from './types';
import { generateProjectMeta } from './core';

const DEFAULT_OPTIONS: Required<PluginOptions> = {
  path: 'src/pages',
  output: 'src/project-meta.ts',
  pattern: '**/*.{jsx,tsx}',
};

export default (options: PluginOptions): Plugin => {
  const resolvedOptions: Required<PluginOptions> = { ...DEFAULT_OPTIONS, ...options };
  let root: string;

  return {
    name: 'vite-plugin-meta-data',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
    },
    async buildStart() {
      generateProjectMeta(root, resolvedOptions)
    },
    async handleHotUpdate({ file }) {
      if (!root || !file.startsWith(resolve(root, resolvedOptions.path))) {
        return;
      }

      generateProjectMeta(root, resolvedOptions)
    }
  }
}

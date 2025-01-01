import { glob } from 'glob'
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import ts from 'typescript';
import type { ProjectMeta, PluginOptions, RegisteredProject } from './types';

const generatePath = (filePath: string) => {
  let path = filePath.replace(/\.tsx?$/, "").replace(/\/index$/, "");
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  return path;
};

function extractProjectInfo(sourceFile: ts.SourceFile): ProjectMeta | null {
  let projectInfo: Record<string, any> = {};

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const callExpression = node as ts.CallExpression;
      if (
        ts.isIdentifier(callExpression.expression) &&
        callExpression.expression.text === 'registerProjectMeta' &&
        callExpression.arguments.length === 1
      ) {
        const arg = callExpression.arguments[0];
        if (ts.isObjectLiteralExpression(arg)) {
          arg.properties.forEach((prop) => {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
              const propName = prop.name.text;
              let value: any;
              if (ts.isStringLiteral(prop.initializer)) {
                value = prop.initializer.text;
              } else if (ts.isArrayLiteralExpression(prop.initializer)) {
                value = prop.initializer.elements
                  .filter(ts.isStringLiteral)
                  .map(element => (element as ts.StringLiteral).text);
              }
              if (value !== undefined) {
                projectInfo[propName] = value;
              }
            }
          });
        }
        return
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return Object.keys(projectInfo).length > 0 ? projectInfo as ProjectMeta : null;
}

const generate = async (root: string, options: Required<PluginOptions>) => {
  const pagesDir = resolve(root, options.path);
  const files = await glob(options.pattern, {
    cwd: pagesDir,
  });

  const projects: RegisteredProject[] = [];

  await Promise.allSettled(files.map(async (file) => {
    const filePath = resolve(pagesDir, file);
    const content = await readFile(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      file,
      content,
      ts.ScriptTarget.Latest,
      true
    );
    const meta = extractProjectInfo(sourceFile);
    if (meta) {
      projects.push({
        path: generatePath(file),
        ...meta,
      });
    }
  }));

  return projects;
}

export const generateProjectMeta = async (root: string, options: Required<PluginOptions>) =>{
  const projects = await generate(root, options)
  const outputPath = resolve(root, options.output)
  return writeFile(outputPath, `export const projectMeta = ${JSON.stringify(projects, null, 2)}`)
}
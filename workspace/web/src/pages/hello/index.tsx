import { registerProjectMeta } from 'vite-plugin-meta-data';

registerProjectMeta({
  title: "Hello World",
  description: "A simple hello world page",
  tags: ["demo"],
  icon: "H",
  createTime: "2025-01-01"
});

export default function HelloPage() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
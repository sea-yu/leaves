import { BoxCard } from "@/components/box-card";
import { useProjectMeta } from "@/project-meta";

const Home = () => {
  const projects = useProjectMeta()

  return <div>
    <div className="flex flex-wrap gap-8">
      {
        projects.map((project) => (
          <BoxCard
            key={project.title}
            projectInfo={project}
          />
        ))
      }
    </div>
  </div>;
}

export default Home
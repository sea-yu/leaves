import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useProjectMeta } from "@/project-meta";
import { useState, useMemo } from "react";
import React from "react";
import type { RegisteredProject } from "vite-plugin-meta-data";

type ProjectBoxLinkProps = {
  title: string;
  description?: string;
  tags?: string[];
  createTime?: string;
  hidden?: boolean;
  link: string;
  icon?: string;
};

type ProjectBoxProps = ProjectBoxLinkProps | RegisteredProject;

export const MetaSearch: React.FC = () => {
  const navigate = useNavigate();
  const projects = useProjectMeta();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (!search) return [];
    const searchLower = search.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
    ).slice(0, 5); // 最多显示5个结果
  }, [projects, search]);

  const handleSelect = (project: ProjectBoxProps) => {
    if ('path' in project) {
      navigate(project.path);
    } else if ('link' in project) {
      const link = project.link.startsWith('http') ? project.link : `https://${project.link}`;
      window.open(link, '_blank');
    }
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // 延迟关闭，以便点击事件能够触发
          setTimeout(() => setIsOpen(false), 200);
        }}
        startContent={<Icon icon="mdi:magnify" className="text-default-400" />}
        placeholder="搜索"
        size="sm"
        radius="lg"
        classNames={{
          input: "text-sm",
          inputWrapper: "shadow-sm"
        }}
      />
      {isOpen && search && (
        <div 
          className="absolute w-full mt-2 bg-content1 rounded-xl shadow-xl border border-default-200 overflow-hidden backdrop-blur-sm backdrop-saturate-150"
        >
          {filteredProjects.length > 0 ? (
            <Listbox 
              aria-label="搜索结果"
              onAction={(key) => {
                const project = filteredProjects.find(p => p.title === key);
                if (project) handleSelect(project);
              }}
              itemClasses={{
                base: "px-3 gap-3 h-12 data-[hover=true]:bg-default-100",
                title: "text-sm font-medium",
                description: "text-xs text-default-400"
              }}
            >
              {filteredProjects.map((project) => (
                <ListboxItem
                  key={project.title}
                  startContent={
                    typeof project.icon === 'string' ? (
                      project.icon.startsWith('http') || project.icon.startsWith('/') ? (
                        <img src={project.icon} className="w-6 h-6 rounded-sm object-cover" alt={project.title} />
                      ) : (
                        <Icon icon={project.icon} className="w-6 h-6 text-default-500" />
                      )
                    ) : null
                  }
                  endContent={
                    'link' in project ? (
                      <Icon icon="ph:arrow-square-out" className="text-default-400" />
                    ) : null
                  }
                  description={project.description}
                >
                  {project.title}
                </ListboxItem>
              ))}
            </Listbox>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <Icon icon="mdi:leaf-off" className="w-12 h-12 text-default-300 mb-2" />
              <p className="text-default-500 text-sm text-center">
                没有找到相关项目
              </p>
              <p className="text-default-400 text-xs text-center mt-1">
                试试其他关键词吧
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
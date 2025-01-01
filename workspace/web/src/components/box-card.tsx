import { Avatar } from "@nextui-org/react"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"

export const BoxCard = ({ projectInfo }: { projectInfo: ProjectBoxProps }) => {
  const navigate = useNavigate()

  function handleClick() {
    if ('path' in projectInfo) {
      navigate(projectInfo.path)
    } else if ('link' in projectInfo) {
      const link = projectInfo.link.startsWith('http') ? projectInfo.link : `https://${projectInfo.link}`
      window.open(link, '_blank')
    }
  }

  const BoxCardIcon = useMemo(() => {
    if (
      typeof projectInfo.icon === 'string' &&
      (projectInfo.icon.startsWith('http') || projectInfo.icon.startsWith('/'))
    ) {
      return <Avatar src={projectInfo.icon} />
    }
    else if (typeof projectInfo.icon === 'string' && projectInfo.icon.includes(":")) {
      return <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-700 text-white rounded-full">
        <Icon icon={projectInfo.icon} className="w-5 h-5 sm:w-8 sm:h-8" />
      </div>
    }
    return <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-700 text-white rounded-full">
      {projectInfo.icon[0]}
    </div>
  }, [projectInfo.icon])

  return (
    <section
      className="overflow-hidden h-20 sm:h-24 relative border rounded-xl transition-all duration-300 hover:scale-105 hover:bg-default-100 cursor-pointer w-full sm:w-[280px] md:w-[320px] lg:w-[360px]" 
      onClick={handleClick}
    >
      <div className="flex flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 h-full">
        <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
          { BoxCardIcon }
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold truncate">{projectInfo.title}</h3>
          <p className="text-xs sm:text-sm text-default-500 truncate">{projectInfo.description}</p>
          <p className="text-[10px] sm:text-xs text-default-400 mt-0.5">{projectInfo.createTime}</p>
        </div>
        {'link' in projectInfo ? (
          <Icon 
            icon="ph:arrow-square-out" 
            className="absolute right-2 sm:right-3 top-2 sm:top-3 text-default-400 w-4 h-4 sm:w-5 sm:h-5" 
          />
        ) : (
          <Icon 
            icon="bxs:leaf" 
            className="absolute right-2 sm:right-3 top-2 sm:top-3 text-leaf w-5 h-5 sm:w-6 sm:h-6" 
          />
        )}
      </div>
    </section>
  )
}
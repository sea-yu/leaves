import { Button } from "@nextui-org/react"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-[calc(100vh-12rem-1px)] flex flex-col items-center justify-center">
      <div className="relative mb-16">
        <h1 className="text-8xl font-bold text-default-200">404</h1>
        <Icon 
          icon="bxs:leaf" 
          className="absolute -top-4 -right-4 text-leaf/50 rotate-45" 
          width={48} 
          height={48}
        />
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">页面不见了</h2>
        <p className="text-default-500 mb-8">
          可能是落叶飘走了，让我们回到主页吧
        </p>
        
        <Button
          variant="flat"
          color="primary"
          startContent={<Icon icon="mdi:home" />}
          onPress={() => navigate('/')}
        >
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
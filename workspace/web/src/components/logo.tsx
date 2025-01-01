import { Avatar } from "@nextui-org/react"

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        src="/logo.png" 
        className="transition-transform"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-none bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          落叶海
        </span>
        <span className="text-[10px] text-default-500">
          Fallen Leaves Sea
        </span>
      </div>
    </div>
  )
}

export default Logo
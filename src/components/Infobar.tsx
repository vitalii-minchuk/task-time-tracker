import { FC } from "react"

type InfoBarProps = {
  message: string | null
}

const InfoBar: FC<InfoBarProps> = ({ message }) => {
  let bgColor = "text-green-700"
  let text = ""
  
  if (message) {text = message.split("-*-").join(" ")}
  if (message?.includes("-*-has been deleted")) {bgColor = "text-red-700"}

  return (
    <div className="absolute bottom-5 right-10 text-xs px-2 sm:text-lg ">
      <p className={bgColor}>
        {text}
      </p>
    </div>
  )
}

export default InfoBar
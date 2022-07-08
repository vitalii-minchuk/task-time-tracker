import { FC } from "react"

type InfoBarProps = {
  message: string | null
}

const InfoBar: FC<InfoBarProps> = ({ message }) => {
  let bgColor = "text-green-700"
  if (message?.length === 24) {bgColor = "text-red-700"}

  return (
    <div className="absolute bottom-5 right-10">
      <div className={bgColor}>
        {message}
      </div>
    </div>
  )
}

export default InfoBar
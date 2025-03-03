import React from "react"
import { getImageByKey } from "../../assets/getImageByKey"
import "../styles/Loader.scss" // Стили

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader">{getImageByKey("loading")}</div>
    </div>
  )
}

export default Loader

import React, { useState } from "react"
import { getImageByKey } from "../../assets/getImageByKey"
import Sidebar from "../Sidebar/SidebarContainer"
import "../styles/Header.scss"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="Header">
        <button onClick={toggleMenu}>{getImageByKey("burger")}</button>
        <h1>BESIDER</h1>
      </div>
      <div className="line" />
      {/* Передаем isMenuOpen в Sidebar */}
      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Header

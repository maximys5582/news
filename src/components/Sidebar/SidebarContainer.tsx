import React from "react"
import { getImageByKey } from "../../assets/getImageByKey"
import "../styles/ Sidebar.scss"

interface SidebarProps {
  isOpen: boolean
}

// SVG крестик для закрытия

interface SidebarProps {
  isOpen: boolean
  toggleMenu: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleMenu }) => {
  return (
    <aside className={`Sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleMenu}>
        {getImageByKey("close")}
      </button>
      <ul>
        <li>SCIENCE</li>
        <li>GENERAL</li>
        <li>ENTERTAINMENT</li>
        <li>TECHNOLOGY</li>
        <li>BUSINESS</li>
        <li>HEALTH</li>
        <li>SPORTS</li>
      </ul>
    </aside>
  )
}

export default Sidebar

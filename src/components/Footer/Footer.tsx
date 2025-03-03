import { getImageByKey } from "../../assets/getImageByKey"
import "../styles/Footer.scss"

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-links">
        <a href="#">Log in</a>
        <a href="">About Us</a>
        <a href="">Publishers</a>
        <a href="">Sitemap</a>
      </div>
      <img className="Footer-img" src={getImageByKey("powerBy") as string} />
      <p className="Footer-inspired">© 2023 Besider. Inspired by Insider</p>
    </div>
  )
}

export default Footer

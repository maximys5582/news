import React from "react"
import "../styles/NewsItem.scss"

interface NewsItemProps {
  item: {
    title: string
    description: string
    url: string
    urlToImage?: string
    publishedAt: string
  }
  showDate?: boolean // Дополнительный пропс для управления отображением даты
}

const NewsItem: React.FC<NewsItemProps> = ({ item, showDate = true }) => {
  // Форматируем дату
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
    return date.toLocaleString("en-US", options)
  }

  return (
    <div className="NewsItem">
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {/* Блок с изображением и текстом */}
        <div className="NewsItem-item">
          {item.urlToImage && (
            <div className="NewsItem-img">
              <img src={item.urlToImage} alt={item.title} />
            </div>
          )}
          {/* Заголовок новости */}
          <div className="NewsItem-title">
            <h3>{item.title}</h3>
          </div>
          {/* Дата публикации */}
        </div>{" "}
        {showDate && (
          <p className="NewsItem-date">{formatDate(item.publishedAt)}</p>
        )}
      </a>
    </div>
  )
}

export default NewsItem

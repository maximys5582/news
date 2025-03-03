import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNewsAsync } from "../../redux/slices/newsSlice"
import { AppDispatch, RootState } from "../../redux/store"
import Loader from "../Loader/Loader"
import NewsItem from "../NewsItem/NewsItem"

// Определяем тип для новости
interface NewsItem {
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
}

const NewsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const news = useSelector((state: RootState) => state.news.news)
  const status = useSelector((state: RootState) => state.news.status)
  const page = useSelector((state: RootState) => state.news.page)
  const hasMore = useSelector((state: RootState) => state.news.hasMore)
  const [loadingMore, setLoadingMore] = useState(false)

  // Реф для контейнера, ограниченного по высоте
  const containerRef = useRef<HTMLDivElement>(null)

  // Загружаем первую страницу при монтировании
  useEffect(() => {
    dispatch(fetchNewsAsync({ query: "technology", page: 1 }))
  }, [dispatch])

  // Обработчик прокрутки для контейнера
  const scrollHandler = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    if (
      scrollHeight - scrollTop - clientHeight < 100 &&
      hasMore &&
      status !== "loading" &&
      !loadingMore
    ) {
      setLoadingMore(true)
      // Задержка 1 секунда перед загрузкой следующей страницы
      setTimeout(() => {
        dispatch(fetchNewsAsync({ query: "technology", page })).finally(() => {
          setLoadingMore(false)
        })
      }, 1000)
    }
  }, [dispatch, page, hasMore, status, loadingMore])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("scroll", scrollHandler)
    return () => {
      container.removeEventListener("scroll", scrollHandler)
    }
  }, [scrollHandler])

  // Сортировка новостей по дате (от новых к старым)
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // Группировка новостей по дате
  const groupedNews: { [date: string]: NewsItem[] } = sortedNews.reduce(
    (acc, item) => {
      const date = new Date(item.publishedAt).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = [item]
      } else {
        acc[date].push(item)
      }
      return acc
    },
    {} as { [date: string]: NewsItem[] }
  )

  return (
    <div className="NewsList-container" ref={containerRef}>
      <div className="NewsList">
        {status === "loading" && page === 1 && <Loader />}
        {Object.keys(groupedNews).map((date, index) => (
          <div key={index}>
            <h2 className="NewsList-date">News for {date}</h2>
            {groupedNews[date].map((item, itemIndex) => (
              <NewsItem key={itemIndex} item={item} showDate={true} />
            ))}
          </div>
        ))}
        {loadingMore && <Loader />}
      </div>
    </div>
  )
}

export default NewsList

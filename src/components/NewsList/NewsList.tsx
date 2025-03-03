import React, { useCallback, useEffect, useState } from "react"
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

  // Загружаем первую страницу при монтировании компонента
  useEffect(() => {
    dispatch(fetchNewsAsync({ query: "technology", page: 1 }))
  }, [dispatch])

  const scrollHandler = useCallback(() => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      hasMore &&
      status !== "loading" &&
      !loadingMore
    ) {
      setLoadingMore(true)
      // Задержка в 1 секунду перед загрузкой следующей страницы
      setTimeout(() => {
        // Передаем текущий номер страницы из Redux (который уже увеличивается в слайсе)
        dispatch(fetchNewsAsync({ query: "technology", page })).finally(() => {
          setLoadingMore(false)
        })
      }, 1000)
    }
  }, [dispatch, page, hasMore, status, loadingMore])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return () => {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [scrollHandler])

  // Сортируем новости по дате (от новых к старым)
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // Группируем новости по дате
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
    <div>
      {status === "loading" && page === 1 && <Loader />}
      {Object.keys(groupedNews).map((date, index) => (
        <div key={index} style={{ position: "relative" }}>
          <h2 className="NewsList-date">News for {date}</h2>
          {groupedNews[date].map((item, itemIndex) => (
            <NewsItem key={itemIndex} item={item} showDate={true} />
          ))}
        </div>
      ))}
      {loadingMore && <Loader />}
    </div>
  )
}

export default NewsList

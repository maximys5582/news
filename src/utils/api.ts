import axios, { AxiosError } from "axios"

const API_KEY = "c287ec0b67d7441585311044d3157481" // Ваш API-ключ от NewsAPI

export const fetchNews = async (
  query: string = "technology",
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    )
    return response.data.articles // NewsAPI возвращает новости в поле `articles`
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      console.error("Ошибка авторизации. Проверьте API-ключ.")
    } else {
      console.error("Произошла ошибка:", axiosError.message)
    }
    return []
  }
}

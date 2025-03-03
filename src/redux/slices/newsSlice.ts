import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchNews } from "../../utils/api"

interface NewsItem {
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
}

interface NewsState {
  news: NewsItem[]
  status: "idle" | "loading" | "succeeded" | "failed"
  loadingMore: boolean // Флаг для отображения лоадера при подгрузке страниц
  error: string | null
  page: number // Следующая страница для загрузки
  hasMore: boolean
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  loadingMore: false,
  error: null,
  page: 1,
  hasMore: true,
}

export const fetchNewsAsync = createAsyncThunk(
  "news/fetchNews",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await fetchNews(query, page)
    if (!Array.isArray(response)) {
      throw new Error("Invalid API response: Expected an array")
    }
    return response
  }
)

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAsync.pending, (state) => {
        if (state.page === 1) {
          state.status = "loading"
        } else {
          state.loadingMore = true
        }
      })
      .addCase(fetchNewsAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.loadingMore = false

        if (!Array.isArray(action.payload) || action.payload.length === 0) {
          state.hasMore = false
          return
        }

        // Если первая страница – сохраняем данные, иначе добавляем новые к уже загруженным
        state.news =
          state.page === 1 ? action.payload : [...state.news, ...action.payload]
        state.page += 1
      })
      .addCase(fetchNewsAsync.rejected, (state, action) => {
        state.status = "failed"
        state.loadingMore = false
        state.error = action.error.message || "Something went wrong"
      })
  },
})

export default newsSlice.reducer

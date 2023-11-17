import axios from 'axios'

export interface Response<T> {
  data: T
  code: number
  message: string
}

const request = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
})

export default request

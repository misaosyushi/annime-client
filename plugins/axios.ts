import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Context } from '@nuxt/types'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

export default ({ $axios }: Context) => {
  $axios.onRequest((req: AxiosRequestConfig) => {
    // camelCase -> snake_caseへ変換
    if (!req.data || typeof req.data !== 'object') {
      return req
    }
    req.data = snakecaseKeys(req.data, { deep: true })
    return req
  })

  $axios.onResponse((res: AxiosResponse) => {
    // snake_case -> camelCaseへ変換
    if (!res.data || typeof res.data !== 'object') {
      return res
    }
    res.data = camelcaseKeys(res.data, { deep: true })
    return res
  })
}

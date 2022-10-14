import type { AspidaClient } from 'aspida'
import type { Methods as Methods0 } from './v1/_imageId@string'
import type { Methods as Methods1 } from './v2/direct_upload'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.cloudflare.com/client/v4/accounts/cda8b0a2b410e1ff3a5bcc72c7e46f72/images' : baseURL).replace(/\/$/, '')
  const PATH0 = '/v1'
  const PATH1 = '/v2/direct_upload'
  const POST = 'POST'
  const DELETE = 'DELETE'

  return {
    v1: {
      _imageId: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0['delete']['resBody']>(prefix, prefix1, DELETE, option).json(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods0['delete']['resBody']>(prefix, prefix1, DELETE, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    },
    v2: {
      direct_upload: {
        post: (option?: { body?: Methods1['post']['reqBody'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option?: { body?: Methods1['post']['reqBody'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api

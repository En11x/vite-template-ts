import useRequest from '@/hooks/useRequest'
import request from '@/service'

interface IGetUserParmas {
  id?: string
}

interface IGetUserRes {
  id?: string
  name: string
}

export const getUsers = (data: IGetUserParmas) => {
  return request<IGetUserParmas, IGetUserRes>({
    url: '/api/users',
    method: 'GET',
    data,
  })
}

export const useGetUsers = () => {
  return useRequest<IGetUserParmas, IGetUserRes>(getUsers, { manual: true })
}

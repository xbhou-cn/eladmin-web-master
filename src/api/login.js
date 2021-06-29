import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'api/system/auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'api/system/auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'api/system/auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/system/auth/logout',
    method: 'delete'
  })
}

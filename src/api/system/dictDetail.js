import request from '@/utils/request'

export function get(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/system/dictDetail',
    method: 'get',
    params
  })
}

export function getDictMap(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/system/dictDetail/map',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/system/dictDetail',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/system/dictDetail/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/system/dictDetail',
    method: 'put',
    data
  })
}

export default { add, edit, del }

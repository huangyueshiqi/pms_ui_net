import request from '@/utils/request'

/**
* 服装管理分页查询
* @param {查询条件} data
*/
export function listcloth(query) {
  return request({
    url: 'resourcemng/cloth/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增服装管理
* @param data
*/
export function addcloth(data) {
  return request({
    url: 'resourcemng/cloth',
    method: 'post',
    data: data,
  })
}

/**
* 修改服装管理
* @param data
*/
export function updatecloth(data) {
  return request({
    url: 'resourcemng/cloth',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取服装管理详情
* @param {Id}
*/
export function getcloth(id) {
  return request({
    url: 'resourcemng/cloth/' + id,
    method: 'get'
  })
}

/**
* 删除服装管理
* @param {主键} pid
*/
export function delcloth(pid) {
  return request({
    url: 'resourcemng/cloth/' + pid,
    method: 'delete'
  })
}

// 导出服装管理
export function exportcloth(query) {
  return request({
    url: 'resourcemng/cloth/export',
    method: 'get',
    params: query
  })
}


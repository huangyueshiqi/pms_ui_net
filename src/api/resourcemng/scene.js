import request from '@/utils/request'

/**
* 场景管理分页查询
* @param {查询条件} data
*/
export function listScene(query) {
  return request({
    url: 'resourcemng/Scene/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增场景管理
* @param data
*/
export function addScene(data) {
  return request({
    url: 'resourcemng/Scene',
    method: 'post',
    data: data,
  })
}

/**
* 修改场景管理
* @param data
*/
export function updateScene(data) {
  return request({
    url: 'resourcemng/Scene',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取场景管理详情
* @param {Id}
*/
export function getScene(id) {
  return request({
    url: 'resourcemng/Scene/' + id,
    method: 'get'
  })
}

/**
* 删除场景管理
* @param {主键} pid
*/
export function delScene(pid) {
  return request({
    url: 'resourcemng/Scene/' + pid,
    method: 'delete'
  })
}

// 导出场景管理
export function exportScene(query) {
  return request({
    url: 'resourcemng/Scene/export',
    method: 'get',
    params: query
  })
}


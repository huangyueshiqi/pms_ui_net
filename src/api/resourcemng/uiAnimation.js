import request from '@/utils/request'

/**
* 动作管理分页查询
* @param {查询条件} data
*/
export function listUiAnimation(query) {
  return request({
    url: 'resourcemng/UiAnimation/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增动作管理
* @param data
*/
export function addUiAnimation(data) {
  return request({
    url: 'resourcemng/UiAnimation',
    method: 'post',
    data: data,
  })
}

/**
* 修改动作管理
* @param data
*/
export function updateUiAnimation(data) {
  return request({
    url: 'resourcemng/UiAnimation',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取动作管理详情
* @param {Id}
*/
export function getUiAnimation(id) {
  return request({
    url: 'resourcemng/UiAnimation/' + id,
    method: 'get'
  })
}

/**
* 删除动作管理
* @param {主键} pid
*/
export function delUiAnimation(pid) {
  return request({
    url: 'resourcemng/UiAnimation/' + pid,
    method: 'delete'
  })
}

// 导出动作管理
export function exportUiAnimation(query) {
  return request({
    url: 'resourcemng/UiAnimation/export',
    method: 'get',
    params: query
  })
}


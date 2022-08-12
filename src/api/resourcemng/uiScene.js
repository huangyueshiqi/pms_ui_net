import request from '@/utils/request'

/**
* 场景管理分页查询
* @param {查询条件} data
*/
export function listUiScene(query) {
  return request({
    url: 'resourcemng/UiScene/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增场景管理
* @param data
*/
export function addUiScene(data) {
  return request({
    url: 'resourcemng/UiScene',
    method: 'post',
    data: data,
  })
}

/**
* 修改场景管理
* @param data
*/
export function updateUiScene(data) {
  return request({
    url: 'resourcemng/UiScene',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取场景管理详情
* @param {Id}
*/
export function getUiScene(id) {
  return request({
    url: 'resourcemng/UiScene/' + id,
    method: 'get'
  })
}

/**
* 删除场景管理
* @param {主键} pid
*/
export function delUiScene(pid) {
  return request({
    url: 'resourcemng/UiScene/' + pid,
    method: 'delete'
  })
}

// 导出场景管理
export function exportUiScene(query) {
  return request({
    url: 'resourcemng/UiScene/export',
    method: 'get',
    params: query
  })
}


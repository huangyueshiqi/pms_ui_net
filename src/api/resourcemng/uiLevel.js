import request from '@/utils/request'

/**
* 菜单管理分页查询
* @param {查询条件} data
*/
export function listUiLevel(query) {
  return request({
    url: 'resourcemng/UiLevel/list',
    method: 'get',
    params: query,
  })
}

/**
* 菜单管理tree查询
* @param {查询条件} data
*/
export function treelistUiLevel(query) {
  return request({
    url: 'resourcemng/UiLevel/treelist',
    method: 'get',
    params: query,
  })
}

/**
* 新增菜单管理
* @param data
*/
export function addUiLevel(data) {
  return request({
    url: 'resourcemng/UiLevel',
    method: 'post',
    data: data,
  })
}

/**
* 修改菜单管理
* @param data
*/
export function updateUiLevel(data) {
  return request({
    url: 'resourcemng/UiLevel',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取菜单管理详情
* @param {Id}
*/
export function getUiLevel(id) {
  return request({
    url: 'resourcemng/UiLevel/' + id,
    method: 'get'
  })
}

/**
* 删除菜单管理
* @param {主键} pid
*/
export function delUiLevel(pid) {
  return request({
    url: 'resourcemng/UiLevel/' + pid,
    method: 'delete'
  })
}

// 导出菜单管理
export function exportUiLevel(query) {
  return request({
    url: 'resourcemng/UiLevel/export',
    method: 'get',
    params: query
  })
}


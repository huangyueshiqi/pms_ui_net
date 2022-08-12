import request from '@/utils/request'

/**
* 头部模板分页查询
* @param {查询条件} data
*/
export function listUiHead(query) {
  return request({
    url: 'resourcemng/UiHead/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增头部模板
* @param data
*/
export function addUiHead(data) {
  return request({
    url: 'resourcemng/UiHead',
    method: 'post',
    data: data,
  })
}

/**
* 修改头部模板
* @param data
*/
export function updateUiHead(data) {
  return request({
    url: 'resourcemng/UiHead',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取头部模板详情
* @param {Id}
*/
export function getUiHead(id) {
  return request({
    url: 'resourcemng/UiHead/' + id,
    method: 'get'
  })
}

/**
* 删除头部模板
* @param {主键} pid
*/
export function delUiHead(pid) {
  return request({
    url: 'resourcemng/UiHead/' + pid,
    method: 'delete'
  })
}

// 导出头部模板
export function exportUiHead(query) {
  return request({
    url: 'resourcemng/UiHead/export',
    method: 'get',
    params: query
  })
}


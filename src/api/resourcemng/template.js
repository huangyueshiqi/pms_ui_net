import request from '@/utils/request'

/**
* 模板管理分页查询
* @param {查询条件} data
*/
export function listTemplate(query) {
  return request({
    url: 'resourcemng/Template/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增模板管理
* @param data
*/
export function addTemplate(data) {
  return request({
    url: 'resourcemng/Template',
    method: 'post',
    data: data,
  })
}

/**
* 修改模板管理
* @param data
*/
export function updateTemplate(data) {
  return request({
    url: 'resourcemng/Template',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取模板管理详情
* @param {Id}
*/
export function getTemplate(id) {
  return request({
    url: 'resourcemng/Template/' + id,
    method: 'get'
  })
}

/**
* 删除模板管理
* @param {主键} pid
*/
export function delTemplate(pid) {
  return request({
    url: 'resourcemng/Template/' + pid,
    method: 'delete'
  })
}

// 导出模板管理
export function exportTemplate(query) {
  return request({
    url: 'resourcemng/Template/export',
    method: 'get',
    params: query
  })
}


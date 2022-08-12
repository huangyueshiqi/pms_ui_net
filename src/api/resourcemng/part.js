import request from '@/utils/request'

/**
* 部位管理分页查询
* @param {查询条件} data
*/
export function listPart(query) {
  return request({
    url: 'resourcemng/Part/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增部位管理
* @param data
*/
export function addPart(data) {
  return request({
    url: 'resourcemng/Part',
    method: 'post',
    data: data,
  })
}

/**
* 修改部位管理
* @param data
*/
export function updatePart(data) {
  return request({
    url: 'resourcemng/Part',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取部位管理详情
* @param {Id}
*/
export function getPart(id) {
  return request({
    url: 'resourcemng/Part/' + id,
    method: 'get'
  })
}

/**
* 删除部位管理
* @param {主键} pid
*/
export function delPart(pid) {
  return request({
    url: 'resourcemng/Part/' + pid,
    method: 'delete'
  })
}

// 导出部位管理
export function exportPart(query) {
  return request({
    url: 'resourcemng/Part/export',
    method: 'get',
    params: query
  })
}


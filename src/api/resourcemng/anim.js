import request from '@/utils/request'

/**
* 动作管理分页查询
* @param {查询条件} data
*/
export function listanim(query) {
  return request({
    url: 'resourcemng/anim/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增动作管理
* @param data
*/
export function addanim(data) {
  return request({
    url: 'resourcemng/anim',
    method: 'post',
    data: data,
  })
}

/**
* 修改动作管理
* @param data
*/
export function updateanim(data) {
  return request({
    url: 'resourcemng/anim',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取动作管理详情
* @param {Id}
*/
export function getanim(id) {
  return request({
    url: 'resourcemng/anim/' + id,
    method: 'get'
  })
}

/**
* 删除动作管理
* @param {主键} pid
*/
export function delanim(pid) {
  return request({
    url: 'resourcemng/anim/' + pid,
    method: 'delete'
  })
}

// 导出动作管理
export function exportanim(query) {
  return request({
    url: 'resourcemng/anim/export',
    method: 'get',
    params: query
  })
}


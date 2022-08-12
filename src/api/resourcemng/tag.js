import request from '@/utils/request'

/**
* 标签管理分页查询
* @param {查询条件} data
*/
export function listTag(query) {
  return request({
    url: 'resourcemng/Tag/list',
    method: 'get',
    params: query,
  })
}


/**
* 新增标签管理
* @param data
*/
export function addTag(data) {
  return request({
    url: 'resourcemng/Tag',
    method: 'post',
    data: data,
  })
}

/**
* 修改标签管理
* @param data
*/
export function updateTag(data) {
  return request({
    url: 'resourcemng/Tag',
    method: 'PUT',
    data: data,
  })
}

/**
* 获取标签管理详情
* @param {Id}
*/
export function getTag(id) {
  return request({
    url: 'resourcemng/Tag/' + id,
    method: 'get'
  })
}

/**
* 删除标签管理
* @param {主键} pid
*/
export function delTag(pid) {
  return request({
    url: 'resourcemng/Tag/' + pid,
    method: 'delete'
  })
}

// 导出标签管理
export function exportTag(query) {
  return request({
    url: 'resourcemng/Tag/export',
    method: 'get',
    params: query
  })
}


import instance from '@/api/instance'
async function fetchAllVipCategories(params) {
    return instance.get('vipcar/drivercategory', {
        params
    }).then(res => res.data)
}

async function updateVipCategory(data) {
    return instance.put(`vipcar/drivercategory/` + data.id, data).then(res => res.data)
}

async function createVipCategory(data) {
    return instance.post('vipcar/drivercategory', data).then(res => res.data)
}

async function deleteVipCategory(id) {
    return instance.delete(`vipcar/drivercategory/` + id).then(res => res.data)
}

export { fetchAllVipCategories, updateVipCategory, createVipCategory, deleteVipCategory }
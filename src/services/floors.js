import instance from '@/api/instance'
async function fetchAllFloors(params) {
    return instance.get('hospitality/floors', {
        params
    }).then(res =>{
        return  res.data
    })
}

async function fetchFloor(id) {
    return instance.get(`hospitality/floors/${id}`).then(res => res.data)
}
async function createFloor(data) {
    return instance.post('hospitality/floors', data).then(res => res.data)
}
async function updateFloor(data) {
    return instance.put('hospitality/floors', data).then(res => res.data)
}
async function deleteFloor(id) {
    return instance.delete(`hospitality/floors/${id}`).then(res => res.data)
}
export { fetchAllFloors, fetchFloor, createFloor, updateFloor, deleteFloor }
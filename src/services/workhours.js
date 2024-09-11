import instance from '@/api/instance'
function fetchAllWorkHours() {
    return instance.get('hospitality/workhours').then(res => res.data)
}
function createWorkHour(data) {
    return instance.post('hospitality/workhours', data).then(res => res.data)
}
async function updateWorkHour(data) {
    return instance.put('hospitality/workhours/' + data.id, data).then(res => res.data)
}
function fetchAllDaysOff(params) {
    return instance.get('hospitality/daysoff', { params }).then(res => res.data)
}
function createDayOff(data) {
    return instance.post('hospitality/daysoff', data).then(res => res.data)
}
async function updateDayOff(data) {
    return instance.put('hospitality/daysoff/' + data.id, data).then(res => res.data)
}
async function deleteDayOff(id) {

    return instance.delete('hospitality/daysoff/' + id).then(res => res.data)
}
export {
    fetchAllWorkHours,
    createWorkHour,
    updateWorkHour,
    fetchAllDaysOff,
    createDayOff,
    updateDayOff,
    deleteDayOff
}
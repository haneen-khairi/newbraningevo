import instance from '@/api/instance'
function fetchAllSettings(params) {
    return instance.get('hospitality/settings', { params }).then(response => response.data)
}
function updateSettings(params) {
    return instance.put('hospitality/settings', params).then(response => response.data)
}
export { fetchAllSettings, updateSettings }

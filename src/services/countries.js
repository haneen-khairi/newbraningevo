import instance from '@/api/instance'

function fetchAllCountries(params) {
    return instance.get(`hospitality/countries/`, {
        params
    }).then(res => res.data)
}
function toggleCountry(code, currentStatus) {
    return instance.put(`hospitality/countries`, {
        code: code,
        isActive: !currentStatus

    }).then(res => res.data)
}
export {
    fetchAllCountries,
    toggleCountry
}
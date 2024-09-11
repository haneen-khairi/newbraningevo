import instance from '@/api/instance'
function fetchAllStatistics() {
    return instance.get('hospitality/statistics').then(res => res.data)
}
function fetchAllCounters() {
    return instance.get('hospitality/restaurants/orders/statistics/counters').then(res => res.data)
}
function fetchRestaurantStatistics(params) {
    return instance.get('hospitality/restaurants/orders/statistics', { params }).then(res => res.data)
}
function fetchTopInviters() {
    return instance.get('hospitality/requests/statistics/top-requesters').then(res => res.data)
}
function fetchMonthlyInvites() {
    return instance.get('hospitality/requests/statistics/monthly-invites').then(res => res.data)
}
function fetchTeaboysStatistics(params) {
    return instance.get('hospitality/restaurants/orders/statistics/teaboycount-orders', { params }).then(res => res.data)
}
function fetchOrdersCount(params) {
    return instance.get('hospitality/restaurants/orders/statistics/counters-orders', { params }).then(res => res.data)
}
function fetchRestaurantTopRequesters() {
    return instance.get('hospitality/restaurants/orders/statistics/top-requesters').then(res => res.data)
}
function fetchRestaurantTopItems() {
    return instance.get('hospitality/restaurants/orders/statistics/top-items').then(res => res.data)
}
function fetchMonthlyOrders() {
    return instance.get('hospitality/restaurants/orders/statistics/monthly-orders').then(res => res.data)
}
function fetchBuildingsOrders(params) {
    return instance.get('hospitality/buildings/statistics/buildings-orders', { params }).then(res => res.data)
}
export { fetchAllStatistics, fetchTopInviters, fetchMonthlyInvites, fetchRestaurantTopRequesters, fetchRestaurantTopItems, fetchMonthlyOrders, fetchTeaboysStatistics, fetchOrdersCount, fetchBuildingsOrders,fetchAllCounters,fetchRestaurantStatistics}
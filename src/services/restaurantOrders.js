import instance from '@/api/instance'
function fetchStatistics(params) {
    return instance({
        url: 'hospitality/restaurants/orders/statistics',
        method: 'get',
        params
    }).then(res => res.data)
}
function fetchAllOrders(params) {
    return instance({
        url: 'hospitality/restaurants/orders',
        method: 'get',
        params
    }).then(res => res.data)
}
function fetchSelfOrders(params) {
    return instance({
        url: 'hospitality/restaurants/orders/me',
        method: 'get',
        params
    }).then(res => res.data)

}
function createOrder(data) {
    return instance({
        url: 'hospitality/restaurants/orders',
        method: 'post',
        data
    }).then(res => res.data)

}

function reOrder(id) {
    return instance({
        url: `hospitality/restaurants/orders/${id}/reorder`,
        method: 'post'
    }).then(res => res.data)

}
function updateOrder(data) {
    return instance({
        url: 'hospitality/restaurants/orders',
        method: 'put',
        data
    }).then(res => res.data)

}
function cancelOrder(data) {
    return instance({
        url: 'hospitality/restaurants/orders/cancel',
        method: 'put',
        data
    }).then(res => res.data)
}
function toggleOrder(data) {
    return instance({
        url: 'hospitality/user/favorite/restaurants/items',
        method: 'post',
        data
    }).then(res => {console.log(res.data);
    return res.data})
}
export {
    fetchStatistics,
    fetchAllOrders,
    fetchSelfOrders,
    createOrder,
    updateOrder,
    reOrder,
    cancelOrder,toggleOrder
}
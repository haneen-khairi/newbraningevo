import instance from "@/api/instance";

async function fetchAllorders(params) {
    return instance.get("hospitality/restaurants/orders", {
        params: params
    }).then(res => res.data)
}
async function fetchAllordersAdmins(params) {
    return await instance.get("gateway/hospitality/admin-request", {
        params: params
    }).then(res => res.data)
}
async function fetchOneOrder(id) {
    return instance.get(`hospitality/restaurants/orders/me/${id}`).then(res => res.data)
}
async function createOrder(data) {
    return instance.post("hospitality/restaurants/orders", data).then(res => res.data)
}
async function updateOrder(data) {
    
    return instance.put(`hospitality/restaurants/orders`, data).then(res => res.data)
}
async function deleteOrder(id) {
    return instance.delete(`hospitality/restaurants/orders/${id}`).then(res => res.data)
}

export {
    fetchAllordersAdmins,
    fetchAllorders,
    fetchOneOrder,
    createOrder,
    updateOrder,
    deleteOrder
}
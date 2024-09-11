import instance from "@/api/instance";

async function fetchAllServiceProviders(params) {
    return instance.get("hospitality/ServiceProvider", {
        params: params
    }).then(res => res.data)
}
async function fetchOneServiceProvider(id) {
    return instance.get(`hospitality/ServiceProvider/${id}`).then(res => res.data)
}
async function createServiceProvider(data) {
    return instance.post("hospitality/ServiceProvider", data).then(res => res.data)
}
async function updateServiceProvider(data) {
    
    return instance.put(`hospitality/ServiceProvider`, data).then(res => res.data)
}
async function deleteServiceProvider(id) {
    return instance.delete(`hospitality/ServiceProvider/${id}`).then(res => res.data)
}

export {
    fetchAllServiceProviders,
    fetchOneServiceProvider,
    createServiceProvider,
    updateServiceProvider,
    deleteServiceProvider
}
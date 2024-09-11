import instance from "@/api/instance";

async function fetchAllRooms(params) {
    return instance.get("hospitality/rooms", {
        params: params
    }).then(res => res.data)
}
async function fetchOneRoom(id) {
    return instance.get(`hospitality/rooms/${id}`).then(res => res.data)
}
async function createRoom(data) {
    return instance.post("hospitality/rooms", data).then(res => res.data)
}
async function updateRoom(data) {
    console.log(data);
    
    return instance.put(`hospitality/rooms`, data).then(res => res.data)
}
async function deleteRoom(id) {
    return instance.delete(`hospitality/rooms/${id}`).then(res => res.data)
}

export {
    fetchAllRooms,
    fetchOneRoom,
    createRoom,
    updateRoom,
    deleteRoom
}
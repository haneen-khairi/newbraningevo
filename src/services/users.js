import instance from '@/api/instance'

async function fetchAllUsers(params) {
    return instance.get('hospitality/users', {
        params: {
            isGetAll: true,
            isActive: params?.activeOnly ?? true,
            ...params
        }
    }).then(res => res.data)
}
async function createUser(user) {
    return instance.post('hospitality/users', user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

async function fetchOneUser(id) {
    return instance.get(`hospitality/users/${id}`).then(res => res.data)
}
async function updateUser(user) {
    return instance.put(`hospitality/users`, user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
async function deleteUser(id) {
    return instance.delete(`hospitality/users/${id}`).then(res => res.data)
}
async function editSelf(user) {
    return instance.put(`hospitality/user/me`, user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}
async function getSelf() {
    return instance.get(`hospitality/user/me`).then(res => res.data)
}
export {
    fetchAllUsers,
    createUser,
    fetchOneUser,
    updateUser,
    deleteUser,
    editSelf,
    getSelf
}
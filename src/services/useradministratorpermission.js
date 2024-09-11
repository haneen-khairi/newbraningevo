import instance from '@/api/instance'
async function fetchAllUserPermissions(params) {
    return instance.get('systemadmin/users', {
        params
    }).then(res =>{
        return  res.data
    })
}

async function fetchUserPermissions(id) {
    return instance.get(`systemadmin/useradministratorpermission/users/${id}`).then(res => res.data)
}
async function createUserPermissions(data) {
    const id =data.id;
    delete data.id;
    
    return instance.post(`systemadmin/useradministratorpermission/permissions/${id}`, data).then(res => res.data)
}
async function updateUserPermissions(data) {
    return instance.put(`systemadmin/useradministratorpermission/permissions/${id}`, data).then(res => res.data)
}
async function deleteUserPermissions(id) {
    return instance.delete(`systemadmin/useradministratorpermission/users/${id}`).then(res => res.data)
}
export { fetchAllUserPermissions, fetchUserPermissions, createUserPermissions, updateUserPermissions, deleteUserPermissions }
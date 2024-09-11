import instance from '@/api/instance'

async function fetchAllNotifications(params) {
    return instance.get("hospitality/user/notifications", { params }).then(res => res.data)
}
async function readNotification(id) {
    return instance.put('hospitality/user/notifications/' + id + '/read')
}
async function readNotifications() {
    return instance.put('hospitality/user/notifications/read')
}
export {
    fetchAllNotifications,
    readNotification,
    readNotifications
}
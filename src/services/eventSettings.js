import instance from '@/api/instance';

function fetchEventsSettings() {
    return instance.get('systemadmin/useradministratorpermission/eventsetting', {
    }).then(res => res.data)
}

function updateEventSetting(setting) {
    return instance.post(`systemadmin/useradministratorpermission/eventsetting`, setting).then(res => res.data)
}
export { fetchEventsSettings, updateEventSetting };
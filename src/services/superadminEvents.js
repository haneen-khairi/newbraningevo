import instance from '@/api/instance'

function fetchAllEvents(params) {
    return instance.get('systemadmin/events', {
        params
    }).then(res => res.data)
}

function fetchEvent(id) {
    return instance.get(`systemadmin/events/${id}`).then(res => res.data)
}

function createEvent(event) {
    return instance.post('systemadmin/events', event).then(res => res.data)
}

function updateEvent(event) {
    return instance.put(`systemadmin/events/${event.id}`, event).then(res => res.data)
}

function deleteEvent(id) {
    return instance.delete(`systemadmin/events/${id}`).then(res => res.data)
}

export { fetchAllEvents, fetchEvent, createEvent, updateEvent, deleteEvent }
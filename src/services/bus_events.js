//crud for bus events
import instance from '@/api/instance';

function GetBusEvents(params) {
    return instance.get('busshuttle/events', { params }).then(res => res.data)
}
function CreateBusEvent(data) {
    return instance.post('busshuttle/events', data).then(res => res.data)
}
function EditBusEvent(data) {
    return instance.put('busshuttle/events/' + data.id, data).then(res => res.data)
}
function DeleteBusEvent(id) {
    return instance.delete('busshuttle/events/' + id).then(res => res.data)
}
function RequestBusEvent(data) {
    return instance.post('busshuttle/trip/requestevent/'+data.id).then(res => res.data)
}
export {
    GetBusEvents,
    CreateBusEvent,
    EditBusEvent,
    DeleteBusEvent,
    RequestBusEvent,
}
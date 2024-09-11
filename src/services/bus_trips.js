//crud for bus trips
import instance from '@/api/instance'
function GetBusTrips(params) {
    return instance.get('busshuttle/orders', { params }).then(res => res.data)
}
function CreateBusTrip(data) {
    let path = "busshuttle/trip/request"
    if (data.type == 'event') {
        path = "busshuttle/trip/requestevent/" + data.eventId
    }
    return instance.post(path, data).then(res => res.data)
}
function EditBusTrip(data) {
    return instance.put('busshuttle/trips/' + data.id, data).then(res => res.data)
}
function DeleteBusTrip(id) {
    return instance.delete('busshuttle/trips/' + id).then(res => res.data)
}
function RequestBusTrip(data) {
    return instance.post('busshuttle/trip/request', data).then(res => res.data)
}
function MyOrders(params) {
    return instance.get('busshuttle/orders/myorders', { params }).then(res => res.data)
}
function CancelBusTrip(id) {
    return instance.post('busshuttle/trip/cancel/' + id).then(res => res.data)
}
function ChangeTripPath(id, data) {
    return instance.post('busshuttle/trip/changedestination/' + id, data).then(res => res.data)
}
function RateTrip(data) {
    return instance.post('busshuttle/trip/rate/' + data.id, data).then(res => res.data)
}
export {
    GetBusTrips,
    CreateBusTrip,
    EditBusTrip,
    DeleteBusTrip,
    RequestBusTrip,
    MyOrders,
    CancelBusTrip,
    ChangeTripPath,
    RateTrip
}
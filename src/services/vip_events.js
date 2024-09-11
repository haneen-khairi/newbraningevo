import instance from '@/api/instance'
import { useQuery, useMutation } from '@tanstack/react-query'
function GetVipEvents(params) {
    return useQuery({
        queryKey: ['vipEvents', params],
        queryFn: () => instance.get('vipcar/event', { params }).then(res => res.data)
    })
}

function UpdateVipEvent(data) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.put('vipcar/event/' + data.id, data, {

            })
        },
        ...data
    })
}
function DeleteVipEvent(...params) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.delete('vipcar/event/' + data.id).then(res => res.data)
        },
        ...params
    })
}

function CreateVipEvent(data) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.post('vipcar/event/add', data, {

            })
        },
        ...data
    })
}

function ReserveVipEvent(data) {
    // return instance.post('vipcar/trips/requestevent', data).then(res => res.data)
    return useMutation({
        mutationFn: async (data) => {
            return instance.post('vipcar/trips/requestevent', data)
        },
        ...data
    })
}

export {
    GetVipEvents,
    UpdateVipEvent,
    DeleteVipEvent,
    CreateVipEvent,
    ReserveVipEvent,
}
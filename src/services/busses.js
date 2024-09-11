import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/api/instance'
function GetBusses({ params }) {
    return useQuery({
        queryKey: ['busses', params],
        queryFn: async () => {
            return instance.get(`busshuttle/buses`, {
                params
            }).then(res => res.data)
        }
    })
}
function EditBus(onSuccess, onError) {
    return useMutation({
        mutationKey: ['busses'],
        mutationFn: async (data) => {
            return instance.put(`busshuttle/buses/` + data.id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess,
        onError
    })

}
function CreateBus(onSuccess, onError) {
    return useMutation({
        mutationKey: ['busses'],
        mutationFn: async (data) => {
            return instance.post(`busshuttle/buses`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess,
        onError
    })
}
function DeleteBus(id, onSuccess, onError) {
    return useMutation({
        mutationKey: ['busses'],
        mutationFn: async () => {
            return instance.delete(`busshuttle/buses/` + id)
        },
        onSuccess,
        onError
    })
}
function GetOnlineBusses(params) {
    return instance.get('busshuttle/buses/online', { params }).then(res => res.data)
}

export {
    GetBusses,
    EditBus,
    CreateBus,
    DeleteBus,
    GetOnlineBusses
}
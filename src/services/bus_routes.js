import instance from '@/api/instance'
import { useQuery, useMutation } from '@tanstack/react-query'

function GetBusRoutes(params) {
    return useQuery({
        queryKey: ['busRoutes', params],
        queryFn: async () => {
            return instance.get('busshuttle/busroutes', { params }).then(res => res.data)
        },
    })
}

function CreateBusRoute({ onSuccess, onError }) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.post('busshuttle/busroutes', data).then(res => res.data)
        },
        mutationKey: "createBusRoute",
        onSuccess,
        onError
    })
}

function EditBusRoute({ onSuccess, onError }) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.put('busshuttle/busroutes/' + data.id, data).then(res => res.data)
        },
        mutationKey: ["editBusRoute"],
        onSuccess,
        onError
    })
}

function DeleteBusRoute({ onSuccess, onError }) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.delete('busshuttle/busroutes/' + data.id).then(res => res.data)
        },
        mutationKey: "deleteBusRoute",
        onSuccess,
        onError
    })
}

export {
    GetBusRoutes,
    CreateBusRoute,
    EditBusRoute,
    DeleteBusRoute
}
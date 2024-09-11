import instance from '@/api/instance'
import { useQuery, useMutation } from '@tanstack/react-query'
function GetVipDrivers(params) {
    return useQuery({
        queryKey: ['vipDrivers', params],
        queryFn: () => instance.get('vipcar/users/drivers', { params }).then(res => res.data)
    })
}

function UpdateVipDriver(params) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.put('vipcar/users/' + data.id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        ...params
    })
}
function DeleteVipDriver(...params) {
    return useMutation({
        mutationFn: async (data) => {
            return instance.delete('vipcar/drivers/' + data.id).then(res => res.data)
        },
        ...params
    })
}

function CreateVipDriver(data) {
    return instance.post('Authentication/registeration/registervipdriver', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

export {
    GetVipDrivers,
    UpdateVipDriver,
    DeleteVipDriver,
    CreateVipDriver
}
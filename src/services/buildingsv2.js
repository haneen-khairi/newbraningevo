//crud for bus buildings
import instance from '@/api/instance'
import { useQuery } from '@tanstack/react-query'
function GetBuildings(params) {
    return instance.get('systemadmin/buildings', {
        params
    }).then(res => ({
        data: res.data.data.items,
    }))
}

function useBuildings(params) {
    return useQuery({
        queryKey: ['buildings', params],
        queryFn: () => GetBuildings(params),
        staleTime: 1000 * 60 * 1,
    })
}

function getAvailableBuildings(params) {
    return instance.get('busshuttle/trip/getavailablebuildings', { params }).then(res => ({
        data: res.data.data.items,
    }))
}

function CreateBuilding(data) {
    return instance.post('systemadmin/buildings', data).then(res => res.data)
}
export {
    GetBuildings,
    useBuildings,
    CreateBuilding,
    getAvailableBuildings
}
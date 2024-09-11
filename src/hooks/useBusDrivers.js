
import { useQuery } from '@tanstack/react-query'
import { GetBusDrivers } from '@/services/bus_drivers'

function useBusDrivers(params) {
    return useQuery({
        queryKey: ['busDrivers', params],
        queryFn: () => GetBusDrivers({ ...params }),
    })
}

export default useBusDrivers
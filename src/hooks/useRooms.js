import { useQuery } from '@tanstack/react-query'
import { fetchAllRooms } from '@/services/rooms'

function useRooms(params) {
    //default to isActive: true
    const isActive = params?.isActive ?? true

    return useQuery({
        queryKey: ['rooms', params],
        queryFn: () => fetchAllRooms({ ...params, isActive }),
        staleTime: 1000 * 60 * 5,

    })
}

export default useRooms
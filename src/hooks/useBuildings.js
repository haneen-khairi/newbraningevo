import { useQuery } from '@tanstack/react-query'
import { fetchAllBuildings } from '@/services/buildings'

function useBuildings(params) {
    //default to isActive: true
    const isActive = params?.isActive ?? true
    return useQuery({
        queryKey: ['buildings', params],
        queryFn: () => fetchAllBuildings({ ...params, isActive }),
        staleTime: 1000 * 60 * 15,
    })
}

export default useBuildings
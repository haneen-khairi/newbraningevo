import { useQuery } from '@tanstack/react-query'
import { fetchAllCountries } from '@/services/countries'

function useCountries(params) {
    //default to isActive: true
    const isActive = params?.isActive ?? true
    return useQuery({
        queryKey: ['countries', params],
        queryFn: () => fetchAllCountries({ ...params, isActive }),
        staleTime: 1000 * 60 * 5,

    })
}

export default useCountries
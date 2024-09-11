import { useQuery } from "@tanstack/react-query";
import { fetchAllFloors } from "@/services/floors";

export default function useFloors(params) {
    const isActive = params?.isActive ?? true

    return useQuery({
        queryKey: ['floors', params],
        queryFn: () => fetchAllFloors({ ...params, isActive }),
    })
}
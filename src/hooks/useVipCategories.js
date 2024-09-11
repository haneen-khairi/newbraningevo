import { fetchAllVipCategories, updateVipCategory, createVipCategory, deleteVipCategory } from "../services/vip_categories";
import { useQuery, useMutation } from '@tanstack/react-query'

function useVipCategories(params) {
    return useQuery({
        queryKey: ['vipCategories', params],
        queryFn: () => fetchAllVipCategories(params)
    })
}


function mutateVipCategory({ id, isDelete, onSuccess, onError }) {
    let mutationFn = isDelete ? deleteVipCategory : id ? updateVipCategory : createVipCategory
    return useMutation({
        mutationFn: (values) => mutationFn(values),
        onSuccess,
        onError
    })
}

export { useVipCategories, mutateVipCategory }
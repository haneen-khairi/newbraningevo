import { fetchAllVipCars, updateVipCar, createVipCar, deleteVipCar } from "../services/vip_cars";
import { useQuery, useMutation } from '@tanstack/react-query'

function useVipCars(params) {
    return useQuery({
        queryKey: ['vipCars', params],
        queryFn: () => fetchAllVipCars(params)
    })
}


function mutateVipCar({ id, isDelete, onSuccess, onError }) {
    let mutationFn = isDelete ? deleteVipCar : id ? updateVipCar : createVipCar
    return useMutation({
        mutationFn: (values) => mutationFn(values),
        onSuccess,
        onError
    })
}

export { useVipCars, mutateVipCar }
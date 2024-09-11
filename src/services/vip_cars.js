import instance from '@/api/instance'
async function fetchAllVipCars(params) {
    return instance.get('vipcar/cars', {
        params,
    }).then(res => res.data)
}

async function updateVipCar(data) {
    return instance.put(`vipcar/cars/` + data.id, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

async function createVipCar(data) {
    return instance.post('vipcar/cars', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => res.data)
}

async function deleteVipCar(id) {
    return instance.delete(`vipcar/cars/` + id).then(res => res.data)
}

export { fetchAllVipCars, updateVipCar, createVipCar, deleteVipCar }
import instance from '@/api/instance'

export async function statistics(params) {
    return instance.get("systemadmin/statisticsbusses").then(res => res.data)
}
export async function drivers(params) {
    return instance.get("systemadmin/statisticsbusses/drivers", { params }).then(res => res.data)
}
export async function tripPerMonth(params) {
    return instance.get("systemadmin/statisticsbusses/notripspermonthbyyear", { params }).then(res => res.data)
}
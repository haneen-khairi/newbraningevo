import instance from '@/api/instance'
function fetchAllVipBranches(params) {
    return instance.get('hospitality/Branchis', {
        params,
    }).then(res => res.data)
}

export { fetchAllVipBranches }
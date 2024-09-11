import instance from '@/api/instance'
function fetchAllRestaurants() {
    return instance.get('hospitality/restaurants').then(res => res.data);
}
export {
    fetchAllRestaurants
}
export default function getUserHome(user) {
    switch (user.type){
        case 6:
            return '/pending-orders'
        case 0:
            return '/vip'
        default:
            return '/home'
    }
}

export function getUserVersion(user){

    switch (user.type){
        case 6:
            return 'hospitality'
        case 0:
            return 'admin'
        default:
            return 'hospitality'
    }
}
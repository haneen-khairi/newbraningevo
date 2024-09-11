import flattenNestedArray from "./flattenArray";

export function buildRoutes(routes, ability) {
    let newRoutes = [];
    //loop over routes and check for permission and children
    for (let route of routes) {
        if (route.permissions) {
            if (route.permissions.some((permission) => ability.can('manage', permission))) {
                if (route.children) {
                    route.children = buildRoutes(route.children, ability);
                }
                newRoutes.push(route);
            }
        } else {
            if (route.children) {
                route.children = buildRoutes(route.children, ability);
            }
            newRoutes.push(route);
        }
    }
    return newRoutes;
}
import { defineAbility } from "@casl/ability";

function buildAbility(user) {
    if (!user) {
        let localAbility = defineAbility((can) => {
            can("read", "none");
        });
        return localAbility;
    } else {

        let localAbility = defineAbility((can) => {
            can("manage", "Home");
            for (let role of user.roles) {
                can("manage", role);
            }
            if (user?.type){
                can("manage", user?.type.toString())
            }
        });
        return localAbility;
    }
}
export default buildAbility;
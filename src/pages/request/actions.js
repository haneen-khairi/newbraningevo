import { updateRequest } from "@/services/requests";
export async function acceptInvite(id) {
    try {
        await updateRequest({ id, status: 1 });
    } catch (error) {
        console.log(error);
    }
}
export async function rejectInvite(id) {
    try {
        await updateRequest({ id, status: 2 });
    } catch (error) {
        console.log(error);
    }
}
import getUserHome from "../utils/getUserHome.js";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
export default function ConditionalRedirect() {
    const {user} = useSelector((state) => state.auth)
    if (user) {
        return <Navigate to={getUserHome(user)} />
    }
}
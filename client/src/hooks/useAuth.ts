import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export function useAuth() {
    const {login, id} = useSelector((state: RootState) => state.user.user)
    return {
        isAuth: !!login,
        login,
        id
    }
}


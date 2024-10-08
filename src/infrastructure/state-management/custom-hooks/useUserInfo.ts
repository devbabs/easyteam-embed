import { useSelector } from "react-redux"
import { RootState } from "../store"

const useUserInfo = () => {
    const {token, user} = useSelector((state: RootState) => state.authentication)

    return [token, user]
}

export default useUserInfo
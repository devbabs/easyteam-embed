import { useSelector } from "react-redux"
import { RootState } from "../store"

const useEmployees = () => {
    const {employees, isFetchingEmployees} = useSelector((state: RootState) => state.employees)

    return [employees, isFetchingEmployees]
}

export default useEmployees
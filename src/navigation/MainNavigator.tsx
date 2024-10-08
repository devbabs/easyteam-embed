import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import RenderCondition from '../common/utils/hocs/RenderCondition';
import { fetchEmployees } from '../infrastructure/state-management/employees/EmployeesSlice';
import useUserInfo from '../infrastructure/state-management/custom-hooks/useUserInfo';
import useEmployees from '../infrastructure/state-management/custom-hooks/useEmployees';

const MainNavigator = () => {
    const dispatch = useDispatch()
    const [token, user] = useUserInfo()
    const [employees, isFetchingEmployees] = useEmployees()
    
    useEffect(() => {
        if (token) {
            dispatch(fetchEmployees())
        }
    }, [token])
    
    
    return (
        <RenderCondition
            children={(
                <HomeNavigator
                    token={token}
                    employees={employees}
                    user={user}
                />
            )}
            condition={token != null && !isFetchingEmployees && employees.length > 0}
            falseNode={<AuthNavigator />}
        />
    )
}

export default MainNavigator
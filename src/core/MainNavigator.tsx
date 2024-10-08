import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LoginScreen from '../screens/authentication/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { EasyTeamProvider } from '@easyteam/ui';
import { fetchEmployees } from './store/EmployeesSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClockScreen from '../screens/ClockScreen';
import TimeSheetScreen from '../screens/TimeSheetScreen';
import { EmployeeInterface } from './store/AuthenticationSlice';
import EmployeeTimeSheetScreen from '../screens/EmployeeTimeSheetScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    // headerShown: false,
                    title: "Login"
                }}
            />
        </Stack.Navigator>
    )
}

const HomeNavigator = ({token, employees, user}: {
    token: string
    user: EmployeeInterface | null
    employees: any[]
}) => {

    const tabs = [
        <Tab.Screen key={0} name="Clock" component={ClockScreen} />,
        <Tab.Screen key={1} name="TimeSheet" component={TimeSheetScreen} />,
    ]

    if (user?.is_admin) {
        tabs.push(<Tab.Screen key={2} name="EmployeeTimeSheetScreen" options={{headerShown: false}} component={EmployeeTimeSheetScreen} />)
        tabs.push(<Tab.Screen key={3} name="SettingsScreen" options={{title: "Settings"}} component={SettingsScreen} />)
    }

    return (
        <EasyTeamProvider
			token={token}
			employees={employees}
			basePath={'https://easyteam-dev-cbbeaxcbbkabh2g8.z03.azurefd.net/embed'}
		>
            <Tab.Navigator>
                {tabs}
            </Tab.Navigator>
        </EasyTeamProvider>
    )
}

const MainNavigator = () => {
    const {token, user} = useSelector((state: RootState) => state.authentication)
    const {employees, isFetchingEmployees} = useSelector((state: RootState) => state.employees)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!token) {
            return
        }

        dispatch(fetchEmployees())
    }, [token])
    

    return (token && !isFetchingEmployees && employees.length > 0) ? (
        <HomeNavigator
            token={token}
            employees={employees}
            user={user}
        />
    ) : (
        <AuthNavigator />
    )
}

const styles = StyleSheet.create({})

export default MainNavigator
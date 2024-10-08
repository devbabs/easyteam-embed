import { EasyTeamProvider } from "@easyteam/ui"
import ClockScreen from "../screens/ClockScreen"
import EmployeeTimeSheetScreen from "../screens/time-sheets/AdminTimeSheetScreen"
import SettingsScreen from "../screens/SettingsScreen"
import TimeSheetScreen from "../screens/time-sheets/EmployeeTimeSheetScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { EmployeeInterface } from "../infrastructure/state-management/authentication/AuthenticationState"
import { Image } from "react-native"

const Tab = createBottomTabNavigator()

const HomeNavigator = ({token, employees, user}: {
    token: string | null
    user: EmployeeInterface | null
    employees: any[]
}) => {
    if (!token) {
        return
    }

    const tabs = [
        <Tab.Screen
            key={0}
            name="Clock"
            component={ClockScreen}
            options={{
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={require('../../assets/images/icons/wall-clock.png')}
                        />
                    );
                }
            }}
        />,
        <Tab.Screen
            key={1}
            name="TimeSheet"
            component={TimeSheetScreen}
            options={{
                tabBarIcon: ({size}) => {
                    return (
                        <Image
                            style={{ width: size, height: size }}
                            source={require('../../assets/images/icons/clock.png')}
                        />
                    );
                }
            }}
        />,
    ]

    if (user?.is_admin) {
        tabs.push(
            <Tab.Screen
                key={2}
                name="EmployeeTimeSheetScreen"
                component={EmployeeTimeSheetScreen}
                options={{
                    headerShown: false,
                    title: "Admin Timesheet",
                    tabBarIcon: ({size}) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={require('../../assets/images/icons/circular-alarm-clock-tool.png')}
                            />
                        );
                    }
                }}
            />
        )
        tabs.push(
            <Tab.Screen
                key={3}
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({size}) => {
                        return (
                            <Image
                                style={{ width: size, height: size }}
                                source={require('../../assets/images/icons/settings.png')}
                            />
                        );
                    }
                }}
            />
        )
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

export default HomeNavigator
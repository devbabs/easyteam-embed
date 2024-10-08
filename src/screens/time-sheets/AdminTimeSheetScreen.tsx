import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Timesheet, TimesheetRef, AddButton } from '@easyteam/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShiftFormScreen from './ShiftFormScreen';

const Stack = createNativeStackNavigator()

const EmployeeTimeSheetScreen = ({ navigation, route }) => {
  const ref = useRef<TimesheetRef>(null);

    const {
        employeeId,
        startDate: pStartDate,
        endDate: pEndDate,
    } = route.params ?? {};

    const [startDate, setStartDate] = useState<string | undefined>(pStartDate);
    const [endDate, setEndDate] = useState<string | undefined>(pEndDate);

    useLayoutEffect(() => {
        // Allow the user to add a new shift if they have write permissions
        if (ref.current?.adminWritePermissions) {
            // Reload the data when the screen is focused
            const unsubscribe = navigation.addListener("focus", () => {
                ref.current?.reloadData();
            });

            return unsubscribe;
        }
    }, [navigation]);

    const EmployeeTimeSheetComponent = () => {
        return (
            <Timesheet
                ref={ref}
                onDateRangeChange={(newStartDate: string, newEndDate: string) => {
                    setStartDate(newStartDate);
                    setEndDate(newEndDate);
                }}
                startDate={startDate}
                endDate={endDate}
                employeeId={employeeId}
                onEditPress={(date: string, selectedEmployeeId: string) =>
                    navigation.navigate("ShiftFormScreen", {
                        date,
                        employeeId: selectedEmployeeId,
                    })
                }
                onEvent={event => console.log(event)}
            />
        );
    }


    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false,
                title: "Employee TimeSheet (AdminView)"
            }}
        >
            <Stack.Screen
                name={'EmployeeTimeSheet'}
                component={EmployeeTimeSheetComponent}
                options={{
                    // headerShown: false,
                    headerRight: () => {
                        return (
                            <AddButton
                                onPress={() =>
                                    // console.log("EmployeeID", ref.current!.selectedEmployeeId)
                                    navigation.navigate("ShiftFormScreen", {
                                        employeeId: ref.current!.selectedEmployeeId,
                                    })
                                }
                            />
                        )
                    }
                }}
            />
            <Stack.Screen
                component={ShiftFormScreen}
                name={"ShiftFormScreen"}
            />
        </Stack.Navigator>
    );
}

export default EmployeeTimeSheetScreen
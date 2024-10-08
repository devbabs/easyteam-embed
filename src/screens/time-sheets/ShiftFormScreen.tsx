import { Alert, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { ShiftForm, ShiftFormRef } from '@easyteam/ui';

const ShiftFormScreen = ({navigation, route}) => {
    const { employeeId, date } = route.params;
    const ref = useRef<ShiftFormRef>(null);

    useLayoutEffect(() => {
        // Modify the screen title and add a cancel button to the header
        const screenTitle = date ? new Date(date).toLocaleString("en-US") : "Add Shift";

        navigation.setOptions({
            title: screenTitle,
        });
    }, [navigation, date]);

    useEffect(() => {
        const preventGoingBack = (e) => {
            if (!ref.current?.unsavedChanges) {
                // If we don't have unsaved changes, then we don't need to do anything
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert("Unsaved Changes", "Are you sure you want to discard the changes?", [
                { text: "Cancel", style: "cancel", onPress: () => {} },
                {
                    text: "Yes",
                    style: "destructive",
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => navigation.dispatch(e.data.action),
                },
            ]);
        };

        const unsubscribe = navigation.addListener("beforeRemove", preventGoingBack);

        return unsubscribe;
    }, [navigation, ref]);

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <ShiftForm
                ref={ref}
                employeeId={employeeId}
                shiftDate={date}
                onSaveSuccess={() => navigation.goBack()}
                onCancelPress={() => navigation.goBack()}
                onEvent={event => console.log(event)}
            />
        </View>
    );
}

export default ShiftFormScreen
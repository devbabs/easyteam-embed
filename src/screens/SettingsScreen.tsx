import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Settings } from '@easyteam/ui'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { logout } from '../core/store/AuthenticationSlice'

const SettingsScreen = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{padding: 10}}>
                <Button
                    onPress={handleLogout}
                    mode={'contained-tonal'}
                >
                    Logout
                </Button>
            </View>
            <Settings
                onSave={({ employees, isGlobalTimeTrackingEnabled }) => {
                    /* 
                        Optionally handle settings change
                    */
                }}
                // onEvent={event => console.log(event)}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default SettingsScreen
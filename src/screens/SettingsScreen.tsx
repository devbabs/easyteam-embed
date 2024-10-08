import { View } from 'react-native'
import React from 'react'
import { Settings } from '@easyteam/ui'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { logout } from '../infrastructure/state-management/authentication/AuthenticationSlice'

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
                onSave={({ employees, isGlobalTimeTrackingEnabled }) => {}}
            />
        </View>
    )
}

export default SettingsScreen
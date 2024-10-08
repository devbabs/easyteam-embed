import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Settings } from '@easyteam/ui'

const SettingsScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Settings
                onSave={({ employees, isGlobalTimeTrackingEnabled }) => {
                    /* 
                        Optionally handle settings change
                    */			
                }}
                onEvent={event => console.log(event)}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default SettingsScreen
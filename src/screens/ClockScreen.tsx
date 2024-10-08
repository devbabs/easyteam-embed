import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Clock } from '@easyteam/ui'

const ClockScreen = () => {
    return (
        <Clock onEvent={event => console.log(event)} />
    )
}

const styles = StyleSheet.create({})

export default ClockScreen
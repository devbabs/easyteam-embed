import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../core/store/AuthenticationSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootState } from '../../core/store/store'
import ToastManager, { Toast } from 'react-native-toast-alert'

const LoginScreen = () => {
    const {token} = useSelector((state: RootState) => state.authentication)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('Macaulay')
    const [password, setPassword] = useState('123456')
    const {isAuthenticatingUser} = useSelector((state: RootState) => state.authentication)

    // useEffect(() => {
    //     if (!token) {
    //         Toast.success("Logout successful")
    //     }
    // }, [token])
    
    const handleLogin = () => {
        if(username == "" || password == "") {
            Toast.error('Please enter your username and password.')
            return
        }

        dispatch(login({
            username,
            password
        }))
        .unwrap()
        .then(res => {
            // console.log(res)
            Toast.success('Login successful')
        })
        .catch(err => {
            console.log(err)
            Toast.error(err.message)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ToastManager />
            <Text style={styles.headerText}>
                Welcome
            </Text>

            <View>
                <TextInput
                    value={username}
                    onChangeText={(text: string) => setUsername(text)}
                    mode={'outlined'}
                    label={'Username'}
                    placeholder={'Please enter your username'}
                    style={{
                        marginBottom: 10
                    }}
                />
                
                <TextInput
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    mode={'outlined'}
                    label={'Password'}
                    placeholder={'Please enter your password'}
                    secureTextEntry={true}
                    style={{
                        marginBottom: 10
                    }}
                />

                <Button
                    onPress={handleLogin}
                    mode={'contained'}
                    style={{
                        marginTop: 20
                    }}
                    loading={isAuthenticatingUser}
                >
                    Submit
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
})

export default LoginScreen
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/authentication/LoginScreen"

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: "Login"
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator
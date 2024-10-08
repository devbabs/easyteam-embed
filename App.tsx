import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-url-polyfill/auto';
import MainNavigator from './src/navigation/MainNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import StateProvider from './src/infrastructure/state-management/StateProvider';

const App = () => {
	return (
		<StateProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</GestureHandlerRootView>
		</StateProvider>
	)
}

export default App
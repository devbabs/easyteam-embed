import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/ClockScreen'
import { Provider } from 'react-redux'
import { store } from './src/core/store/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import 'react-native-url-polyfill/auto';
import { Clock, EasyTeamProvider, Timesheet, TimesheetRef } from '@easyteam/ui'
import MainNavigator from './src/core/MainNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
	// const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiMjVjNWJkYmEtZmFkYS00M2FkLThhZGQtMDg0YzEzZGNiYjYyIiwibG9jYXRpb25JZCI6ImYzNDQ3ZWJmLWMyNDgtNDEzYS04MDE4LTFkOWZjY2Q5ZjU1OCIsIm9yZ2FuaXphdGlvbklkIjoiZjM0NDdlYmYtYzI0OC00MTNhLTgwMTgtMWQ5ZmNjZDlmNTU4IiwicGFydG5lcklkIjoiZDQwZTJmOTItMjUyMy00ODMzLWE5Y2MtYTk1Y2VmNTc2ODc2IiwicGF5cm9sbElkIjoiPFNhbHNhIEVNUExPWUVFLUlEPiIsImVtcGxveWVyUGF5cm9sbElkIjoiPFNhbHNhIEVtcGxveWVyLUlEPiIsImFjY2Vzc1JvbGUiOnsibmFtZSI6Im1hbmFnZXIiLCJwZXJtaXNzaW9ucyI6WyJMT0NBVElPTl9SRUFEIiwiU0hJRlRfUkVBRCIsIlNISUZUX1dSSVRFIiwiU0hJRlRfQUREIl19LCJyb2xlIjp7Im5hbWUiOiI8RU1QTE9ZRUUgUk9MRSBpbiBzdG9yZTogQ2FzaGllci9Bc3Npc3RhbnQvTWFuYWdlci4uLj4ifSwiaWF0IjoxNzI4Mzc1OTg5fQ.qH3jARh4Ktk_aM1vwx1-aXkoE7Ne_-Yd7opvYpmZiQdZSJYXhvCqsaqX6PFXpn5EKM9k5TdqwTxryjKpMWTAh8QTuG6Dr1Bv9w_9Q2SkYkl2NrhkRHei4cjVCT3FnKV0xutxS7XcvX0XKlDFNSTWksxehpRan55b8zn3zN1XjnHKq6KlacU-XKmX0I5_NWUsWTKIcsIUUBtMW8lUp1TlxgiJOoj3V0mezARxG7drukIsGcd0f0vSOspVmNDdQB_PfvWtIj9xKus6lCTIKl_XXzY_m_j4aoVRcuri9DnP1jwVWRJHeEWXv9Y90FuvTqA1TaTmUGuPAN0Ju761c91ASpe_iaSjCWPBfu9cSb4Qv9qpaLvUyVXYBFjd6xGBeEPbnqfNNvSeX2R9wXmVvRCuE_z2SwH_dkgEnSmDiFCt-TDksMmbEg_50YXMfrZLd5dpW6EyUz53Ma90eWbRp-lpmsFjIA8qYcx2O0pYWPnlNLlkReLMTPswDFJcDvUA7hT7nrvDowwLgWa8bMcLv4Fk0mHW6oxupqz4TOEfiaAL_McDWngg3oHYBouJX1ANCFVIP6ei5HmNlobW2wmQS3RlsZXYKOKvBZTrJxfr3e_PWxdLXIjYW7Wrjvl28sCFMIU0BdatP-MuEoYaIgnldSOxoPMKvyz9ni8LgqbYNCiNRTo'
	// const employees = [
	// 	{
	// 		id: '25c5bdba-fada-43ad-8add-084c13dcbb62',
	// 		// payrollId: "1",
	// 		name: "Lola",
	// 		// picture: "https://example.com/picture.png"
	// 	}
	// ]

	// const [startDate, setStartDate] = useState<string | undefined>();
	// const [endDate, setEndDate] = useState<string | undefined>();
	// const ref = useRef<TimesheetRef>(null);

	return (
		<Provider store={store}>
			{/* <Timesheet
				ref={ref}
				onDateRangeChange={(newStartDate: string, newEndDate: string) => {
					setStartDate(newStartDate);
					setEndDate(newEndDate);
				}}
				startDate={startDate}
				endDate={endDate}
				onEvent={event => console.log(event)}
			/> */}
			{/* <Clock onEvent={event => console.log(event)} /> */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</GestureHandlerRootView>
		</Provider>
	)
}

export default App

const styles = StyleSheet.create({})
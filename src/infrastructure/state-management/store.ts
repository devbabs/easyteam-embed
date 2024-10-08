import { configureStore } from '@reduxjs/toolkit'
import { AuthenticationReducer } from './authentication/AuthenticationSlice'
import { EmployeesReducer } from './employees/EmployeesSlice'

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    employees: EmployeesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
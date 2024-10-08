import { configureStore } from '@reduxjs/toolkit'
import { AuthenticationReducer } from './AuthenticationSlice'
import { EmployeesReducer } from './EmployeesSlice'

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    employees: EmployeesReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
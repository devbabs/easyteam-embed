import { configureStore } from '@reduxjs/toolkit'
import { AuthenticationReducer } from './AuthenticationSlice'
import { EmployeesReducer } from './EmployeesSlice'

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    employees: EmployeesReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Http } from '../../common/network/https'

export interface EmployeeInterface {
    id: number
    name: string
    location_id: number
    is_admin: boolean
}

export interface AuthenticationStateInterface {
    token: string | null
    user: EmployeeInterface | null
    isAuthenticatingUser: boolean
}

const initialState: AuthenticationStateInterface = {
    token: null,
    user: null,
    isAuthenticatingUser: false
}

export const login = createAsyncThunk(
	'authentication/login',
	async (
		payload: {
			username: string
			password: string
		},
		thunkAPI
	) => {
		const { dispatch, rejectWithValue } = thunkAPI
		
        try {
			const response = await Http.post(`/login`, payload)

            return response.data
		} catch (error: any) {
			if (!error.response) {
				throw error
			}

			return rejectWithValue(error.response.data)
		}
	}
)

export const {
    reducer: AuthenticationReducer,
    actions
} =  createSlice({
    name: 'AuthenticationReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // builder.addCase(REHYDRATE, rehydrate);
        builder.addCase(login.fulfilled, (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticatingUser = false;
        });
        builder.addCase(login.pending, (state, action) => {
          state.isAuthenticatingUser = true;
        });
        builder.addCase(login.rejected, (state, action) => {
          state.isAuthenticatingUser = false;
        });
    }
})

export const {

} = actions
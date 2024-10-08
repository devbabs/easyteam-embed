import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Http } from '../../common/network/https'
import { RootState } from './store'
import { newState } from '../../common/utils/newState'
import { REHYDRATE, RehydrateAction } from 'redux-persist';

export interface EmployeeInterface {
    id: number
    name: string
    location_id: number
    is_admin: boolean
}

export interface AuthenticationInterface {
    token: string | null
    user: EmployeeInterface | null
    isAuthenticatingUser: boolean
}

interface RehydrateAppAction extends RehydrateAction {
    payload?: RootState;
}

const initialState: AuthenticationInterface = {
    token: null,
    user: null,
    isAuthenticatingUser: false
}

const rehydrate = (
	state: AuthenticationInterface,
	rehydrateParams: RehydrateAppAction,
) => {
	return newState(rehydrateParams.payload?.authentication || state, {
		token: rehydrateParams.payload?.authentication?.token ?? null,
		user: rehydrateParams.payload?.authentication?.user ?? null,
		isAuthenticatingUser: rehydrateParams.payload?.authentication?.isAuthenticatingUser ?? false,
	});
};

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
    reducers: {
        logout: (state: AuthenticationInterface) => {
            state.token = null;
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(REHYDRATE, rehydrate);
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
    logout
} = actions
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Http } from '../../http-module/https'
import { RootState } from '../store'
import { copyObject } from '../../../common/utils/copyObject'
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { AuthenticationInterface, InitialAuthenticationState } from './AuthenticationState';

interface RehydrateAppAction extends RehydrateAction {
    payload?: RootState;
}

const rehydrate = (
	state: AuthenticationInterface,
	rehydrateParams: RehydrateAppAction,
) => {
	return copyObject(rehydrateParams.payload?.authentication || state, {
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
		const { rejectWithValue } = thunkAPI
		
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
    initialState: InitialAuthenticationState,
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
        builder.addCase(login.pending, (state) => {
            state.isAuthenticatingUser = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.isAuthenticatingUser = false;
        });
    }
})

export const {
    logout
} = actions
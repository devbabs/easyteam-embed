import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Http } from '../../common/network/https'
import { RootState } from './store'
import { newState } from '../../common/utils/newState'
import { REHYDRATE, RehydrateAction } from 'redux-persist';

export interface EmployeesStateInterface {
    employees: any[]
    isFetchingEmployees: boolean
}

const initialState: EmployeesStateInterface = {
    employees: [],
    isFetchingEmployees: false
}

interface RehydrateAppAction extends RehydrateAction {
    payload?: RootState;
}

const rehydrate = (
	state: EmployeesStateInterface,
	rehydrateParams: RehydrateAppAction,
) => {
	return newState(rehydrateParams.payload?.employees || state, {
		employees: rehydrateParams.payload?.employees?.employees ?? [],
		isFetchingEmployees: rehydrateParams.payload?.employees?.isFetchingEmployees ?? false,
	});
};

export const fetchEmployees = createAsyncThunk(
    'employees.fetchEmployees',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        try {
            const response = await Http.get(`/employees`);

            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }

            return rejectWithValue(error.response.data);
        }
    }
)

export const {
    reducer: EmployeesReducer,
    actions
} =  createSlice({
    name: 'EmployeesReducer',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(REHYDRATE, rehydrate);
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
          state.employees = action.payload.employees;
          state.isFetchingEmployees = false;
        });
        builder.addCase(fetchEmployees.pending, (state, action) => {
          state.isFetchingEmployees = true;
        });
        builder.addCase(fetchEmployees.rejected, (state, action) => {
          state.isFetchingEmployees = false;
        });
    }
})

export const {

} = actions
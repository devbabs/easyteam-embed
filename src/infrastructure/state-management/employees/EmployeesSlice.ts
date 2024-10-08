import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { REHYDRATE, RehydrateAction } from 'redux-persist';
import { EmployeesStateInterface, InitialEmployeesState } from './EmployeesState';
import { Http } from '../../http-module/https';
import { copyObject } from '../../../common/utils/copyObject';
import { RootState } from '../store';

interface RehydrateAppAction extends RehydrateAction {
    payload?: RootState;
}

const rehydrate = (
	state: EmployeesStateInterface,
	rehydrateParams: RehydrateAppAction,
) => {
	return copyObject(rehydrateParams.payload?.employees || state, {
		employees: rehydrateParams.payload?.employees?.employees ?? [],
		isFetchingEmployees: rehydrateParams.payload?.employees?.isFetchingEmployees ?? false,
	});
};

export const fetchEmployees = createAsyncThunk(
    'employees.fetchEmployees',
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

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
    initialState: InitialEmployeesState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(REHYDRATE, rehydrate);
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
          state.employees = action.payload.employees;
          state.isFetchingEmployees = false;
        });
        builder.addCase(fetchEmployees.pending, (state) => {
          state.isFetchingEmployees = true;
        });
        builder.addCase(fetchEmployees.rejected, (state) => {
          state.isFetchingEmployees = false;
        });
    }
})
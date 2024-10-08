export interface EmployeesStateInterface {
    employees: any[]
    isFetchingEmployees: boolean
}

export const InitialEmployeesState: EmployeesStateInterface = {
    employees: [],
    isFetchingEmployees: false
}
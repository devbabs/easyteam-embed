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

export const InitialAuthenticationState: AuthenticationInterface = {
    token: null,
    user: null,
    isAuthenticatingUser: false
}
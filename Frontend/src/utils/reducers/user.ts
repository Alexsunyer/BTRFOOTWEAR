export interface User {
    username: string;
    email: string;
    password: string;
    token: string;
    address_1?: string;
    address_2?: string;
    postal_code?: string;
    phone?: string;
}

export interface UserActionDelete {
    type: 'USER_DELETEUSER'
    payload: {email: string, password: string}
}

export interface UserActionChange {
    type: 'USER_CHANGEUSER'
    payload: User
}

export type UserPayload = User | null

export default function user (state: UserPayload = null, action: UserActionDelete | UserActionChange): User | null {
    switch (action.type) {
        case 'USER_DELETEUSER':
            if (!state) {
                return state
            }
            return {...state, email: action.payload.email, password: action.payload.password, };
        case 'USER_CHANGEUSER':
            return state = action.payload
        default:
            return state;
    }
}
export interface Example {
    name: string
    number: number
}

export interface ExampleAction {
    type: 'CHANGE_EXAMPLE'
    payload: Example
}

export interface ExampleActionSumNumber {
    type: 'CHANGE_EXAMPLE_SUM_NUMBER'
}

export type ExamplePayload = Example | null

export default function example(state: ExamplePayload = null, action: ExampleAction | ExampleActionSumNumber): Example | null {
    switch(action.type) {
        case 'CHANGE_EXAMPLE':
            return state = action.payload
        case 'CHANGE_EXAMPLE_SUM_NUMBER':
            if (!state) {
                return state = null
            }
            const newNumber = state?.number + 1
            return state = {...state, number: newNumber}
        default:
            return state
    }
}
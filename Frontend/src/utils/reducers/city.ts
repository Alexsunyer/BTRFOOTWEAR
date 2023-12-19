export interface City {
    name: string
    ShopsNumber: number
}

export interface cityAction {
    type: 'CHANGE_CITY',
    payload: City
}

export type CityPayload = City | null

export default function city (state: CityPayload = null, action: cityAction): City | null {
  switch (action.type) {
    case 'CHANGE_CITY':
        return state = action.payload
    default:
        return state;
  }
}

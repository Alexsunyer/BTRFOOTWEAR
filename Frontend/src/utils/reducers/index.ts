import { combineReducers, configureStore } from '@reduxjs/toolkit'
import example, { ExamplePayload } from './example'
import shoppingCart, { ShoppingCartPayload } from './shoppingCart'
import user, { UserPayload } from './user'
import city, { CityPayload } from './city'
import order, { OrderPayload } from './order'

export interface AllReduxPayloads {
    example: ExamplePayload
    shoppingCart: ShoppingCartPayload
    user: UserPayload
    city: CityPayload
    order: OrderPayload
}

const rootReducer = combineReducers({
    example,
    shoppingCart,
    user,
    city,
    order,
})

const store = configureStore({reducer: rootReducer})

export default store
import { configureStore } from "@reduxjs/toolkit"
import {thunk} from "redux-thunk"
import { rootReducer } from "./combineReducer"





export const makeStore = ()=>{
    return configureStore({
        reducer:rootReducer,
        middleware(getDefaultMiddleware){
            return getDefaultMiddleware().concat(thunk)
        }
    })
}

type Store  = ReturnType<typeof makeStore>

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>
export type AppStore = ReturnType<Store["getState"]>
import { configureStore } from "@reduxjs/toolkit"
// import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external"
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"

// 
// steps for state management
// submit action
// handle action in tis reducer
// register here -> reducer
// 

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postReducer
    }
})

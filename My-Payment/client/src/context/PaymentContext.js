import { createContext, useReducer } from 'react'

export const PaymentContext= createContext()


export const paymentReducer=(state,action)=>{
// export const paymentReducer=(state=  { payments: [] },action)=>{    
    console.log('state.payments : ', state.payments)
    console.log('state : ', state)
    // let array = {}
    // array = state.payments
    switch(action.type){
        case 'SET_PAYMENTS':
            return{
                payments:action.payload
            }
        
        case 'CREATE_PAYMENT':
            return{
                payments:[action.payload,...state.payments]
            }
        
        case 'DELETE_PAYMENT':
            return{
                payments:state.payments.filter((p)=>p._id !== action.payload._id)
            }

        default:return state
    }
}

export const PaymentContextProvider=({children})=>{
    console.log('111')
    const [state,dispatch]= useReducer(paymentReducer
        ,{
        payments:[]
    }
    )

    return(
        <PaymentContext.Provider value={{...state,dispatch}}>
            {children}
        </PaymentContext.Provider>
    )
    
}
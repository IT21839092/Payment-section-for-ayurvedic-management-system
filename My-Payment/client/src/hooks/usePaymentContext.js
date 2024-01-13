import { PaymentContext } from "../context/PaymentContext";
import { useContext } from "react";

export const usePaymentContext=()=>{
    const context=useContext(PaymentContext)

    if(!context){
        throw Error('usePaymentContext must be used inside a PaymentContextProvider')
    }

    return context
}
import { usePaymentContext } from '../hooks/usePaymentContext'
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import '../index.css'

const PaymentInfo=({payment})=>{

    const { dispatch }=usePaymentContext()

    // const handleClick=async ()=>{
    //     const response=await fetch('/api/payments'+payment._id , {
    //         method:'DELETE'
    //     })

    //     const json=await response.json()

    //     if(response.ok){
    //         dispatch({type:'DELETE_PAYMENT',payload:json})
    //     }
    // }

    const handleClick = async () => {
        try {
          const response = await fetch(`/api/payments/${payment._id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            const json = await response.json();
            dispatch({ type: 'DELETE_PAYMENT', payload: json });
          } else {
            // Handle the case where the DELETE request failed (e.g., show an error message)
            console.error('Failed to delete payment');
          }
        } catch (error) {
          // Handle any network or other unexpected errors
          console.error('An error occurred:', error);
        }
      };
      

    return(
        <div className="payment-details">
            <p><strong>Amount:</strong>{payment.amount}</p>
            <p><strong>Payment Slip</strong></p><br/>
            <img
              src={`http://localhost:5000/images/${payment.slip}`}
              alt={`Slip ${payment._id}`}
              style={{ width: '100px', height: '100px' }}
            />
            <p>{formatDistanceToNow(new Date(payment.createdAt),{addSuffix:true})}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default PaymentInfo
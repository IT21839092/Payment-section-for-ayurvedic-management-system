import React, {useState} from 'react'
//import axios from 'axios'
//import {useNavigate,Link} from 'react-router-dom'
import { usePaymentContext } from '../hooks/usePaymentContext'
import '../index.css'
import BOC from '../bankLogo/BOC.png'
import commercial from '../bankLogo/commercial.jpg'
import NSB from '../bankLogo/NSB.png'
import sampath from '../bankLogo/sampath.jpg'
import seylan from '../bankLogo/seylan.png'


const PayOnline=()=>{

    const { dispatch }=usePaymentContext()
    const [amount,setAmount]= useState('')
    const [error,setError]=useState(null)
    const [file,setFile]=useState('')
    //const [slip,setSlip]=useState()

    const handleUpload=async (e)=>{
        e.preventDefault()
        
        const payment={amount,file}
        const formdata= new FormData()
        formdata.append('file',file)
        
        console.log('payment.file : ', payment.file.name)
        payment.file = payment.file.name
        console.log('handleSubmit : ', payment)
        // const response=await fetch('/api/payments',{
        //     method:"POST",
        //     body:JSON.stringify(payment),
        //     headers:{
        //         'Content-type':'application/json'
        //     }
        // })

        // const json=await response.json()

        // if(!response.ok){
        //     setError(json.error)
        // }
        // if(response.ok){
        //     setAmount('')
        //     //setSlip('')
        //     setError(null)
        //     console.log('Success',json)
        //     dispatch({type:'CREATE_PAYMENT',payload:json})
        // }

        
        // console.log('formdata : ', formdata)
        // console.log('slip : ', payment.file.name)

        try {
            const response = await fetch('/api/payments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payment),
            });

            const json=await response.json()

            if(!response.ok){
                  setError(json.error)
            }

            if (response.ok) {
                setAmount('')
                setFile('')
                setError(null)
                console.log('Success',json)
                dispatch({type:'CREATE_PAYMENT',payload:json})
              // Handle success, e.g., redirect or show a success message
            } else {
              // Handle error, e.g., display an error message
            }
          } catch (error) {
            console.error('Error:', error);
          }

        // try { 
        //     await axios.post('/api/payments/',payment)
        //   }
        //   catch (error) {
        //     console.log(error);
        //     }
        // axios.post('/api/payments',payment)
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
    }

    return(
        <div className='online'>
        <form className='type-online'>

        <p><strong>Bank options</strong></p><br/>

        <div className='content'>

        <div className='box'>
        <a href='https://online.boc.lk/T001/channel.jsp'><img src={BOC} alt='boc'></img></a>
        </div>

        <div className='box'>
        <a href='https://www.combank.lk/digitalbanking/'><img src={commercial} alt='commercial'></img></a>
        </div>

        <div className='box'>
        <a href='https://digital.nsb.lk/'><img src={NSB} alt='nsb'></img></a>
        </div>

        <div className='box'>
        <a href='https://www.sampathvishwa.com/SVRClientWeb/ActionController'><img src={sampath} alt='sampath'></img></a>
        </div>

        <div className='box'>
        <a href='https://www.seylanbank.lk/banking-internet-seylan-real/login'><img src={seylan} alt='seylan'></img></a><br></br>
        </div>

        </div>

        <p><strong>Do your payment for the below bank details</strong></p><br/>
        <div className='bank-details'>
        <p>G.G.A Kaushalya</p><br/>    
        <p>Account Number=2172387</p><br/>
        <p>Bank=BOC</p><br/>
        <p>Branch=Ampara</p><br/>
        </div>
        <p><strong>Amount</strong></p>
        <input type='number' name='amnt-cash' onChange={(e)=>setAmount(e.target.value)} value={amount}/><br></br>

        <p><strong>Upload your slip here</strong></p>
        <input type='file' accept="image/*" onChange={e=>setFile(e.target.files[0])} /><br/>
       
        <button onClick={handleUpload}>Submit</button>
        {error && <div className='error'>{error}</div>}
        </form>
    </div>
    )
}

export default PayOnline
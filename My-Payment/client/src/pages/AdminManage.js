import { useEffect,useState } from 'react'
import { usePaymentContext } from '../hooks/usePaymentContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';

//components
import PaymentInfo from '../components/PaymentInfo'

import '../index.css'

const AdminManage=()=>{

    const {payments,dispatch}=usePaymentContext()
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const [filteredPayments, setFilteredPayments] = useState([]); // State to hold filtered payments

    useEffect(()=>{
        const fetchPayments=async ()=>{
            const response= await fetch('/api/payments')
            const json=await response.json()

            if(response.ok){
                dispatch({type:'SET_PAYMENTS',payload:json})
            }
        }

        fetchPayments()
    },[dispatch])

  //   const searchPayments = () => {
  //     if (selectedMonth && selectedYear) {
  //       const searchDate = new Date(selectedYear, selectedMonth - 1); // Month is 0-based
  //       const formattedSearchDate = searchDate.toISOString().split('T')[0]; // Convert selected month and year to the same format
    
  //       const filtered = payments.filter((payment) => {
  //         const paymentDate = payment.createdAt.split('T')[0]; // Convert createdAt to the same format
  //         return paymentDate === formattedSearchDate;
  //       });
    
  //       setFilteredPayments(filtered); // Update the state with filtered payments
  //     } else {
  //       // Handle the case where either month or year is not selected.
  //       // You might want to show a message or handle it in some way.
  //       setFilteredPayments([]); // Clear the filteredPayments state
  //     }
  // };

  const searchPayments = () => {
    if (selectedMonth && selectedYear) {
      const selectedMonthValue = selectedMonth.getMonth() + 1; // Month is 0-based
      const selectedYearValue = selectedYear.getFullYear();
  
      const filtered = payments.filter((payment) => {
        const createdAt = payment.createdAt;
        const createdAtDate = new Date(createdAt);
        const paymentMonth = createdAtDate.getMonth() + 1; // Month is 0-based
        const paymentYear = createdAtDate.getFullYear();
  
        return paymentMonth === selectedMonthValue && paymentYear === selectedYearValue;
      });
  
      setFilteredPayments(filtered); // Update the state with filtered payments
    } else {
      // Handle the case where either month or year is not selected.
      // You might want to show a message or handle it in some way.
      setFilteredPayments([]); // Clear the filteredPayments state
    }
  };
  
 

    return(
        <div className="admin">
            <h4>Payment Details</h4>
                <div className='search-bar'>
                <DatePicker
                selected={selectedMonth}
                onChange={date => setSelectedMonth(date)}
                dateFormat="MMMM"
                showMonthYearPicker
                placeholderText="Select Month"
              />
              <DatePicker
                selected={selectedYear}
                onChange={date => setSelectedYear(date)}
                dateFormat="yyyy"
                showYearPicker
                placeholderText="Select Year"
              />
              <button onClick={searchPayments}>Search</button>
                </div>
                <div className='report-buttton'>
                <button>
                <Link to="/report">Generate Report</Link>
                </button>
                </div>
            <div className='payments'>
            {filteredPayments.length > 0
          ? filteredPayments.map((payment) => (
              <PaymentInfo key={payment._id} payment={payment} />
            ))
          : payments.map((payment) => (
              <PaymentInfo key={payment._id} payment={payment} />
            ))}
            </div>
            
        </div>
    )
};

export const calculateMonthlyIncome = (payments) => {

  if (!Array.isArray(payments)) {
    return {}; // Return an empty object or handle the error as needed
  }
  
  // Create an object to hold the monthly income data
  const monthlyIncomeData = {};

  payments.forEach((payment) => {
    const paymentDate = new Date(payment.createdAt);
    const year = paymentDate.getFullYear();
    const month = paymentDate.getMonth();

    const key = `${year}-${month}`;
    const income = payment.amount;

    if (monthlyIncomeData[key]) {
      monthlyIncomeData[key] += income;
    } else {
      monthlyIncomeData[key] = income;
    }
  });

  return monthlyIncomeData;
};

export const findHighestIncomeMonth = (monthlyIncomeData) => {
  let highestIncome = 0;
  let highestIncomeMonth = null;

  for (const key in monthlyIncomeData) {
    if (monthlyIncomeData[key] > highestIncome) {
      highestIncome = monthlyIncomeData[key];
      highestIncomeMonth = key;
    }
  }

  // Convert the key back to a month and year
  if (highestIncomeMonth) {
    const [year, month] = highestIncomeMonth.split('-');
    const date = new Date(year, month);
    highestIncomeMonth = date.toLocaleString('default', { month: 'long' }) + ' ' + year;
  }

  return { month: highestIncomeMonth, income: highestIncome };
};


export default AdminManage

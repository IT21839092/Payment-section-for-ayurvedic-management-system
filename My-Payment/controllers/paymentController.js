//const multer = require('multer')
const Payment=require('../models/payment')
const mongoose=require('mongoose')

//get all payments
const getPayments= async (req,res)=>{
    const payments=await Payment.find({}).sort({createdAt: -1})

    res.status(200).json(payments)
}

// const searchPayments = async (req, res) => {
//     const { year, month } = req.query;
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);
  
//     const payments = await Payment.find({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     }).sort({ createdAt: -1 });
  
//     res.status(200).json(payments);
//   };

//get a single payment
const getPayment=async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such a payment done!"})
    }

    const payment= await Payment.findById(id)

    if(!payment){
        return res.status(404).json({error:"No such a payment done!"})
    }

    res.status(200).json(payment)
}

//create a new payment
const createPayment = async (req, res) => {
    try {
      console.log('req.body:', req.body);
      //console.log('req.body.file:', req.body.slip); // Correctly access the uploaded file
  
      const amount = req.body.amount;
      const slip = req.body.file ; // Use req.file to access the uploaded file
  
      // Ensure that 'slip' contains the necessary information before saving to the database
      if (!slip) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      console.log('amount and slip:', amount, slip);
  
      // Continue with the code to create a payment using 'amount' and 'slip'
      const payment = await Payment.create({ amount, slip });
      console.log(payment);
      res.status(200).json(payment);
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'An error occurred while creating the payment.' });
    }
  };
  
//delete a payment
const deletePayment=async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such a payment done!"})
    }

    const payment=await Payment.findOneAndDelete({_id:id})

    if(!payment){
        return res.status(404).json({error:"No such a payment done!"})
    }

    res.status(200).json(payment)
}

module.exports={
    createPayment,
    //searchPayments,
    getPayments,
    getPayment,
    deletePayment
}
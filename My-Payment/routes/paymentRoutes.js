const express=require('express')
const multer = require('multer')
const path = require('path')
const {
    createPayment,
    //searchPayments,
    getPayments,
    getPayment,
    deletePayment
}=require('../controllers/paymentController')

console.log('out side top')

const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'images')
            console.log('start....')
        },
        filename:(req,file,cb)=>{
            console.log('payments routes file = ', file)
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
            //cb(null, file.slip)
        }
})

const upload=multer({
    storage:storage
})

const router=express.Router()

//save payments
router.post('/', upload.single('file'),createPayment)
//router.post('/', createPayment)

//get payments
router.get('/',getPayments)
//router.get('/',searchPayments)

//get a single payment
router.get('/:id',getPayment)

//update payments
//router.patch('/:id',updatePayment)

//delete payments
router.delete('/:id',deletePayment)

module.exports=router
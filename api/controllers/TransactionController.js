/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  get_transcation:async (req,res)=>{
    try {
        const transaction =  await Transaction.find()
        .sort([{T_date: 'DESC'}])
        res.status(200).send({
            count:transaction.length,
            transactions:transaction
        })
    } catch (error) {
        res.status(500).send({
            error:error
        })
    }
  },

  create_transcation: async (req,res)=>{
    try {
      const { T_amount,T_type,Account,T_date} = req.body
         await Transaction.create({
            T_amount:T_amount,
            T_type:T_type,
            T_date:T_date,
            Account:Account
        })
        
        res.status(201).send({
            message:"create transaction",
            
        })
    } catch (error) {
        res.status(500).send({
            error:"not created"
        })
    }
  },
  update_transcation: async (req,res)=>{
    try {
        const {T_amount,T_type,T_date} = req.body
      const id = req.params.transactionId
        await Transaction.update({ id: id }).set({
            T_amount: T_amount,
            T_type: T_type,
            T_date:T_date
          });
          res.status(200).send({
            message:"Account update"
          })
    } catch (error) {
        res.status(500).send({
            error:error
        })
    }
  },
  delete_transcation:async(req,res)=>{
    try {
        const id= req.params.transactionId
        await Transaction.destroyOne({id:id})
        res.status(200).send({
            message:"transction delete"
        })
    } catch (error) {
        res.status(500).send({
            error:error
        })
    }
  }

};


/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  //get all transcation
  get_Transcation: async (req, res) => {
    try {
      let transaction = await Transaction.find()
        .sort([
          { TransactionDate: "DESC" },
          { createdAt: "DESC" }
        ])
      res.status(200).send({
        count: transaction.length,
        transactions: transaction
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },

  //create transcation
  create_Transcation: async (req, res) => {
    try {
      let { TransactionAmount, TranscationType, Account, TransactionDate } = req.body
      await Transaction.create(
    {    TransactionAmount : TransactionAmount,
        TranscationType: TranscationType,
        TransactionDate: TransactionDate,
        Account: Account}
        // req.body
      )

      res.status(201).send({
        message: "create transaction",

      })
    } catch (error) {
      res.status(500).send({
        error: "not created"
      })
    }
  },

  //update transcation
  update_Transcation: async (req, res) => {
    try {
      let { TransactionAmount, TranscationType,TransactionDate } = req.body
      let id = req.params.transactionId
      await Transaction.update({_id: id }).set({
        TransactionAmount: TransactionAmount,
        TranscationType: TranscationType,
        TransactionDate: TransactionDate
      });
      res.status(200).send({
        message: "Account update"
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  },

  //delete transcation
  delete_Transcation: async (req, res) => {
    try {
      let id = req.params.transactionId
      await Transaction.destroyOne({_id: id })
      res.status(200).send({
        message: "transction delete"
      })
    } catch (error) {
      res.status(500).send({
        error: error
      })
    }
  }        
};


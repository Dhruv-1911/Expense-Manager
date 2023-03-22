const Constant = sails.config.constant

module.exports = {


  friendlyName: 'Send email',


  description: '',


  inputs: {
    
    user: {
      type: "ref",
      required: true
    },
   
    pass: {
      type: "ref",
      required: true
    },

    to: {
      type: "ref",
      required: true
    },

    Name: {
      type: "ref"
    },

    Password: {
      type: "ref"
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    let mailTransporter = Constant.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${inputs.user}`,
        pass: `${inputs.pass}`
      }
    });
    // console.log(Constant.email);

    // const { Email }= req.body

    let mailDetails = {
      from: Constant.Email,
      to: `${inputs.to}`,
      subject: 'Expense Manager',
      html: `hi ${inputs.Name},<br> welcome to the Expense Manager App and your Password is ${inputs.Password} `
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs');
        console.log(err)
      } else {
        console.log('Email sent successfully');
      }
    });
    return exits.success();
  }


};


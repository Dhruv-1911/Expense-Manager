

module.exports={
attributes:{
    A_name:{
        type:"String", 
        defaultsTo:"default"
    },
    A_type:{
        type:"String",
        defaultsTo:"saving"
    },
    User:{
        model:'user',
        required:true
    },
    transactions:{
        collection:"transaction",
        via:"Account"
    },
    Users:{
        collection:"user",
        via:"Accounts"
    }
}
};
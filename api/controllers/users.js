const  userModel = require('../models/User');
const  bcrypt    = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};
// Create user //register user
userController.register = async (req, res, next) => {
    console.log(req.body);
    let email    = req.body.email;
    let password = req.body.password;
// Validate if user exist in our database
    const oldUser = await userModel.findOne({email});

    if (oldUser) {
      return res.status(409).send({success:false,message : "User Already Exist. Please Login"});
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    userModel.create({
        
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: encryptedPassword,

    }).
        then((data) => {
           res.status(200).send({
              success: true,
              statusCode: 200,
              message:data
            })
        })
        .catch((error) => {
            res.status(400).send({geterror:error})
        });
};
userController.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send({ 
                success: false,
                statusCode: 400,
                message: "All input is required"
            });
        }
        /// Validate if user exist in our database
        const user = await userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token 
            const authToken = jwt.sign(
                { 
                    user_id: user._id, email },
                    process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            
             // user
             res.status(200).send({success:true,token:authToken,message:"login successfuly"});
          //error  
        }
        res.status(400).send({success:false,message : "Invalid Credentials"});
    }catch(error) {
        res.status(400).send({geterror:error})
    }
};


userController.userListing = (req, res, next) => {
    //auth
   // console.log(req)
    userModel.find().then((data) => {
    return res.status(200).send({
            success: true,
            statusCode: 200,
            users:data
          })
    }).catch((error) => {
      res.status(400).send({geterror:error})
    });
};

module.exports = userController;

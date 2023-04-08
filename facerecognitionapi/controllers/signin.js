
const handleSignIn = (req,res,db,bcrypt)=>{
    const {email,password} = req.body;
    // console.log(email)
    // db.select('hash','email').from('login')
    // .then(data => {
    //             console.log(data)
    // })
    if(!email||!password){
        return res.status(400).json("Incorect Form Submission")
    }
    db.select('hash','email').from('login')
    .where('email', '=',email)
    .then(data => {
           const isValid =  bcrypt.compareSync(password,data[0].hash); 
           if(isValid){
            return db.select('*').from('users').where('email','=',req.body.email)
            .then(user=>{res.json(user[0])
            })
            .catch(err=>res.status(400).json('Unable to find User'))
        }
        else{
            res.status(400).json("Wrong Credentials")
        }
    })
    .catch(err=>res.status(400).json('Wrong credential'))





    //     // Load hash from your password DB.
    //     bcrypt.compare("cook", '$2b$10$vKHI8FadiOxbAcoMmfS2I.TgRhYq/auHKS6hga/MMgxpv/SQx7YHK', function(err, res) {
    //          console.log('First guess', res)
    //     });
    //     bcrypt.compare("Wrong", '$2b$10$vKHI8FadiOxbAcoMmfS2I.TgRhYq/auHKS6hga/MMgxpv/SQx7YHK', function(err, res) {
    //         console.log('Second guess', res)
    //     });
    // if(req.body.email=== database.users[0].email &&
    //     req.body.password === database.users[0].password){
    //         res.json(database.users[0]); // Exercise 
    //         //res.json('Success')
    //     }else{
    //         res.status(400).json('error logging in ')
    //     }
    


}


export default {
    handleSignIn:handleSignIn
}
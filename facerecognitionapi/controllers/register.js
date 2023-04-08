const handleRegister = (req,res,db,bcrypt)=>{ 
    
    // const{email,name,password} = req.body//  Before connecting to actual Data base // const saltRounds = 10; //bcrypt.hash(password, saltRounds, function(err, hash) { console.log(hash)});
    // Before connecting to actual Data base // database.users.push({  // id:'125',name: name, email: email, entries: 0, joined : new Date() })
    const{email,name,password} = req.body
    //const hash = bcrypt.hashSync(password, null, null, function(err,hash){}); from NPM webditr
    if(!email||!password||!name){
        return res.status(400).json("Incorect Form Submission")
    }
                const hash=bcrypt.hashSync(password,10)
                    db.transaction(trx=>{
                        trx.insert({
                            hash:hash,
                            email:email
                        })
                        .into('login')
                        .returning('email')
                        .then(loginEmail =>{
                         return  trx ('users')
                                .returning('*')
                                .insert({
                                    email:loginEmail[0].email,
                                    name:name,
                                    joined:new Date()
                                }).then(user =>{
                                    res.json(user[0])
                                })
                        }) 
                        .then(trx.commit)
                        .catch(trx.rollback)
                    })
                    .catch(err=>{
                        res.json('Unable to Register')})
    
}

export default {
    handleRegister:handleRegister
}
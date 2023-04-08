import Clarifai from 'clarifai'

const app = new Clarifai.App({
    apiKey: "06b4cfb08b79472d80f968ffc7f4ac7f"
});
  
const handleApiCall = (req,res) =>{
    app.models.predict('face-detection', req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err=>res.status(400).json('Unable to work with Api'))
}

const handleEntry = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries)
        //res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('Unable to get entries'))
}

export {handleEntry,handleApiCall}
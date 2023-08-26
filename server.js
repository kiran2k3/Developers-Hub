const express =require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const devuser = require('./devusermodel');
const middleware = require('./middleware');
const review = require('./reviewmodel');
const cors = require('cors');
const reviewmodel = require('./reviewmodel');
const app = express();

mongoose.connect('mongodb+srv://kiranmayee:kiran@cluster0.o89ezpn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=> console.log('DB connected')
)

app.use(express.json());
app.use(cors({origin:'*'}));
app.get('/',(req,res)=>{
    return res.send('Hello World!!')
})

app.post('/register', async (req,res)=>{
    try{
        const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
        const exist = await devuser.findOne({email});
        if(exist) {
            return res.status(400).send('User Already Registered')
        } 
        if(password != confirmpassword){
            return res.status(403).send('Password Invalid')
        }
        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;
        const exist = await devuser.findOne({email});
        if(!exist) {
            return res.status(400).send('User does not exist')
        } 
        if(exist.password != password){
            return res.status(400).send('Password Invalid')
        }
        
        let payload ={
            user :
            {
                id:exist.id
            }
        }
       
        jwt.sign(payload,'jwtpassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err;
             return res.json({token})
        })
    
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/allprofiles',middleware,async(req,res) =>{
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles);
    }
    catch (err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user); 
    }
    catch (err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/addreview',middleware,async(req,res)=>{
    try{
       const {taskworker,rating} = req.body;
       const exist = await devuser.findById(req.user.id);
       const newReview = new reviewmodel({
        taskprovider: exist.fullname,
        taskworker,rating
       })
       newReview.save();
       return res.status(200).send('Review updated successfully')
    }
    catch (err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myreview',middleware,async(req,res)=>{
    try{
        let allreviews = await review.find();
        let myreviews  = allreviews.filter(review => review.taskworker.toString()==req.user.id.toString())
        return res.status(200).json(myreviews); 
    }
    catch (err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.listen(5000,()=>console.log('Server running...'))
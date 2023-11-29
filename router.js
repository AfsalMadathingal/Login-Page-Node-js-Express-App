var express=require("express")
var cp=require('child_process')
var router=express.Router()

//username password
const credintial={
    username:"admin",
    password: "123"

}

let invaliduser=false
let logout=false



//login ROUTE

router.get('/',(req,res)=>
{
    if(req.session.user)
    {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('homepage',{title: "home page", user: req.session.user})
    }else if(logout)
    {   
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('loginpage',{title: "Login" , msg:"Logout Success" , color: "color: green;"})
        logout=false
        cp.exeSynch('start chrome https://github.com/AfsalMadathingal/Login-Page-Node-js-Express-App')

    }else
    {   
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('loginpage',{title: "Login" , msg:"Welcome" , color: "color: Blue;"})
    }
})

//login user

router.post('/login',(req,res)=>
{
    if(req.body.username==credintial.username && req.body.password==credintial.password)
    {
        req.session.user= req.body.username
        
        res.redirect('/homepage')
            
    }else
    {
       res.redirect('/login')
       invaliduser=true
         
    }


})




//home route

router.get('/homepage', (req,res)=>
{   if(req.session.user)
    {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('homepage',{title: "home page", user: req.session.user})
    }else
    {   
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('loginpage',{title:"Login Page"})
    }
    
})

//logout
router.get('/logout', (req,res)=>
{
    req.session.destroy(function(err){
        if (err)
        {
            res.end("error")
        }else{
            logout=true
            res.redirect('/')
        }
    })
   
})

//clearing invalid message 

router.get('/login', (req,res)=>
{


    if(req.session.user)
    {
        res.redirect('/homepage')
    }else if (invaliduser)

    {   
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('loginpage',{title: "login" , msg:"Invalid Credentials" , color: "color: red;"})

        invaliduser=false
    }else
    {   
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.render('loginpage',{title: "login" , msg:"" , color: "color: green;"}) 
    } 
   
})



module.exports= router

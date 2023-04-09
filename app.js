const express=require("express");
const bodyParser=require("body-parser")
const path=require("path");
const https=require("https");

const app=express()
app.use(express.static(__dirname + '/public'));
app.use("/css",express.static("css"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){
    console.log(req.body);
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;

    const data={
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    };

    const jsonData=JSON.stringify(data);
    const url='https://us21.api.mailchimp.com/3.0/lists/4bfa34a282/members';

    const options={
        method: "POST",
        auth: "haripriya1:821c108c5f85218db74516a5b7efe542-us21"
    }

    const request=https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server listening at port 3000")
})


//API keys
//app123token456newsletter
//821c108c5f85218db74516a5b7efe542-us21

//Audience list ID
//4bfa34a282


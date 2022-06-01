const express=require("express")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const res = require("express/lib/response")

var app=express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"  ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

    var recipeModel=mongoose.model("recipes",
    new mongoose.Schema(
        {
            recipe:String,
            category:String,
            description:String,
            preparedby:String
        }
    )
    
    )

    mongoose.connect("mongodb+srv://Vaisakh:Vaisakhg30@cluster0.wuzuuwe.mongodb.net/recipeDB")

    app.post("/api/addrecipe",(req,res)=>{
        var data=req.body
        let ob=new recipeModel(data)
        ob.save(
            (error,data)=>{
                if (error){
                    res.send({"status":"error"})
                }
                else{
                    res.send({"ststus":"success","data":data})
                }
            }
        )


    })
    app.get("/api/recview",(req,res)=>{
        recipeModel.find((error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send(data)
            }


        }


        )


    })

    app.post("/api/recsearch",(req,res)=>{
        var gettitle=req.body
        recipeModel.find(gettitle,(error,data)=>{
            if(error)
            {
                res.send({"status":"ërror"})
            }
            else{
                res.send(data)
            }


        })


    })
    app.post("/api/recdelete",(req,res)=>{
        var getid=res.body
        recipeModel.findByIdAndRemove(getid,(error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else{
                res.send({"status":"success","data":data})
            }

        }
            
        )


    })
    app.listen(4008,()=>{
        console.log("sever running")

    })
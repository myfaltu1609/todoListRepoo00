var express=require("express")
var app=express()
var port=4000
var DataBaseUrl="mongodb+srv://karangoel1613:3iUcfldEPGzoFOly@hahaamyprojecttclusterr.mfmrfmw.mongodb.net/?retryWrites=true&w=majority"
var MongoClient= require("mongodb").MongoClient;
var path=require("path");



// var _s="build//index.html"

// var htmlFileLoc=path.join(__dirname,_s);
var dataBaseName="todoDataBase";
var todDataBaseUserCollName="todoDataBaseUserColl";
var todDataBaseDataCollName="todoDataBaseDataColl";
var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
var client=new MongoClient(DataBaseUrl);
var userCollection=0;
var dataCollection=0;

async function setDbColl()
{
   var result= await client.connect();
   var db=result.db(dataBaseName);
   userCollection=db.collection(todDataBaseUserCollName);
   dataCollection=db.collection(todDataBaseDataCollName);
   console.log("dbColls are assigned");


}

app.use(express.static(path.join(__dirname, 'build')));
// app.get("/",(req,res)=>
// {
//     res.sendFile(path.join(__dirname,"index.html"));
// })

app.post("/t",(req,res)=>
{
    console.log("server test console got ");
    console.log(req.body);
    res.send({"giftFromBack":10000});
})


// app.get("/",(req,res)=>
// {
//     console.log("/ works");
//     res.send("hello world");
    
// });


// app.get("/b1", async (req,res)=>
// {
//     // find length

//     var r= await userCollection.find({}).toArray()
//     console.log(r);
//     console.log(r.length);
//     res.send("done");


// });


// app.get("/b2", async (req,res)=>
// {
//     // push data

//     var _data={"userId":1};
//     var r= await userCollection.insertOne(_data);
//     console.log("inseted");
//     res.send("done");
// });


// app.get("/b3", async (req,res)=>
// {
//     // del data

//     var _data={"userId":1};
//     var r= await userCollection.deleteOne(_data);
//     console.log("deleted");
//     res.send("done");
// });

// app.get("/b4", async (req,res)=>
// {
//     // del all

//     var _data={};
//     var r= await userCollection.deleteMany(_data);
//     console.log("deleted");
//     res.send("done");
// });



// app.get("/a1",(req,res)=>
// {
//     var _obj={"a":1,"b":[1,2,3]};
//     var _objStr=JSON.stringify(_obj);

//     var _objAg=JSON.parse(_objStr);
//     console.log(_obj);
//     console.log(_objStr);
//     console.log(_objAg);    
//     res.send("he");
// });

// app.post("/about",(req,res)=>
// {
//     console.log(req.body);
//     res.send({"a":1,"port":port});
// });


// app.get("/aboute",(req,res)=>
// {
//     console.log(req.body);
//     res.send({"a":1,"port":port});
// });


// app.get("/db1",(req,res)=>
// {
//     // getData();
//     res.send("for db query");
// });

// from here genuine todo codes



app.post("/sN",async (req,res)=>
{
    console.log("sN is called");
    var _r= await userCollection.find({}).toArray();
    var _newId=_r.length;
    await userCollection.insertOne({"userId":_newId});
    console.log("user inserted");
    res.send({"userId":_newId});

});




app.post("/sL",async (req,res)=>
{
     console.log("have some eroor");
    var _userId=req.body.userId;
    console.log("_userId is ",_userId);
    var _arrDb= await dataCollection.find({"userId":_userId}).sort({"sno":1}).toArray();
    console.log("we sended",_arrDb);
    res.send(_arrDb);
});
app.post("/dA", async (req,res)=>
{
    await dataCollection.deleteMany({"userId":req.body.userId});
    console.log("dataBase del all");

});

app.post("/sub", async (req,res)=>
{
    
    await dataCollection.deleteOne({"userId":req.body.userId,"sno":req.body.sno});
    console.log("sub one");
});


app.post("/add",async (req,res)=>
{
    console.log(req.body);
    var _toInsert={"userId":req.body.userId,"sno":req.body.sno,
    "title":req.body.title,"desc":req.body.desc};
    console.log(_toInsert);
    await dataCollection.insertOne(_toInsert);
    console.log("add one")
    res.send({"a":1});
});


setDbColl();

app.listen(port);
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(function(req, res, next){
    res.header('Content-Type', 'application/json',);
    res.header('Access-Control-Allow-Credentials','true',);
    res.header("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
var sqlCon = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'annualpyramid',
    multipleStatements:true
});
sqlCon.connect((err) => {
    if(!err)
        console.log('Connected');
    else
        console.log('Connection failed \n err : '+ JSON.stringify(err,undefined,2));
});
console.log("hello database");
app.listen(3000,() => console.log('Express server is running at port number : 3000'));
app.get('/sbuTable',(req, res) => {
    sqlCon.query("CALL getSbus()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/clusterTable',(req, res) => {
    sqlCon.query("CALL getCluster()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/customerTable',(req, res) => {
    sqlCon.query("CALL getCustomers()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/componentTable',(req, res) => {
    sqlCon.query("CALL getComponents()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/bandTable',(req, res) => {
    sqlCon.query("CALL getBands()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/monthTable',(req, res) => {
    sqlCon.query("CALL getMonths()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/annualreportTable',(req, res) => {
    sqlCon.query("CALL getAnnualReports()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/arcTable',(req, res) => {
    sqlCon.query("CALL getArcs()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/attritionTable',(req, res) => {
    sqlCon.query("CALL getAttrition()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/promotionTable',(req, res) => {
    sqlCon.query("CALL getPromotion()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/aafdTable',(req, res) => {
    sqlCon.query("CALL getAafd()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});
app.get('/jpTable',(req, res) => {
    sqlCon.query("CALL getJoiningPipe()", (err, rows, fields) => {
    if(!err)
        res.send(rows);
    else
        console.log(err);
    })
});

//stored procedure for inserting a record into AnnualReports
app.post('/annualreportpost',(req, res) => {
    console.log("req id",req.body.id);
    sqlCon.query("CALL PutPostRecord('"+req.body.id+"','"+req.body.sbuid+"','"+req.body.clusterid+"','"+req.body.customerid+"','"+req.body.componentid+"','"+req.body.bandid+"','"+req.body.monthid+"','"+req.body.HC+"');",function(err, result, fields){
    if(err)
        res.send(err);
    if(result!=null)
    {
        console.log("result",result);
        res.send(result);
    }
    else
    {
        res.json({msg:"not inserted"});
    }
    })
});

// app.post('/annualreportpost',(req, res) => {
//     var sql="SET @id=?;SET @customerid=?;SET @bandid=?;SET @monthid=?;SET @HC=?;SET @arcValue=?;SET @componentid=?;\
//     CALL NewRecordToAR(@_id,@custid,@bid,@mid,@hc,@arc,@cmptid);";
//     sqlCon.query(sql,[req.body.id,req.body.customerid,req.body.bandid,req.body.monthid,req.body.HC,req.body.arcValue,req.body.compnentid], (err, rows, fields) => {
//     if(!err)
//     {
//         rows.forEach(element => {
//             if(element.constructor==Array)
//                 res.send(element[0].id);
//         });
//         //res.send(rows);
//     }   
//     else
//         console.log(err);
//     })
// });

//updating a record
// app.put('/annualreportpost',(req, res) => {
//     var sql="SET @id=?;SET @sbuid=?;SET @clusterid=?;SET @customerid=?;SET @componentid=?;SET @bandid=?;SET @monthid=?;SET @HC=?;\
//     CALL NewRecordToAR(@id,@sbuid,@clusterid,@customerid,@componentid,@bandid,@monthid,@HC);";
//     sqlCon.query(sql,[req.body.id,req.body.sbuid,req.body.clusterid,req.body.customerid,req.body.componentid,req.body.bandid,req.body.monthid,req.body.HC], (err, rows, fields) => {
//     if(!err)
//     {
//         res.send("updated successfully");
//     }   
//     else
//         console.log(err);
//     })
// });

//procedure for retrieving a particular record
app.get('/annualreport/:id',(req,res)=>{
    let id=req.params.id
    sqlCon.query("CALL getPostedRecord('"+id+"')",(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
})

//stored procedure for inserting a record into RevGrowth
app.post('/PostRGrowth',(req, res) => {
    sqlCon.query("CALL NewRecordToRevGrowth('"+req.body.id+"','"+req.body.sbuid+"','"+req.body.clusterid+"','"+req.body.customerid+"','"+req.body.componentid+"','"+req.body.rgrowth+"');",function(err, result, fields){
    if(err)
        res.send(err);
    if(result!=null)
    {
        console.log("result",result);
        res.send(result);
    }
    else
    {
        res.json({msg:"not inserted"});
    }
    })
});


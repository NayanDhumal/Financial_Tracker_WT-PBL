express = require("express");
app = express();

app.get("/",(req,res)=>{
    res.send("Hii from Nayan");
});


app.listen(3000,()=>{
    console.log("server is running on prot localhost:3000");
});
const app = require("./index");
const connect = require("./configs/db");
const PORT =  5000; //5656
app.listen(PORT, async () => {
    try{
        await connect();
        console.log(`listening on port ${PORT}`)
    }
    catch(err){
        console.log(err.message);
    }
}); 
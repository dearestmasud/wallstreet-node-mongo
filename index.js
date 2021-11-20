const { MongoClient } = require('mongodb');


const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

//data base connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oan01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//database main function 
async function main(){
    try{
        await client.connect();
        const database = client.db('masudDB');
        const languageCollection = database.collection('wallstreet');

        //GET API
        app.get('/services',async(req,res)=>{
            const cursor = languageCollection.find({});
            const datas = await cursor.toArray();
            res.send(datas);
        })
    }

    finally{
        // await client.close();
            }
}
main().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Wall-street server running');
})

app.listen(port,()=>{
    console.log('server is running on ',port);
})
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const _PORT = 3000
const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: 'First51830694',
    database: 'DBFOR_PERSON',
    server: 'MOEMENPC\\INSTANCE_2K19_1',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000 
    },
    options: {
      encrypt: false,
      trustServerCertificate: false 
    }
  }



app.post('/AddPerson', async function (req, res) { //you should put async fro function because you are calling this api from another place 
    var info = await Post_data_into_DB(req.body)
    res.send(info)
})



const Post_data_into_DB = async (data) => {
  const _INSERT_QUERY = `INSERT INTO [Table_FOR_PERSON] ([NAME],[COUNTRY_ID]) VALUES ('${data.NAME}',${data.COUNTRY_ID})`
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query(_INSERT_QUERY)
    } catch (err) {
     console.log(err);
    }
    finally { 
       sql.close()
    }
   }

app.listen(_PORT)
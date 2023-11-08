const sql = require('mssql')
const sqlConfig = {
  user: 'sa',
  password: 'First51830694',
  database: 'DBFOR_PERSON',
  server: 'MOEMENPC\\INSTANCE_2K19_1',
  pool: {
    max: 10,  //it managing how many connection at th same time will be serve
    min: 0,
    idleTimeoutMillis: 30000 //the time that the account will be disconnect after not running
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

const ConnectToDataBase = async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from Table_FOR_PERSON`

//console.dir(result)

//console.log(result.recordset);

  if (result != null) {
    if (result.recordset != null) {
        result.recordset.forEach(row => {
            console.log(row.NAME);
        });
    }
  }

  sql.close()     // you should always close ther connection of databse for saving the running of hard disk and cpu of any pc
  
 } catch (err) {
  console.log(err);
//   sql.close();  // always aslo you should close in the error the comnnection 
 }
 finally { //this a code that will be exucted in all cases 
    sql.close()
 }
}

ConnectToDataBase();
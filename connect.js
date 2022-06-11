let mysql = require("mysql");
const util = require("util");

// Server=MYSQL5044.site4now.net
// Database=db_a5645d_logmon
// User ID=a5645d_logmon
// Password= P@ssw0rd

function makeDb() {
  const connection = mysql.createPool({
    host: "MYSQL5044.site4now.net",
    user: "a5645d_logmon",
    password: "P@ssw0rd",
    database: "db_a5645d_logmon",
  });
  
  // const connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "monitor",
  // });


  // connection.connect(function (err) {
  //   if (err) {
  //     return console.error("error: " + err.message);
  //   }

  //   let createVisits = `create table if not exists visits(
  //     id int primary key auto_increment,
  //     created_at datetime not null default CURRENT_TIMESTAMP,
  //     timestamp datetime not null default CURRENT_TIMESTAMP,
  //     responseDuration bigint(20) default 0 ,
  //     successful tinyint(1) not null default 0
  // )`;

  // connection.query(createVisits, function(err, results, fields) {
  //   if (err) {
  //     console.log(err.message);
  //   }
  // });

    
  // });
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

const db = makeDb();

const getAll = async () => {
  try {
    const rows = await db.query(
      "SELECT * FROM visits ORDER BY timestamp DESC LIMIT 100"
    );
    return rows;
  } catch (err) {
    if (err) throw err;
    await db.close();
   
   
  } 
  // finally {
  //   await db.close();
  // }
};

const insert = async (timestamp, successful, responseDuration) => {
  try {
    await db.query(
      "INSERT INTO visits SET ?",
      { timestamp, successful, responseDuration })
  } catch (err) {
    if (err) throw err;
    await db.close();
    
  }  
  // finally {
  //   await db.close();
  // }
  // db.query(
  //   "INSERT INTO visits SET ?",
  //   { timestamp, successful, responseDuration },
  //   (err, res) => {
  //     if (err) throw err;

  //     console.log("Last insert ID:", res.insertId);
  //   }
  // );
};

module.exports = { getAll, insert };

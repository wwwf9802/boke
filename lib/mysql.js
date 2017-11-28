var mysql = require('mysql');
var config = require('../config');
var pool = mysql.createPool({
    host: config.dataBase.HOST,
    user: config.dataBase.USERNAME,
    password: config.dataBase.PASSWORD,
    database: config.dataBase.DATABASE
});

//数据库查询方法
let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log("建立数据库连接失败");
                reject(err)
            } else {

                console.log("连接数据库成功");

                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        console.log("sql执行失败");
                        reject(err)
                    } else {
                        console.log("sql执行成功");
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}
//建表方法
let createTable = function( sql ) {
    return query( sql, [] )
  }

  

//使用数据库
console.log(123123123);

//建表sql
let test =
    `create table if not exists testtb(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     age VARCHAR(40) NOT NULL,
     sex VARCHAR(40) NOT NULL,
     PRIMARY KEY ( id )
    );`

let login =
    `create table if not exists login(
     id INT NOT NULL AUTO_INCREMENT,
     uname VARCHAR(40) NOT NULL,
     pwd VARCHAR(40) NOT NULL,
     PRIMARY KEY ( id )
    );`
//建表
 createTable(login);



// 注册用户
let insertPerson = function( value ) {
    let _sql = "insert into testtb(name,age,sex) values(?,?,?);"
    return query( _sql, value)
  }

let findPerson=function (name){
    // let _sql=`select * from testtb
    //         where name="${name}"
    // `
    let _sql=`select * from testtb
    `


    return query(_sql);
}


let delPerson = function(id){
    let _sql=`delete from testtb where id = ${id}`
    return query(_sql)
  }

module.exports={
    findPerson,
    insertPerson,
    delPerson
}

  
  //insertPerson(['殷浩楠','28','男']);
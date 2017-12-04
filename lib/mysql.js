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

let loginfrom =
    `create table if not exists login(
     id INT NOT NULL AUTO_INCREMENT,
     uname VARCHAR(40) NOT NULL,
     pwd VARCHAR(40) NOT NULL,
     PRIMARY KEY ( id )
    );`
//建表
let playlist=
`create table if not exists playlist(
    main INT NOT NULL AUTO_INCREMENT,
    id VARCHAR(40) NOT NULL,
    name VARCHAR(40) NOT NULL,
    author VARCHAR(40) NOT NULL,
    creatTime VARCHAR(40) NOT NULL,
    PRIMARY KEY ( main )
   );`

let song=
`create table if not exists song(
    main INT NOT NULL AUTO_INCREMENT,
    id VARCHAR(40) NOT NULL,
    songName VARCHAR(40) NOT NULL,
    singer VARCHAR(40) NOT NULL,
    src VARCHAR(100) NOT NULL,
    album VARCHAR(40) NOT NULL,
    PRIMARY KEY ( main )
   );`

let playlistAndSong=
`create table if not exists playlistAndSong(
    main INT NOT NULL AUTO_INCREMENT,
    playlistId VARCHAR(40) NOT NULL,
    songId VARCHAR(40) NOT NULL,
    PRIMARY KEY ( main )
   );`



//登录
 let login = function( uname ) {
    let _sql=`select * from login
            where uname="${uname}"
    `
    return query( _sql, uname)
  }
//注册
  let register = function( uname,pwd ) {
    let _sql="insert into login(uname,pwd) values(?,?);"
    return query( _sql, uname)
  }


//增
let insertPerson = function( value ) {
    let _sql = "insert into testtb(name,age,sex) values(?,?,?);"
    return query( _sql, value)
  }
//查
let findPerson=function (name){
    let _sql=`select * from testtb
    `
    return query(_sql);
}

//删
let delPerson = function(id){
    let _sql=`delete from testtb where id = ${id};`
    return query(_sql)
  }
//获取歌单信息

let getlist = function(id){
    let _sql=`select * from playlist where id ='${id}';`
    return query(_sql)
  }

//获取歌单ID里的全部歌曲
  let getlistSongs = function(id){
    let _sql=`select s.* from song s,playlistandsong p where s.id=p.songId and p.playlistId='${id}';`
    return query(_sql)
  }

module.exports={
    findPerson,
    insertPerson,
    delPerson,
    login,
    register,
    getlist,
    getlistSongs
}

  
  //insertPerson(['殷浩楠','28','男']);
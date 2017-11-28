// var path=require('path');

const config={
    port:3456,
    //数据库配置
    dataBase:{
        DATABASE:'nodesql',
        USERNAME:'root',
        PASSWORD:'123456',
        PORT:'3306',
        HOST:'localhost'
    }
}

// console.log(2222222);
// console.log(path.resolve(__dirname,'/a','/b','c','d'));
// console.log(path.join(__dirname,'../a','b','c','d'));



module.exports=config;
var Koa=require('koa');
var path=require('path');
var bodyPaser=require('koa-bodyparser');
var ejs=require('ejs');
var session=require('koa-session-minimal');
var mySqlStore=require('koa-mysql-session');
var config=require('./config');
var router=require('koa-router');
var views=require('koa-views');
var koaStatic=require('koa-static');
var app=new Koa();


var sqlfuns=require('./lib/mysql.js');


//console.log(JSON.stringify(config));

// session存储配置

const sessionMysqlConfig={
    user:config.dataBase.USERNAME,
    password:config.dataBase.PASSWORD,
    dataBase:config.dataBase.DATABASE,
    host:config.dataBase.HOST
}


//配置 session 中间件
// app.use(session({
//     key:'USER_SID',
//     store:new mySqlStore(sessionMysqlConfig)
// }))



console.log(__dirname);
console.log(path.join(__dirname,'./static'));
console.log(path.resolve(__dirname,'./static'));
//配置静态资源加载 中间件
app.use(koaStatic(
    path.join(__dirname,'./static')
));

//app.use(express.static('static'));


// //配置服务模板渲染引擎中间件
// app.use(views(
//     path.join(__dirname,'./views'),
//     {extension:'ejs'}
// ));

// //使用表单解析中间件
app.use(bodyPaser());

//路由

app.use(async(ctx, next) => {
    //ctx.response.type = 'text/html';
    //ctx.response.body = '<h1>Hello, koa2!</h1>';
    await next();
});


// app.use(async (ctx, next) => {
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>殷浩楠</h1>';
//     await next();
    
// });


app.use(require('./routes/test.js').routes());

app.listen(5555,function(){
    console.log("success");
});


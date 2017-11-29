var router = require('koa-router')();
var sqlfuns=require('../lib/mysql');
var check=require('./check.js');



router.get('/yhntest/login',async(ctx, next) => {

    var uname=ctx.query.uname;
    var pwd=ctx.query.pwd;
    console.log(uname);
    console.log(pwd);
    if(!uname||!pwd){
        ctx.body={
            status:false,
            info:"请求参数有误！"
        }
        return
    }

    await sqlfuns.login(uname)
        .then(result => {
            let sqlData=JSON.stringify(result);
            let data=JSON.parse(sqlData)[0];
            if(data&&data.pwd&&data.pwd==pwd){
                let timeNow=new Date().getTime();
                let option={
                    domain: 'localhost',
                    path: '/',
                    maxAge:60*1000,
                    httpOnly: true,
                    overwrite: false
                }; 
                ctx.cookies.set('loginFlag',"true",option); 

                ctx.body={
                    status:true,
                    info:"登录成功" 
                }
            }else{
                ctx.body={
                    status:false,
                    info:"账户名或密码错误!"
                }
                
            }
            //ctx.body = JSON.parse(jsonData);
        });
});



router.post('/yhntest/register',async(ctx, next) => {
    let uname=ctx.request.body.uname;
    let pwd=ctx.request.body.pwd;
    if(!uname||!pwd){
        ctx.body={
            status:false,
            info:"请输入正确的参数"
        }
        return
    }

    let sqlData=await sqlfuns.login(uname)
    let arr=JSON.parse(JSON.stringify(sqlData));
    console.log(123456);
    console.log(arr);
    if(arr.length){
        ctx.body={
            status:false,
            info:"账号已存在！"
        }
        return
    }

    await sqlfuns.register([ctx.request.body.uname,ctx.request.body.pwd])
        .then(result => {
            console.log(2222222);
            console.log(JSON.stringify(result));
            ctx.body={
                status:true,
                info:"注册成功"
            }
        }).catch(err=>{
            ctx.body={
                status:false,
                info:"数据库操作出错"
            }
        });
});


router.get('/yhntest/findAll',async(ctx, next) => {
    console.log(ctx.request.body);
    if(check.guoqi(ctx)){
        return
    }
    //var name=ctx.cookies.get('name',{});
   //await sqlfuns.findPerson(ctx.request.body.name)
    await sqlfuns.findPerson()
        .then(result => {
            let jsonData=JSON.stringify(result);
            ctx.body = JSON.parse(jsonData);
        });
});


router.post('/yhntest/insertPerson',async(ctx, next) => {
    console.log(ctx.request.body);

    if(ctx.request.body.name&&ctx.request.body.age&&ctx.request.body.sex){
        
        let arr=[ctx.request.body.name,ctx.request.body.age,ctx.request.body.sex];
         await sqlfuns.insertPerson(arr)
        .then(result => {
            console.log("插入成功"+JSON.stringify(ctx.request.body));
            let data={
                status:true,
                info:"插入数据库成功"
            }
            //ctx.body = JSON.parse(jsonData);
            console.log("返回数据"+JSON.stringify(data));
            ctx.body=data;
        }).catch(err=>{
            console.log(err);
            let data={
                status:false,
                info:"插入数据失败",
                msg:JSON.stringify(err)
            }
            ctx.body=data;
        })
    }
   //await sqlfuns.findPerson(ctx.request.body.name)
});


router.post('/yhntest/delPerson',async(ctx, next) => {
    
    console.log(ctx.request.body);
    if(ctx.request.body.id){
        let id=ctx.request.body.id;
        await sqlfuns.delPerson(id)
        .then(result => {
            console.log("删除成功id:::"+id);
            let data={
                status:true,
                info:"删除成功"
            }
            //ctx.body = JSON.parse(jsonData);
            ctx.body=data;
        }).catch(err=>{
            console.log(err);
            let data={
                status:false,
                info:"删除失败",
                msg:JSON.stringify(err)
            }
            ctx.body=data;
        })
    }else{
        let data={
            status:false,
            info:"请求参数有误！",
        }
        ctx.body=data;
    }
   //await sqlfuns.findPerson(ctx.request.body.name)
});




// router.get('/home', async(ctx, next) => {
//     console.log(ctx.request.query)
//     console.log(ctx.request.querystring)
//     let str=`<h1 style="color:red">${JSON.stringify(ctx.request.query)}</h1>`
//     ctx.response.type = 'text/html';
//     ctx.response.body = str
// });

module.exports=router
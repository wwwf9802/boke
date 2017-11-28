var router = require('koa-router')();
var sqlfuns=require('../lib/mysql');
router.post('/yhntest/findAll',async(ctx, next) => {
    console.log(ctx.request.body);
    var name=ctx.cookies.get('name',{});
    console.log("ccccccccccccc");
    console.log(name);
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
        console.log(111111111111);
        console.log(id);
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
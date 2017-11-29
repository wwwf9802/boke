module.exports={
    guoqi:function(ctx){
        var loginFlag=ctx.cookies.get('loginFlag');
        console.log("loginFlag:"+loginFlag);
        let option={
            domain: 'localhost',
            path: '/',
            maxAge:60*1000,
            httpOnly: true,
            overwrite: false
        };
        if(loginFlag==="true"){
            ctx.cookies.set('loginFlag',"true",option);
            console.log(1111111111);
            return false
        }else{
            ctx.body={
                status:false,
                code:0000,
                info:'登录已过期，请重新登录！'
            }
            console.log(22222222222);
            return true
        }
    }
}
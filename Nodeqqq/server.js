let path = require('path');
let fs = require('fs');
let url = require('url');
let http = require('http');
let querystring = require('querystring');
let util = require('util');
let PORT = 9999;
let {readFile,writeFile,appendFile} = require('./utils/fsPromise.js');


http.createServer((request,response)=>{
    let {pathname,query} = url.parse(request.url,true);
    console.log(pathname)
    if (pathname === '/') {
        readFile('./static/index.html').then(data=>{
            response.end(data)
        }).catch(err=>{
            response.statusCode = 500;
            response.statusMessage = 'hhhhh';
            response.end('error')
        })
    } else {
        if (/\.\w+/.test(pathname)) {
            readFile('./static' + pathname).then(data=>{
                response.end(data)
            }).catch(err=>{
                response.statusCode = 500;
                response.statusMessage = 'hhhhh';
                response.end('error')
            })
        } else {
            if (pathname === '/list') {
                readFile('./static'+ pathname +'.json').then(data=>{
                    response.end(data)
                })
            }
            if (pathname === '/add') {
                // 定义了一个post变量，用于暂存请求体的信息
                let post = '';
                // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                request.on('data', function (chunk) {
                    post += chunk;
                });
                // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                request.on('end', function () {
                    post = querystring.parse(post);
                    //response.end(util.inspect(post));
                });
                
                readFile('./static/list.json').then(data=>{
                    data = JSON.parse(data);
                    if (post.val) {
                        data.push(post.val)
                    }
                    writeFile('./static/list.json',JSON.stringify(data)).then(data=>{
                        response.end(JSON.stringify({msg:'0',status:'ok'}))
                    })
                })
            //////////////////////////get请求获取参数方式    ///
                // console.log(query.val)
                // readFile('./static/list.json').then(data=>{
                //     data = JSON.parse(data);
                //     if (query.val) {
                //         data.push(query.val)
                //     }
                //     writeFile('./static/list.json',JSON.stringify(data)).then(data=>{
                //         response.end(JSON.stringify({msg:'0',status:'ok'}))
                //     })
                // })
                
            }
            if (pathname === '/dele') {
                readFile('./static/list.json').then(data=>{
                    data = JSON.parse(data);
                    data.forEach((ele,i)=> {
                        if (ele === query.del) {
                            data.splice(i,1)
                        }
                    });
                    writeFile('./static/list.json',JSON.stringify(data)).then(data=>{
                        response.end(JSON.stringify({msg:'0',status:'ok'}))
                    })
                })
            }
            
        }
        
    }
    
}).listen(PORT,()=>{
    console.log(`服务已经启动，端口号是${PORT}`)
})

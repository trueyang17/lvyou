let fs = require('fs');
let path = require('path');
let dirname = path.resolve();


['mkdir','rmdir','readdir','readFile','copyFile','unlink'].forEach(item =>{
    exports[item] = function (pathName,copyPath = ''){
        pathName = path.resolve(dirname,pathName);
        copyPath = path.resolve(dirname,copyPath);
        return new Promise((res,rej) =>{
            let arg = [
                (err,result) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    res(result || '');
                }
            ];
            if (item === 'readFile') {
                if (!/(jpg|jpeg|svg|png|bmp|gif|ico|eot|ttf|woff|mp3|mp4|ogg|wav|m4a|wmv|avi)$/i.test(pathName)) {
                    arg.unshift('utf8')    
                }  
           
            };
            item === 'copyFile' ? arg.unshift(copyPath) : null;
            fs[item](pathName,...arg)
        })    
    }
});


['writeFile','appendFile'].forEach(item => {
    exports[item] = function (pathName,content) {
        pathName = path.resolve(dirname,pathName);
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        return new Promise((res,rej) =>{
            fs[item](pathName,content,'utf8',(err) =>{
                if (err) {
                    rej(err);
                    return
                }
                res()
            })
        })
    }
})



// exports.readdir = function (pathName){
//     pathName = path.resolve(dirname,pathName);
//     return new Promise((res,rej) =>{
//         fs.readdir(pathName,(err,result) => {
//             if (err) {
//                 rej(err);
//                 return;
//             }
//             res(result);
//         })
//     })    
// }

// exports.readFile = function (pathName) {
//     pathName = path.resolve(path.resolve(),pathName);
//     return new Promise((res,rej) =>{
//         fs.readFile(pathName, 'utf8',(err, data) => {
//             if (err){ 
//                 rej(err)
//                 return
//             }
//             res(data)
//           });
//     })
// };


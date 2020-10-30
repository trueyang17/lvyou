let path = require('path'),
    fs = require('fs');
let dirname = path.resolve();
/**
 * mkdir 创建文件夹
 * rmdir 删除文件夹
 * 
 */
['mkdir','rmdir','readdir','readFile','copyFile','unlink'].forEach( item => {
    exports[item] = function (pathName,copyPath='') {
        pathName = path.resolve(dirname,pathName);
        copyPath = path.resolve(dirname,copyPath);
        return new Promise( (res,rej) => {
            let arg = [ (err,result) => {
                if (err) {
                    rej(err);
                    return
                }
                res(result || '')
            }]
            item === 'readFile' ? arg.unshift('utf8') : null;
            item === 'copyFile' ? arg.unshift(copyPath) : null;
            fs[item](pathName,...arg);
        })
    }
});

['writeFile','appendFile'].forEach( item => {
   exports[item] = function (pathName,content='') {
        pathName = path.resolve(dirname,pathName);
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        };
        return new Promise( (res,rej) => {
            let arg = [(err)=>{
                    if (err) {
                        console.log(err);
                        return;
                    };
                    res()
                }
            ];
            console.log(arg)           
            fs[item](pathName,content,'utf8',...arg)
        })
    }
})
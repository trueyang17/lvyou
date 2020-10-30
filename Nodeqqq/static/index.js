
btn.onclick = function () { 
    let val = inp.value;
    let xhr = new XMLHttpRequest();
    //xhr.open('get','/add?val='+val);
    xhr.open('post','/add');
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            render()
        }
    }
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(`val=${val}`);
}

function render() {
    let xhr = new XMLHttpRequest();
    xhr.open('get','/list');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            let str = ``;
            JSON.parse(xhr.response).forEach(item=>{
                str += `<li>${item} <button id='del'>删除</button> </li>`
            })
            ul.innerHTML = str
            inp.value = '';
            let lis = ul.querySelectorAll('li');
            let btns = ul.querySelectorAll('button');
            btns.forEach((ele,i) => {
                ele.onclick = function () {
                    let txt = ele.previousSibling.nodeValue;
                    let xhr = new XMLHttpRequest();
                    xhr.open('get','/dele?del='+txt);
                    xhr.send()
                    ele.parentNode.remove()
                }    
            });   
        }
    }
    xhr.send()
}
render()

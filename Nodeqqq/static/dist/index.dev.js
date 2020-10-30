"use strict";

btn.onclick = function () {
  var val = inp.value;
  var xhr = new XMLHttpRequest(); //xhr.open('get','/add?val='+val);

  xhr.open('post', '/add');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      render();
    }
  }; //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");


  xhr.send("val=".concat(val));
};

function render() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', '/list');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var str = "";
      JSON.parse(xhr.response).forEach(function (item) {
        str += "<li>".concat(item, " <button id='del'>\u5220\u9664</button> </li>");
      });
      ul.innerHTML = str;
      inp.value = '';
      var lis = ul.querySelectorAll('li');
      var btns = ul.querySelectorAll('button');
      btns.forEach(function (ele, i) {
        ele.onclick = function () {
          var txt = ele.previousSibling.nodeValue;
          var xhr = new XMLHttpRequest();
          xhr.open('get', '/dele?del=' + txt);
          xhr.send();
          ele.parentNode.remove();
        };
      });
    }
  };

  xhr.send();
}

render();
var userName = document.getElementById("username"); // 账号
var password = document.getElementById("password"); // 密码

// 键盘
function keyboard() {
    // 当前事件获取
    var e = window.event || test.caller.arguments[0] // 获取event对象
    var el = e.target || e.srcElement; // 获取触发事件的源对象
    console.log(el.className)
    //获取当前事件的标签 判断当前的事件的标签是否为td，并且符合后面两个属性
    if (el.tagName.toLowerCase() == 'button') {
        var str = el.innerHTML;
        str = str;
        username.value += str; // 输入账号
    }
    // 删除
    if (el.tagName.className == "goback") {
        console.log(el.tagName.className)
        userName.value = userName.value.slice(0, -1) //截取1位
    }
    // 切换大小写
    if (el.className == "toUptoLow") {
        var els = document.getElementsByTagName("button");
        console.log(e)
        // 遍历每一个字母
        for (var i = 0; i < els.length; i++) {
            var str = els[i].innerHTML;
            if (/^[a-z]$/.test(str)) { // 验证函数 字母大小写：/^[a-z]$/.test(str)，/^[A-Z]$/.test(str)
                els[i].innerHTML = str.toUpperCase() // toUpperCase()方法用于把字符串转换为大写
            } else if (/^[A-Z]$/.test(str)) {
                els[i].innerHTML = str.toLowerCase();
            }

        }

    }
    // 回车键
    if (el.className == "enter") {
        ctrKeyboard(e)
    }
}
// 打开/关闭 键盘
function ctrKeyboard(e) {
    // console.log(e)
    var el = document.getElementById("keyboard")
    if (el.offsetWidth > 0) {
        el.style.display = "none"
    } else {
        el.style.display = "block"
    }
}

function loginBtn() {
    console.log("loginBtn")
    if (userName.value.length == 0) {
        alert("请输入账号");
        return;
    }
    if (password.value.length == 0) {
        alert("请输入密码");
        return;
    }
    alert("欢迎用户 " + userName.value + " 登录")
}
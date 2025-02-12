// 元素获取
var userName = document.getElementById("username"); // 账号
var password = document.getElementById("password"); // 密码
var keyboardType; // 变量键盘类型

// 特殊字符转换
function convHtmlStr(str) {
    var res =
        str
        .replace(/&nbsp;/g, " ")
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, "\"")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&copy;/g, "©");
    return res;
}

// 键盘事件
function keyboard() {
    // 当前事件获取
    var e = window.event || test.caller.arguments[0] // 获取event对象
    var el = e.target || e.srcElement; // 获取触发事件的源对象

    //获取当前事件的标签 判断当前的事件的标签是否为td，并且符合后面两个属性 --- 排除退格、切换大小、enter键盘
    if (el.tagName.toLowerCase() == 'td' && el.rowSpan <= 1 && el.colSpan <= 1) {
        var str = el.innerHTML;
        str = convHtmlStr(str) || str;
        // username.value += str; // 输入账号
        if (keyboardType == 1) {
            username.value += str; // 输入账号 
        } else {
            password.value += str; // 输入密码
        }
    }
    // 删除
    if (el.className == "goback") {
        console.log(el.className)
        if (keyboardType == 1) {
            userName.value = userName.value.slice(0, -1) //账号截取1位
        } else {
            password.value = password.value.slice(0, -1) //密码截取1位
        }
    }
    // 切换大小写
    if (el.className == "toUptoLow") {
        var els = document.getElementsByTagName("td");
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

function ctrKeyboard(e) {
    // console.log(e)
    var el = document.getElementById("keyboard")

    if (el.offsetWidth > 0 && e == keyboardType) {
        el.style.display = "none"
    } else {
        el.style.display = "block"
        if (e == 1) {
            userName.focus()
        } else {
            password.focus()
        }
        keyboardType = e;
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
    // 清空
    userName.value = ""
    password.value = ""
}
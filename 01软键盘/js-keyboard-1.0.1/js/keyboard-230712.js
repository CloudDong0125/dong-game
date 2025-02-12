class Keyboard {
    keyboardId = "keyboard";
    inputId = "";
    isOpen = false;
    constructor() {}
    //设置inputId
    setInputId(id) {
        this.inputId = id;
    }
    initKeyboard() {
        console.log("创建键盘")
        // 获取元素
        var loginGroup = document.getElementById("login-group")
        // 绘制元素
        var div = $('<div id="' + this.keyboardId + '"></div>')
        var table = $('<table cellspacing="5" style="width:20rem;table-layout:fixed;background: white;border: 1px solid #ccc; border-radius: 5px;"></table>');
        var tr2 = $('<tr><td >`</td><td class="num">1</td><td class="num">2</td><td class="num">3</td><td class="num">4</td> <td class="num">5</td><td class="num">6</td><td class="num">7</td><td class="num">8</td><td class="num">9</td><td class="num">0</td><td>-</td><td>=</td><td colSpan="2" width="" class="goback" id="goback" >退格</td></tr>')
        var tr3 = $('<tr><td colSpan="2" >tab</td></td><td>q</td><td>w</td><td>e</td><td>r</td><td>t</td><td>y</td><td>u</td><td>i</td> <td>o</td><td>p</td><td>{</td><td>}</td><td>\\</td>')
        var tr4 = $('<tr><td colSpan="2" class="toUptoLow">capslock</td><td>a</td><td>s</td><td>d</td><td>f</td><td>g</td><td>h</td><td>j</td><td>k</td><td>l</td> <td>;</td> ><td>\'</td><td colspan="2"  class="enter">Enter</td></tr> ')
        var tr5 = $('<tr><td colSpan="2">Shift</td><td>z</td><td>x</td><td>c</td><td>v</td> <td>b</td><td>n</td><td>m</td><td><</td><td>></td> <td>?</td><td>,</td><td>.</td><td>/</td></tr>')
        var tr6 = $('<tr><td class="kou"></td></td><td colSpan="13" class="space">space</td><td class="kou"></td></tr>')
        table.append(tr2, tr3, tr4, tr5, tr6) // 追加元素

        $(table).find('tr:first').find('td').css('width', '1.4rem'); // 设置 tr 宽度
        $(table).find('tr:first').find('td:last').css('width', '2.6rem'); // 设置 退格 宽度

        // 设置样式
        $('#keyboard').css('display', 'none');

        $(table).find('td').css({
            color: "white",
            background: "black",
            border: "1px solid #ccc",
            padding: "4px",
            textAlign: 'center',
            border: 'none',
            cursor: 'pointer',
            margin: '5px',
            borderRadius: '5px',
            cursor: 'pointer'
        })

        $(table).find('.kou').css({
            "background": "white",
            "width": "5px"
        })

        $(table).find('tr').mouseover(function () {
            // $(this) jQuery 当前元素  this不要加引号
            // console.log(tr)
            $(this).children("td").css("background", ' rgb(234, 93, 42)');
        });
        // // 鼠标离开
        $(table).find('tr').mouseout(function () {
            // $(this) jQuery 当前元素  this不要加引号
            // console.log(tr)
            $(this).children("td").css();
        });

        div.append(table)
        $(loginGroup).append(div)
        this.clickKeyboard()
    }
    // 键盘事件
    clickKeyboard() {
        var keyboard = document.getElementById(this.keyboardId);
        console.log(keyboard)
        keyboard.addEventListener('click', () => {
            // console.log("111")

            // var target = document.getElementById(this.inputId); // 获取整个username/password的div
            // console.log(target)
            var target = $(this.inputId);
            console.log(target);

            // 当前事件获取
            var e = window.event || test.caller.arguments[0] // 获取event对象 event || window.event  用于IE
            var el = e.target || e.srcElement; // 获取触发事件的源对象

            //获取当前事件的标签 判断当前的事件的标签是否为td，并且符合后面两个属性 --- 排除退格、切换大小、enter键盘
            if (el.tagName.toLowerCase() == 'td' && el.rowSpan <= 1 && el.colSpan <= 1) {
                var str = el.innerHTML;
                str = this.convHtmlStr(str) || str; // 字符转换convHtmlStr()
                //target.value += str;  
                // 修改
                // console.log()
                let newStr = $(target).val() + str;
                $(target).val(newStr);

            }
            // 删除
            if (el.className == "goback") {
                // target.value = target.value.slice(0, -1) //截取1位
                let newStr = target.val().slice(0, -1);
                $(target).val(newStr)
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
            // 空格键
            if (el.className == "space") {
                alert("账号密码请勿输入空格！")
            }
            // 回车键
            if (el.className == "enter") {
                ctrKeyboard(e)
            }
        })
    }
    // 字符转换
    convHtmlStr(str) {
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
    };
    // 显示
    show() {
        this.isOpen = true;
        var el = document.getElementById(this.keyboardId);
        el.style.display = "block";
    };
    // 隐藏
    hide() {
        this.isOpen = false;
        var el = document.getElementById(this.keyboardId);
        el.style.display = "none";
    }
}

var keyboard = new Keyboard();
// 元素获取
var userName = document.getElementById("username"); // 账号
var password = document.getElementById("password"); // 密码

// 点击键盘的显示与隐藏
function ctrKeyboard(type) {
    // if (keyboard.isOpen && keyboard.inputId == type) {
    //     keyboard.hide();
    // } else {
    //     keyboard.show();
    //     if (type == "username") {
    //         userName.focus()
    //         keyboard.setInputId("username")
    //     } else {
    //         password.focus()
    //         keyboard.setInputId("password")
    //     }
    // }

    // keyboard.setInputId(type);
    // keyboard.show()
    if (keyboard.isOpen) {
        keyboard.hide()
        keyboard.setInputId(type)
    } else {
        keyboard.setInputId(type)
        keyboard.show();
    }
}

// 登录按钮
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
// 加载成功元素
window.addEventListener("DOMContentLoaded", function () {
    keyboard.initKeyboard();
});
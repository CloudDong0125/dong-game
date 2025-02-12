/**
 * 自定义键盘
 * @author sjz
 * @dateTime 2019-3-23
 */

// 引用键盘CSS样式
useCSS('css/keyBoard.css')
// 引用iconfont图标
useCSS('iconfont/iconfont.css')

// 初始化KeyBoard对象
var KeyBoard = {}
// 容器
var container
// 全屏遮罩
var mask
// 根节点
var rootElement
// 输出节点
var outputDom
// 输出节点类型
var outputDomType
// 设置是否在PC上显示，默认不显示
var PCDisplay = false
// 获取KeyBoard实例
var getKeyBoard = function () {
    // 初始化界面
    init()
    // 提供外部调用方法，设置输出Dom
    KeyBoard.setOutput = function (dom, type) { setOutputDom(dom, type) }
    // 提供外部调用方法，设置输出Dom的Id
    KeyBoard.setOutputById = function (domId, type) { setOutputDomId(domId, type) }
    // 提供外部调用方法，设置输出Dom的Class
    KeyBoard.setOutputByClass = function (domClass, type) { setOutputDomClass(domClass, type) }
    // 提供外部调用方法，显示键盘
    KeyBoard.show = function () { toggle(true) }
    // 提供外部调用方法，设置是否在PC端显示
    KeyBoard.setPCDisplay = function (flag) { PCDisplay = flag}
    // 绑定单击事件
    addClickEvent()
    // 设置点击键盘外隐藏键盘
    setClickOutSideHide(true)
    return KeyBoard
}
// 初始化界面
function init() {
    // 默认body
    container = document.body;
    var html = "<div class='mask'></div><div class='key-main hide'>"
    html += "<table>"
    html += "<tr>"
    html += "<td><div class='t-num btn'>35.</div></td>"
    html += "<td><div class='num btn'>1</div></td>"
    html += "<td><div class='num btn'>2</div></td>"
    html += "<td><div class='num btn'>3</div></td>"
    html += "<td><div class='prev btn'><i class='iconfont icon-prev'></i></div></td>"
    html += "</tr>"
    html += "<tr>"
    html += "<td><div class='t-num btn'>36.</div></td>"
    html += "<td><div class='num btn'>4</div></td>"
    html += "<td><div class='num btn'>5</div></td>"
    html += "<td><div class='num btn'>6</div></td>"
    html += "<td><div class='next btn'><i class='iconfont icon-next'></i></div></td>"
    html += "</tr>"
    html += "<tr>"
    html += "<td><div class='t-num btn'>37.</div></td>"
    html += "<td><div class='num btn'>7</div></td>"
    html += "<td><div class='num btn'>8</div></td>"
    html += "<td><div class='num btn'>9</div></td>"
    html += "<td><div class='del btn'><i class='iconfont icon-del'></i></div></td>"
    html += "</tr>"
    html += "<tr>"
    html += "<td><div class='t-num btn'>38.</div></td>"
    html += "<td><div class='num btn'>/</div></td>"
    html += "<td><div class='num btn'>0</div></td>"
    html += "<td><div class='num btn'>.</div></td>"
    html += "<td><div class='clear btn'>\u6e05\u7a7a</div></td>"
    html += "</tr>"
    html += "<tr>"
    html += "<td><div class='t-num btn'>39.</div></td>"
    html += "<td><div class='t-num btn'>40.</div></td>"
    html += "<td><div class='t-num btn'>41.</div></td>"
    html += "<td><div class='t-num btn'>42.</div></td>"
    html += "<td><div class='hide-keyboard btn'><i class='iconfont icon-hide-keyboard'></i></td>"
    html += "</tr>"
    html += "</table>"
    html += "<div>";
    container.innerHTML += html;
    mask = container.getElementsByClassName('mask')[0]
    rootElement = container.getElementsByClassName('key-main')[0]
}

// 设置输出DomClass
function setOutputDomClass(domClass, type) {
    outputDomType = type
    outputDom = container.getElementsByClassName(domClass)[0]
}
// 设置输出DomId
function setOutputDomId(domId, type) {
    outputDomType = type
    outputDom = document.getElementById(domId)
}
// 设置输出Dom
function setOutputDom(dom, type) {
    outputDomType = type
    outputDom = dom
}
// 显示/隐藏
function toggle(flag) {
    // 如果是电脑端则不显示
    if (!PCDisplay && isPC()) {
        return
    }
    if (flag) {
        rootElement.className = "key-main show"
        rootElement.style.display = "block"
        mask.style.display = "block"
    } else {
        rootElement.className = "key-main hide"
        setTimeout(function () { rootElement.style.display = "none" }, 500);
        mask.style.display = "none"
    }
}

// 绑定单击事件
function addClickEvent() {
    // 0-9数字、.、/原样输入
    var btnList = rootElement.getElementsByClassName("num")
    for (var i = 0; i < btnList.length; i++) {
        let btn = btnList[i]
        btn.onclick = function () {
            if (outputDom) {
                outputDom.value += btn.innerHTML
            }
        };
    }
    // 体温35.-42.单击时清空之前输入
    btnList = rootElement.getElementsByClassName("t-num")
    for (var i = 0; i < btnList.length; i++) {
        let btn = btnList[i]
        btn.onclick = function () {
            if (outputDom) {
                outputDom.value = btn.innerHTML
            }
        };
    }
    // 隐藏键盘
    var hideBtn = rootElement.getElementsByClassName("hide-keyboard")[0]
    hideBtn.onclick = function () {
        toggle(false)
    }
    // 清空
    var hideBtn = rootElement.getElementsByClassName("clear")[0]
    hideBtn.onclick = function () {
        if (outputDom) {
            outputDom.value = ""
        }
    }
    // 删除
    var hideBtn = rootElement.getElementsByClassName("del")[0]
    hideBtn.onclick = function () {
        if (outputDom) {
            var value = outputDom.value
            if (value.length > 0) {
                outputDom.value = value.substring(0, value.length - 1)
            }
        }
    }
    // 上一个
    var prevBtn = rootElement.getElementsByClassName("prev")[0]
    prevBtn.onclick = function () {
        setDomFocus('prev')
    }
    // 下一个
    var nextBtn = rootElement.getElementsByClassName("next")[0]
    nextBtn.onclick = function () {
        setDomFocus('next')
    }
}

// 切换焦点
function setDomFocus(moveFlag) {
    var elements
    if (outputDomType) {
        elements = container.getElementsByClassName(outputDomType)
    } else {
        elements = container.getElementsByTagName("input")
    }
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] == outputDom) {
            if (moveFlag == 'prev') {
                // 前一个且当前是第一个则直接返回
                if (i == 0) {
                    return
                }
                elements[i - 1].focus()
            } else {
                // 后一个且当前是最后一个
                if (i == elements.length - 1) {
                    return
                }
                elements[i + 1].focus()
            }
            break
        }
    }
}

// 设置单击键盘外，隐藏键盘
function setClickOutSideHide(flag) {
    if (flag) {
        mask.addEventListener("click", function () {
            toggle(false)
        });
        rootElement.addEventListener("click", function (event) {
            event = event || window.event;
            event.stopPropagation();
        });
    }
}


// 添加CSS样式
function useCSS(cssUrl) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = cssUrl;
    try {
        head.appendChild(css);
    } catch (ex) {
        console.log(ex);
    }
}
// 判断当前浏览器是PC还是移动端，返回true是PC，false是移动端
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
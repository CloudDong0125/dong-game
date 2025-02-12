
var ly_keyboard={
	result:null,	
	show:function(el,call){
		$('#ly_keyboard').remove();
		var div = $('<div id="ly_keyboard" style="position:absolute;width:40rem;height:12rem;left:0;right:0;top:0;bottom:0;margin:auto;background:#f0f0f0;padding:0.2rem;border:1px solid #000000;user-select:none;"></div>');
		$('body').append(div);
		
		var keys=[];
		keys.push({'c':'key','d1':'`','d2':null,'d3':'~','w':'2.4rem'});
		keys.push({'c':'key','d1':'1','d2':null,'d3':'!','w':'2.4rem'});
		keys.push({'c':'key','d1':'2','d2':null,'d3':'@','w':'2.4rem'});
		keys.push({'c':'key','d1':'3','d2':null,'d3':'#','w':'2.4rem'});
		keys.push({'c':'key','d1':'4','d2':null,'d3':'$','w':'2.4rem'});
		keys.push({'c':'key','d1':'5','d2':null,'d3':'%','w':'2.4rem'});
		keys.push({'c':'key','d1':'6','d2':null,'d3':'^','w':'2.4rem'});
		keys.push({'c':'key','d1':'7','d2':null,'d3':'&','w':'2.4rem'});
		keys.push({'c':'key','d1':'8','d2':null,'d3':'*','w':'2.4rem'});
		keys.push({'c':'key','d1':'9','d2':null,'d3':'(','w':'2.4rem'});
		keys.push({'c':'key','d1':'0','d2':null,'d3':')','w':'2.4rem'});
		keys.push({'c':'goback','d1':'退格','d2':null,'d3':null,'w':'4rem'});
		keys.push({'c':'toUptoLow','d1':'capslock','d2':null,'d3':null,'w':'5rem'});
		keys.push({'c':'key','d1':'a','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'s','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'d','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'f','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'g','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'h','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'j','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'k','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'l','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'enter','d1':'Enter','d2':null,'d3':null,'w':'4rem'});
		keys.push({'c':'Shift','d1':'Shift','d2':null,'d3':null,'w':'6rem'});
		keys.push({'c':'key','d1':'z','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'x','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'c','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'v','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'b','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'n','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'m','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':',','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'.','d2':null,'d3':null,'w':'2.4rem'});
		keys.push({'c':'key','d1':'/','d2':null,'d3':null,'w':'2.4rem'});
		
		
		$.each(keys,function(i,k){
			if (/^[a-z]$/.test(k.d1)) k.d2= k.d1.toUpperCase();
			if(k.c=='toUptoLow'||k.c=='Shift') $('#ly_keyboard').append('<br>');
			var divs=$('<div class="'+k.c+'" style="display:inline-block;width:'+k.w+';height:2rem;line-height:2rem;margin:0.2rem;background:black;color:white;border-radius:0.2rem;text-align:center;">'+k.d1+'</div>');
			$('#ly_keyboard').append(divs);
			$(divs).attr('d1',k.d1);
			$(divs).attr('d2',k.d2);
			$(divs).attr('d3',k.d3);
			
		});
		
       /* var table = $('<table cellspacing="5" style="width:36rem;table-layout:fixed;"></table>');

        // var tr1 = $('<tr><td>!</td><td>@</td><td>#</td><td>$</td><td>%</td><td>^</td><td>&</td><td>*</td><td>(</td><td>)</td><td>_</td><td>+</td><td>|</td></tr>')
        var tr2 = $('<tr><td >`</td><td class="num" >1</td><td class="num">2</td><td class="num">3</td><td class="num">4</td> <td class="num">5</td><td class="num">6</td><td class="num">7</td><td class="num">8</td><td class="num">9</td><td class="num">0</td><td>-</td><td>=</td><td colSpan="2" width="" class="goback" id="goback" >退格</td></tr>')
        var tr3 = $('<tr><td colSpan="2" >tab</td></td><td>q</td><td>w</td><td>e</td><td>r</td><td>t</td><td>y</td><td>u</td><td>i</td> <td>o</td><td>p</td><td>{</td><td>}</td><td>\\</td>')
        var tr4 = $('<tr><td colSpan="2" class="toUptoLow">capslock</td><td>a</td><td>s</td><td>d</td><td>f</td><td>g</td><td>h</td><td>j</td><td>k</td><td>l</td> <td>;</td> ><td>\'</td><td colspan="2"  class="enter">Enter</td></tr> ')
        var tr5 = $('<tr><td colSpan="2">Shift</td><td>z</td><td>x</td><td>c</td><td>v</td> <td>b</td><td>n</td><td>m</td><td><</td><td>></td> <td>?</td><td>,</td><td>.</td><td>/</td></tr>')
        var tr6 = $('<tr><td class="kou"></td></td><td colSpan="13" class="space">space</td><td class="kou"></td></tr>')
        table.append(tr2, tr3, tr4, tr5, tr6)
		
		$(table).find('tr:first').find('td').css('width','2.4rem');
        $(table).find('tr:first').find('td:last').css('width','4.8rem');
        div.append(table);
		*/
		
		console.log(keys);
		
		if(call!=null){
			this.func=call;
		}
		
		$('#ly_keyboard').find('.key').click(function(){
			var str = $(this).text();
            str = convHtmlStr(str) || str;  // 字符转换convHtmlStr()
			let x=$(el).val()+str;
			$(el).val(x) ; 
		});
		
		$('#ly_keyboard').find('.goback').click(function(){
			let x = $(el).val().slice(0, -1) //截取1位
            $(el).val(x) ;
		});
		
		$('#ly_keyboard').find('.toUptoLow').click(function(){
			var state=$(this).attr('state');
			if(state!=1){
				$.each($('#ly_keyboard').find('.key'),function(i,item){
					var d2=$(item).attr('d2');
					if(d2!=null&&d2!='null') $(item).text(d2);
				});
				$('#ly_keyboard').find('.toUptoLow').attr('state',1);
				$('#ly_keyboard').find('.toUptoLow').css('color','yellow');
			}
			else {
				$.each($('#ly_keyboard').find('.key'),function(i,item){
					var d1=$(item).attr('d1');
					if(d1!=null&&d1!='null') $(item).text(d1);
				});
				$('#ly_keyboard').find('.toUptoLow').attr('state',0);
				$('#ly_keyboard').find('.toUptoLow').css('color','white');
			}
		});
		
		$('#ly_keyboard').find('.Shift').click(function(){
			var state=$(this).attr('state');
			if(state!=1){
				$.each($('#ly_keyboard').find('.key'),function(i,item){
					var d3=$(item).attr('d3');
					if(d3!=null&&d3!='null') $(item).text(d3);
				});
				$('#ly_keyboard').find('.Shift').attr('state',1);
				$('#ly_keyboard').find('.Shift').css('color','yellow');
			}
			else {
				$.each($('#ly_keyboard').find('.key'),function(i,item){
					var d1=$(item).attr('d1');
					if(d1!=null&&d1!='null') $(item).text(d1);
				});
				$('#ly_keyboard').find('.Shift').attr('state',0);
				$('#ly_keyboard').find('.Shift').css('color','white');
			}
		});
		 
		
		$('#ly_keyboard').find('.enter').click(function(){
			ly_keyboard.func();
			ly_keyboard.hide();
		});
	},
	hide:function(){
		$('#ly_keyboard').remove();
	},
	func:function(){}
}

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
};

class Keyboard{ 
    keyboardId="keyboard";
    inputId="";
    isOpen=false;
    constructor(){
    }
    //设置inputId
    setInputId(id){
        this.inputId=id;
    }
    initKeyboard() {
        console.log("创建键盘")
        //  获取元素
        var loginGroup = document.getElementById("login-group")
        var div = $('<div id="'+this.keyboardId+'"></div>')
        var table = $('<table cellspacing="5" style="width:36rem;table-layout:fixed;"></table>');

        // var tr1 = $('<tr><td>!</td><td>@</td><td>#</td><td>$</td><td>%</td><td>^</td><td>&</td><td>*</td><td>(</td><td>)</td><td>_</td><td>+</td><td>|</td></tr>')
        var tr2 = $('<tr><td >`</td><td class="num">1</td><td class="num">2</td><td class="num">3</td><td class="num">4</td> <td class="num">5</td><td class="num">6</td><td class="num">7</td><td class="num">8</td><td class="num">9</td><td class="num">0</td><td>-</td><td>=</td><td colSpan="2" width="" class="goback" id="goback" >退格</td></tr>')
        var tr3 = $('<tr><td colSpan="2" >tab</td></td><td>q</td><td>w</td><td>e</td><td>r</td><td>t</td><td>y</td><td>u</td><td>i</td> <td>o</td><td>p</td><td>{</td><td>}</td><td>\\</td>')
        var tr4 = $('<tr><td colSpan="2" class="toUptoLow">capslock</td><td>a</td><td>s</td><td>d</td><td>f</td><td>g</td><td>h</td><td>j</td><td>k</td><td>l</td> <td>;</td> ><td>\'</td><td colspan="2"  class="enter">Enter</td></tr> ')
        var tr5 = $('<tr><td colSpan="2">Shift</td><td>z</td><td>x</td><td>c</td><td>v</td> <td>b</td><td>n</td><td>m</td><td><</td><td>></td> <td>?</td><td>,</td><td>.</td><td>/</td></tr>')
        var tr6 = $('<tr><td class="kou"></td></td><td colSpan="13" class="space">space</td><td class="kou"></td></tr>')
        table.append(tr2, tr3, tr4, tr5, tr6)
		
		$(table).find('tr:first').find('td').css('width','2.4rem');
        $(table).find('tr:first').find('td:last').css('width','4.8rem');
        div.append(table)
        $(loginGroup).append(div)
        this.clickKeyboard()
    }
    // 键盘事件
    clickKeyboard() {
        var keyboard = document.getElementById(this.keyboardId);
        console.log(keyboard)
        keyboard.addEventListener('click',  () =>{
            // console.log("111")
            var target=$(this.inputId);    // 获取整个username/password的div
            console.log(target)
            // 当前事件获取
            var e = window.event || test.caller.arguments[0] // 获取event对象 event || window.event  用于IE
            var el = e.target || e.srcElement; // 获取触发事件的源对象

            //获取当前事件的标签 判断当前的事件的标签是否为td，并且符合后面两个属性 --- 排除退格、切换大小、enter键盘
            if (el.tagName.toLowerCase() == 'td' && el.rowSpan <= 1 && el.colSpan <= 1) {
                var str = el.innerHTML;
                str = this.convHtmlStr(str) || str;  // 字符转换convHtmlStr()
				let x=$(target).val()+str;
                $(target).val(x) ;  
                
            }
            // 删除
            if (el.className == "goback") {
                let x = target.val().slice(0, -1) //截取1位
                $(target).val(x) ;
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
    show(){
        this.isOpen=true;
        var el = document.getElementById(this.keyboardId);
        el.style.display = "block";
    };
    // 隐藏
    hide(){
        this.isOpen=false;
        var el = document.getElementById(this.keyboardId);
        el.style.display = "none";
    }
}
  
var keyboard=new Keyboard();
// 元素获取
var userName = document.getElementById("username"); // 账号
var password = document.getElementById("password"); // 密码

// 点击键盘的显示与隐藏
function ctrKeyboard(type) {
    keyboard.setInputId(type);
	keyboard.show();
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
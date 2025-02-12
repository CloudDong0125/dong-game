var _keyboard = {
    // 显示
    show: function (el, call) {

        // 创建元素
        $('#_keyboard').remove();
        var div = $('<div id="_keyboard" style="z-index:10;position:absolute;width:38rem;height:11rem;margin:auto;padding:0.2rem;background:white;border:1px solid black;user-select:none;border-radius:0.2rem"> </div>')
        console.log(el.context)
        $('body').append(div);



        // 定义键盘元素
        var keys = [];
        keys.push({
            'c': 'key',
            'd1': '`',
            'd2': null,
            'd3': '~',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '1',
            'd2': null,
            'd3': '!',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '2',
            'd2': null,
            'd3': '@',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '3',
            'd2': null,
            'd3': '#',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '4',
            'd2': null,
            'd3': '$',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '5',
            'd2': null,
            'd3': '%',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '6',
            'd2': null,
            'd3': '^',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '7',
            'd2': null,
            'd3': '&',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '8',
            'd2': null,
            'd3': '*',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '9',
            'd2': null,
            'd3': '(',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '0',
            'd2': null,
            'd3': ')',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '-',
            'd2': null,
            'd3': '_',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '=',
            'd2': null,
            'd3': '+',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'goback',
            'd1': '←',
            'd2': null,
            'd3': null,
            'w': '4rem'
        });
        keys.push({
            'c': 'tab',
            'd1': 'tab',
            'd2': null,
            'd3': null,
            'w': '4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'q',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'w',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'e',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'r',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 't',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'y',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'u',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'i',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'o',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'p',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '[',
            'd2': null,
            'd3': '{',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': ']',
            'd2': null,
            'd3': '}',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '\\',
            'd2': null,
            'd3': '|',
            'w': '2.4rem'
        });

        keys.push({
            'c': 'capslock',
            'd1': 'Capslock',
            'd2': null,
            'd3': null,
            'w': '4.5rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'a',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 's',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'd',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'f',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'g',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'h',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'j',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'k',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'i',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': ';',
            'd2': null,
            'd3': ':',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '"',
            'd2': null,
            'd3': "'",
            'w': '2.4rem'
        });
        keys.push({
            'c': 'enter',
            'd1': 'Enter',
            'd2': null,
            'd3': null,
            'w': '4.5rem'
        });

        keys.push({
            'c': 'Shift',
            'd1': 'Shift',
            'd2': null,
            'd3': null,
            'w': '5.8rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'z',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'x',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'c',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'v',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'b',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'n',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': 'm',
            'd2': null,
            'd3': null,
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': ',',
            'd2': null,
            'd3': '<',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '.',
            'd2': null,
            'd3': '>',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'key',
            'd1': '/',
            'd2': null,
            'd3': '?',
            'w': '2.4rem'
        });
        keys.push({
            'c': 'Shift',
            'd1': 'Shift',
            'd2': null,
            'd3': null,
            'w': '5.8rem'
        });
        keys.push({
            'c': 'space',
            'd1': 'space',
            'd2': null,
            'd3': null,
            'w': '37.8rem'
        });

        // 创建键盘
        $.each(keys, function (i, k) {
            if (/^[a-z]$/.test(k.d1)) k.d2 = k.d1.toUpperCase(); //大写转换
            var divs = $('<div class="' + k.c + '" style="display:inline-block;width:' + k.w + ';height:2rem;line-height:2rem;margin:0.1rem;background:black;color:white;border-radius:0.2rem;text-align:center;">' + k.d1 + '</div>')
            $(divs).attr('d1', k.d1);
            $(divs).attr('d2', k.d2);
            $(divs).attr('d3', k.d3);
            $('#_keyboard').append(divs);
        });

        // 换大小样式
        $("#_keyboard").find('.capslock').css('position', 'relative')
        var r = $('<div class="r" style="height:0.2rem;width:0.2rem;border-radius:50%;background:white;z-index:100;position:absolute;top:0.2rem;left:0.2rem"></div>')
        $('#_keyboard').find('.capslock').append(r);

        // 切换数字键盘样式
        $("#_keyboard").find('.Shift').css('position', 'relative')
        var r2 = $('<div class="r2" style="font-size:0.01rem;z-index:100;position:absolute;top:0rem;left:0.5rem;background:transparent">⬆</div>')
        $('#_keyboard').find('.Shift').append(r2);

        // 鼠标经过变化
        $("#_keyboard").children('div').hover(function () {
            $(this).css({
                'background-color': 'rgb(234, 93, 42)',
                'cursor': 'pointer'
            });
        }, function () {
            $(this).css('background-color', 'black');
            // var r2 = $('<div class="r2" style="font-size:0.01rem;z-index:100;position:absolute;top:0rem;left:0.5rem;background:transparent">⬆</div>')
            // $('#_keyboard').find('.Shift').append(r2);
        });
        if (call != null) {
            this.func = call;
        }

        // 键盘事件
        $("#_keyboard").find('.key').click(function () {
            var str = $(this).text(); // 取值
            str = convHtmlStr(str) || str // 字符转换convHtmlStr()
            let x = $(el).val() + str;
            $(el).val(x);
        });

        // “←” 事件
        $('#_keyboard').find('.goback').click(function () {
            console.log("goback")
            let x = $(el).val().slice(0, -1);
            $(el).val(x);
        })

        // tab 空格键
        $('#_keyboard').find('.tab').click(function () {
            console.log("tab")
            let x = $(el).val();
            $(el).val(x += " ")
        })
        // space 空格键
        $('#_keyboard').find('.space').click(function () {
            console.log("tab")
            let x = $(el).val();
            $(el).val(x += " ")
        })

        // 大小写字母
        $('#_keyboard').find('.capslock').click(function () {
            var state = $(this).attr('state');
            console.log("切换大小写", state)
            if (state != 1) { // 切换大写
                $.each($("#_keyboard").find('.key[d2 != null]'), function (i, item) {
                    var d2 = $(item).attr('d2');
                    if (d2 != null && d2 != 'null') $(item).text(d2);
                    console.log('2', d2)
                });
                $('#_keyboard').find('.capslock').attr('state', 1);
                $('#_keyboard').find('.r').css('background', 'rgb(133, 216, 8)');

            } else { // 切换小写
                $.each($('#_keyboard').find('.key[d2 != null]'), function (i, item) {
                    var d1 = $(item).attr('d1');
                    if (d1 != null && d1 != 'null') $(item).text(d1)
                    console.log('d1', d1)
                });
                $('#_keyboard').find('.capslock').attr('state', 0);
                $('#_keyboard').find('.r').css('background', 'white');

            }
        });

        // shift 切换数字键盘
        $('#_keyboard').find('.Shift').click(function () {
            var state = $(this).attr('state');

            console.log("切换数字键", state)
            if (state != 1) {
                $.each($("#_keyboard").find('.key[d3 != null]'), function (i, item) {
                    var d3 = $(item).attr('d3');
                    if (d3 != null && d3 != 'null') $(item).text(d3);
                    console.log("3" + d3)
                });

                $('#_keyboard').find('.Shift').attr('state', 1);
                $('#_keyboard').find('.r2').css('color', 'rgb(133, 216, 8)');

            } else {
                $.each($('#_keyboard').find('.key[d3 != null]'), function (i, item) {
                    var d1 = $(item).attr('d1');
                    if (d1 != null && d1 != 'null') $(item).text(d1);
                    console.log("1" + d1)
                });
                $('#_keyboard').find('.Shift').attr('state', 0);
                $('#_keyboard').find('.r2').css('color', 'white');
                // $('#_keyboard').find('.r2').remove()

            }
        })

        // enter关闭键盘
        $('#_keyboard').find('.enter').click(function () {
            // _keyboard.func();
            _keyboard.hide();
        })

        // 键盘跟随--偏移 判断边距
        var offsets = $(el).offset() // 获取偏移
        console.log($(el))

        var wrapperBoxWidth = $('body').width(); // 获取父容器宽度
        var wrapperBoxHeight = $('body').height(); // 获取父容器高度

        var wrapperBoxWidth = $(window).width() > $('body').width() ? $(window).width() : $('body').width(); // 获取window宽度
        var wrapperBoxHeight = $(window).height() > $('body').height() ? $(window).height() : $('body').height(); // 获取window高度

        var innerBoxWidth = $(el)[0].clientWidth; //  获取input宽度
        var innerBoxHeight = $(el)[0].clientHeight; // 获取input高度


        var innerBoxLeft = $(el).offset().left; // input左偏移
        var innerBoxTop = $(el).offset().top; // input上偏移

        var keyWidth = $('#_keyboard')[0].clientWidth; // 键盘弹框宽度
        var keyHeight = $('#_keyboard')[0].clientHeight; // 键盘弹框高度
        console.log(wrapperBoxWidth, wrapperBoxHeight)
        // console.log(innerBoxWidth, keyWidth, innerBoxLeft)
        // console.log(innerBoxHeight, keyHeight, innerBoxTop)
        let left = offsets.left;
        let top = (offsets.top + innerBoxHeight) + 5;
        // 如果弹框宽度+距离左侧宽度大于外部元素的宽度，则右侧溢出
        if ((innerBoxLeft + keyWidth) > wrapperBoxWidth) {
            left = offsets.left - (keyWidth - innerBoxWidth);
        }
        // 如果弹框高度+输入框高度+距离顶部高度大于外部元素的高度，则底部溢出
        if ((innerBoxTop + innerBoxHeight + keyHeight) > wrapperBoxHeight) {
            top = offsets.top - keyHeight - 5;
        }
        $('#_keyboard').css('left', left);
        $('#_keyboard').css('top', top);

    },
    // 隐藏
    hide: function () {
        $('#_keyboard').remove();
    },

}

// 字符的转换
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
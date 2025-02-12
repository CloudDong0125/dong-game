(function (doc, win) {
    var docEl = win.document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    /**
            * ================================================
            *   设置根元素font-size
            * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 
            × ================================================
            */
    var refreshRem = function () {
        var clientWidth = win.innerWidth
            || doc.documentElement.clientWidth
            || doc.body.clientWidth;
        var clientHeight = win.innerHeight
            || doc.documentElement.clientHeight
            || doc.body.clientHeight;

        // $('.cover').remove();
        var base_size = 1200;
        if (clientWidth < clientHeight) {
            //$('body').append('<div class="cover" style="position:absolute;left:0;top:0;right:0;bottom:0;margin:0;background:transparent;"></div>');
            //ShowHint('请在横屏环境下体验！');				
            //return;
            //base_size=1200;
        }
        //console.log(clientWidth)
        if (!clientWidth) return;
        var fz;
        var Width = clientWidth;
        var Height = clientWidth;
        fz = 16 * Width / base_size;
        if (clientWidth > clientHeight) fz = 16 * Height / base_size;
        docEl.style.fontSize = fz + 'px';
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refreshRem, false);
    doc.addEventListener('DOMContentLoaded', refreshRem, false);
    refreshRem();

})(document, window);

function remvalue() {
    var remstr = window.getComputedStyle(document.documentElement)["fontSize"];
    remstr = remstr.substring(remstr, remstr.length - 2);
    return remstr * 1.0;
}
console.log('remvalue()=' + remvalue());

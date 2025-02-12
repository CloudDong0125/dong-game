var keyboard = function(){
	this.write = undefined;
	this.password = '';

	var scope = this;
	var shift = false,
		capslock = false;

	this.setKeyboard = function(){
		var ul = $('<ul id="keyboard" class="clearfix" style="display: none"></ul>');

		ul.append('<li class="symbol"><span class="off">`</span><span class="on">~</span></li>');
		ul.append('<li class="symbol"><span class="off">1</span><span class="on">!</span></li>');
		ul.append('<li class="symbol"><span class="off">2</span><span class="on">@</span></li>');
		ul.append('<li class="symbol"><span class="off">3</span><span class="on">#</span></li>');
		ul.append('<li class="symbol"><span class="off">4</span><span class="on">$</span></li>');
		ul.append('<li class="symbol"><span class="off">5</span><span class="on">%</span></li>');
		ul.append('<li class="symbol"><span class="off">6</span><span class="on">^</span></li>');
		ul.append('<li class="symbol"><span class="off">7</span><span class="on">&</span></li>');
		ul.append('<li class="symbol"><span class="off">8</span><span class="on">*</span></li>');
		ul.append('<li class="symbol"><span class="off">9</span><span class="on">(</span></li>');
		ul.append('<li class="symbol"><span class="off">0</span><span class="on">)</span></li>');
		ul.append('<li class="symbol"><span class="off">-</span><span class="on">_</span></li>');
		ul.append('<li class="symbol"><span class="off">=</span><span class="on">+</span></li>');
		ul.append('<li class="delete lastitem">←</li>');
		ul.append('<li class="tab">tab</li>');
		ul.append('<li class="letter">q</li>');
		ul.append('<li class="letter">w</li>');
		ul.append('<li class="letter">e</li>');
		ul.append('<li class="letter">r</li>');
		ul.append('<li class="letter">t</li>');
		ul.append('<li class="letter">y</li>');
		ul.append('<li class="letter">u</li>');
		ul.append('<li class="letter">i</li>');
		ul.append('<li class="letter">o</li>');
		ul.append('<li class="letter">p</li>');
		ul.append('<li class="symbol"><span class="off">[</span><span class="on">{</span></li>');
		ul.append('<li class="symbol"><span class="off">]</span><span class="on">}</span></li>');
		ul.append('<li class="symbol lastitem"><span class="off">\\</span><span class="on">|</span></li>');
		ul.append('<li class="capslock">capslock</li>');
		ul.append('<li class="letter">a</li>');
		ul.append('<li class="letter">s</li>');
		ul.append('<li class="letter">d</li>');
		ul.append('<li class="letter">f</li>');
		ul.append('<li class="letter">g</li>');
		ul.append('<li class="letter">h</li>');
		ul.append('<li class="letter">j</li>');
		ul.append('<li class="letter">k</li>');
		ul.append('<li class="letter">l</li>');
		ul.append('<li class="symbol"><span class="off">;</span><span class="on">:</span></li>');
		ul.append('<li class="symbol"><span class="off">\'</span><span class="on">\"</span></li>');
		ul.append('<li class="return lastitem">Enter</li>');
		ul.append('<li class="left-shift">Shift</li>');
		ul.append('<li class="letter">z</li>');
		ul.append('<li class="letter">x</li>');
		ul.append('<li class="letter">c</li>');
		ul.append('<li class="letter">v</li>');
		ul.append('<li class="letter">b</li>');
		ul.append('<li class="letter">n</li>');
		ul.append('<li class="letter">m</li>');
		ul.append('<li class="symbol"><span class="off">,</span><span class="on"><</span></li>');
		ul.append('<li class="symbol"><span class="off">.</span><span class="on">></span></li>');
		ul.append('<li class="symbol"><span class="off">/</span><span class="on">?</span></li>');
		ul.append('<li class="right-shift lastitem">Shift</li>');
		ul.append('<li class="space lastitem">space</li>');

		return ul;
	};
	this.bindDocument = function(cname){
		$(document).bind('click',function(e){
			var e = e || event;
			var target= e.srcElement? e.srcElement: e.target;

			var className = $(target).attr('class');
			var parentId = $(target).parents('ul').attr('id');
			var tagName = $(target).get(0).tagName;

			if(className == cname){
				$('#keyboard').css('display','block');
				$('#logDiv').css('bottom','2rem');
				scope.write = $(target);
				scope.bindLi();
				var iType = $(target).attr('iType');
				if(iType=='password'){
					var len = $(target).html().length;
					if(len==0) scope.password = '';
				}
				/*
				var offTop=$('#keyboard').offset().top;
				var height = $('#keyboard').outerHeight(true);
				var wHeight=$(window).height();
				var scollTop = offTop + height - wHeight;
				$(window).scrollTop(scollTop);*/
			}
			else if(parentId == 'keyboard' || tagName == 'UL') {
				$('#keyboard').css('display','block');
				$('#logDiv').css('bottom','2rem');
				}
			else{
				$('#keyboard').css('display','none');
				$('#logDiv').css('bottom','0px');
			}
		})
	};
	this.bindLi = function(){
		$('#keyboard li').unbind('click').click(function(e){
			//var e = e || event;
			//e.stopPropagation();
			//e.preventDefault();
			var $this = $(this),
				character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

			// Shift keys
			if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
				//$('.letter').toggleClass('uppercase');
				$('.symbol span').toggle();

				shift = (shift === true) ? false : true;
				capslock = false;
				return false;
			}

			// Caps lock
			if ($this.hasClass('capslock')) {
				$('.letter').toggleClass('uppercase');
				capslock = true;
				return false;
			}

			// Delete
			if ($this.hasClass('delete')) {
				deleteValue();
				return false;
			}

			// Special characters
			if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
			if ($this.hasClass('space')) character = ' ';
			if ($this.hasClass('tab')) character = "\t";
			if ($this.hasClass('return')) character = "\n";

			// Uppercase letter
			if ($this.hasClass('uppercase')) character = character.toUpperCase();

			// Remove shift once a key is clicked.
			if (shift === true) {
				//$('.symbol span').toggle();
				//if (capslock === false) $('.letter').toggleClass('uppercase');

				shift = false;
			}

			changeValue(character);

		});
	};


	var changeValue = function(newValue){
		var nValue = newValue;
		var iType = $(scope.write).attr('iType');
		if(iType=='password'){
			scope.password = scope.password + nValue;
			nValue = '*';
		}
		var value = $(scope.write).parent().find('input').val();
		$(scope.write).parent().find('input').val(value + nValue);

	};
	var deleteValue = function(){
		var value = $(scope.write).parent().find('input').val();
		$(scope.write).parent().find('input').val(value.substr(0, value.length - 1));
		var iType = $(scope.write).attr('iType');
		if(iType=='password'){
			scope.password = scope.password.substr(0, scope.password.length - 1);
		}
	}
};
var board = new keyboard();
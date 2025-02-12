/**
 * 传入id和学期，去设置具体哪天在校
 * 	参数：valid_school=0为平台数据，非0为学校数据
    参数：valid_term=0为当前学期，非0为指定学期

	
1、平台在校天数未设置，默认周1-周5为在校天；
2、学校在校天数未设置，默认为平台在校天；
3、学校已设置在校天，以学校的设置为准；

 */

function set_valid_days_show(valid_school,valid_term) {
	/**
	 * 初始化定义
	 */
	if(valid_term==null) valid_term=0;	// 如果valid_term不存在，初始值为：当前学期
	
	var wn=["","日","一","二","三","四","五","六"];// 定义天数数组
	var oneDay=1000*60*60*24; 	// 定义一天的毫秒数
	$('#set_valid_days_div').remove(); // 去除元素

	/**
	 * 给主体添加样式
	 */
	$('body').append('<div id="set_valid_days_div" style="position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;background:#f8f8f8;z-index:999;"></div>');    // 向body内部的末尾处增加元素，并定义样式
	$('#set_valid_days_div').append('<div class="page_head" style="height:3rem;line-height:3rem;border-bottom:1px solid #f0f0f0;position:relative;user-select:none;"></div>'); // 向set_valid_days_div元素内新增元素page_head，并定义样式
	$('#set_valid_days_div').append('<div class="page_content" style="height:calc(100% - 3.5rem);overflow-y:auto;"></div>'); // 向set_valid_days_div元素内新增元素page_content，并定义样式
	$('#set_valid_days_div').find('.page_head').append('<div class="date_period" style="position:absolute;left:1rem;top:0;bottom:0;margin:auto;">日期区间：<input class="edit_date1" style="width:8rem;height:2rem;line-height:2rem;text-indent:0.5rem;" readonly>～<input class="edit_date2" style="width:8rem;height:2rem;line-height:2rem;text-indent:0.5rem;" readonly></div>'); // 向page_head元素内新增元素date_period，并定义样式为“仅读”
	
	// 定义日期区间
	var from_date=(new Date()).getFullYear()+'-01-01'; //定义开始日期：获取当前年份+ ‘-01-01’
	var to_date=(new Date()).getFullYear()+'-12-31';  //定义结束日期：获取当前年份+ ‘-12-31’
	$('#set_valid_days_div').find('.edit_date1').val(from_date); // 设置头部日期区间的开始时间 找到第一个元素，并匹配当前值为from_date
	$('#set_valid_days_div').find('.edit_date2').val(to_date); //设置头部日期区间的结束时间 找到对应元素，并匹配的当前值为to_date

	if(valid_school!=0) {  // 当前数据为学校数据时 隐藏日期区间  显示选择学期
		$('#set_valid_days_div').find('.date_period').hide();  // 隐藏日期区间
		$('#set_valid_days_div').find('.page_head').append('<div style="position:absolute;left:1rem;top:0;bottom:0;margin:auto;">选择学期：<select class="edit_term" style="width:16rem;height:2rem;line-height:2rem;text-indent:0.5rem;" readonly></div>'); // 显示选择学期
		set_valid_days_term_list(); // 调用学期数据的方法
	}

	// 给头部增加各个按钮和样式
	$('#set_valid_days_div').find('.page_head').append('<div class="refresh_grid" style="position:absolute;width:4rem;height:2rem;line-height:2rem;left:24rem;top:0;bottom:0;margin:auto;text-align:center;font-size:1rem;border:1px solid #c0c0c0;border-radius:0.2rem;background:#3bb4af;color:#ffffff;cursor:pointer;">刷新</div>');
	$('#set_valid_days_div').find('.page_head').append('<div class="save_grid" style="position:absolute;width:4rem;height:2rem;line-height:2rem;left:29rem;top:0;bottom:0;margin:auto;text-align:center;font-size:1rem;border:1px solid #c0c0c0;border-radius:0.2rem;background:#3bb4af;color:#ffffff;cursor:pointer;">保存</div>');
	$('#set_valid_days_div').find('.page_head').append('<div class="clear_grid" style="position:absolute;width:4rem;height:2rem;line-height:2rem;left:34rem;top:0;bottom:0;margin:auto;text-align:center;font-size:1rem;border:1px solid #c0c0c0;border-radius:0.2rem;background:#3bb4af;color:#ffffff;cursor:pointer;">清除</div>');
	$('#set_valid_days_div').find('.page_head').append('<div class="close_grid" style="position:absolute;width:4rem;height:2rem;line-height:2rem;left:39rem;top:0;bottom:0;margin:auto;text-align:center;font-size:1rem;border:1px solid #c0c0c0;border-radius:0.2rem;background:#3bb4af;color:#ffffff;cursor:pointer;">退出</div>');
	$('#set_valid_days_div').find('.page_head').append('<div style="position:absolute;width:20rem;height:2rem;line-height:2rem;left:45rem;top:0;bottom:0;margin:auto;text-align:center;font-size:1rem;">（色块代表在校，点击可切换状态）</div>');

	/**
	 * 1、日期选择：在日历上选择开始-结束的时间，并显示到input上；
	 * 2、刷新按钮：将日历更新并重新绘制一遍，调状态接口，每格状态获取；状态1 的时候，表示在校天数，显示颜色，否则不在校，颜色显示默认； 
	 * 3、清除按钮：将整个body修改的进行天数的清除。（恢复初始默认状态）
	 * 4、保存按钮：将学校id+学期id+状态、天数和日期提交接口后，调用状态接口，修改当前记录的状态。
	 * 5、清除按钮：将学校id+学期id+日期区间内的清除，并提交接口，并调用状态接口，修改当前记录的状态
	 */
	// 点击日期区间的开始和结束框
	$('#set_valid_days_div').find('.edit_date1,.edit_date2').click(function(){
		var this_input=$(this);  
		// 将日历组件显示“选择日期”
		parent.userCalendar.show('选择日期',function(result){
			$(this_input).val(result);  // 赋值选择的时间
		});
	});


	// 点击“刷新”按钮
	$('#set_valid_days_div').find('.refresh_grid').click(function(){
		refresh_grid()  // 调用刷新的方法
	});
	
	// 点击“关闭”按钮
	$('#set_valid_days_div').find('.close_grid').click(function(){
		$('#set_valid_days_div').remove(); // 移除
	});
	
	
	$('#set_valid_days_div').find('.refresh_grid').click(); //默认自刷新一次
	
	//刷新的方法
	function refresh_grid(){
		$('#set_valid_days_div').find('.mItem').remove();  // 每个日历清除为初始值

		// 指定学校数据下
		if(valid_school!=0){
			from_date=$('#set_valid_days_div').find('.edit_term').find('option:selected').attr('from_date');  // 开始时间选中项，定义属性值为from_date
			to_date=$('#set_valid_days_div').find('.edit_term').find('option:selected').attr('to_date'); // 结束时间的选中项，定义属性值为from_date值
			$('#set_valid_days_div').find('.edit_date1').val(from_date);   // 找到元素.edit_date1,取值为from_date
			$('#set_valid_days_div').find('.edit_date2').val(to_date);     // 找到元素.edit_date2,取值为to_date
		}
		
		var fromDate=new Date($('#set_valid_days_div').find('.edit_date1').val()); // 获取开始时间
		var toDate=new Date($('#set_valid_days_div').find('.edit_date2').val());   // 获取结束时间
		
		var y1=fromDate.getFullYear();  // 获取开始年
		var y2=toDate.getFullYear();	// 获取结束年
		
		var m1=fromDate.getMonth()+1;   // 获取开始月份
		var m2=toDate.getMonth()+1;    // 获取结束月份
		
		var mn=(y2-y1)*12+(m2-m1)+1;  // 结束年-开始年之间的年份乘以12个月+相差的月份：求两个时间之前差了几个月
		
		//console.log('m1='+y1+'-'+m1+',m2='+y2+'-'+m2+',mn='+mn);	
		
		var x=y1; // 定义开始年
		var y=m1-1; // 定义开始月份
			
		for(var i=0;i<mn;i++){  // i<相差的月份的时候
			y++;         // 开始的月份+1
			if(y>12) {y=y-12;x++;} // 当开始的月份 > 12， y重新为1 ；并且年份+1 
			y=y<10?"0"+y:y;    // 条件：开始的月份 是否 < 10 ,操作： 是的时候前面补个0显示,非的时候为y
			var mName=x+'年'+y+'月';    // 定义mName的值
			var divs=$('<div class="mItem" md="'+x+'-'+y+'"style="display:inline-block;width:21rem;height:20rem;line-height:2rem;margin:0.5rem 0 0 0.5rem;padding:0;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.3);border-radius:0.2rem;position:relative;"></div>');  // 设置表单，并定义样式
			$('#set_valid_days_div').find('.page_content').append(divs); // 找到元素并追加divs	 
			$(divs).append('<div class="mName" style="position:absolute;left:0.5rem;top:0.5rem;font-size:1.2rem;color:#666666;font-weight:700;">'+mName+'</div>'); // 在divs中，追加元素mName，并显示年月，并定义样式
			$(divs).append('<div class="dCount" style="position:absolute;right:0.5rem;top:0.5rem;font-size:1rem;color:#888888;text-align:right;">本月在校 <span style="color:blue;"></span> 天</div>'); // 在divs中，追加元素dCount，并显示“本月在校”，并定义样式
			$(divs).append('<div style="position:absolute;width:20rem;height:16rem;left:0.5rem;top:3.35rem;overflow:hidden;"><table class="mGrid"  border=1 rule=all style="width:100%;height:100%;color:#666666;text-align:center;border-collapse:collapse;border:1px solid #e0e0e0;" cellspacing=0></table></div>'); // 在divs中，追加元素mGrid，并定义样式
			var trs=$('<tr style="height:2rem;background:#f0f0f0;"></tr>'); // 定义trs
			$(divs).find('.mGrid').append(trs); // 找到元素，并追加trs
			for(var j=1;j<=7;j++) { // 遍历  <= 7 ; j+1		
				$(trs).append('<td style="width:14.3%;">'+wn[j]+'</td>'); // 追加显示当前的日期
			}
			//画表格
			for(var r=1;r<=6;r++) {  // 遍历行数
				var trs=$('<tr style="height:2rem;background:#ffffff;"></tr>');  // 定义格子样式
				$(divs).find('.mGrid').append(trs);		// 找到元素，追加trs格子
				for(var j=1;j<=7;j++) { // 遍历列数
					$(trs).append('<td class="dayBlock" index='+((r-1)*7+j)+' style="width:14.3%;user-select:none;"></td>');  // 给每个小格子添加元素dayBlock，index索引值，及样式
				}
			}
			//填数据
			var d1=new Date(x,parseInt(y)-1,1); //  获取循环到的当下本月的第一天的时间
			var nextYear=parseInt(x);  //  获取下个月的年份
			var nextMonth=parseInt(y)+1; // 获取下个月的月份
			if(nextMonth>12) {nextYear++;nextMonth=1;} // 若下个月为第二年 月>12时候：年+1，月为1 

			var d2=new Date(nextYear,nextMonth-1,1);  //  获取下个月的第一天的时间
			d2=new Date(d2.getTime()-oneDay);		//用下个月第一天的时间戳减去一天的时间戳，获取到本月最后一天的时间戳
			var mDays=parseInt((d2-d1)/oneDay)+1;   // 求本月的天数
			
			var firstIndex=d1.getDay();  // 求本月第一天是星期几
			//console.log('['+x+'-'+y+']'+mDays+',firstIndex='+firstIndex);
			
			for(var d=1;d<=mDays;d++){
				var dValue=x+'-'+y+'-'+(d<10?"0"+d:d);  // 不足10的数字，前面补0
				$(divs).find('.dayBlock[index='+(firstIndex+d)+']').text(d);  // 找到相关索引的格子，显示
				$(divs).find('.dayBlock[index='+(firstIndex+d)+']').attr('dValue',dValue); // 找到相关索引的格子，增加值的属性，为dValue 日期
				$(divs).find('.dayBlock[index='+(firstIndex+d)+']').attr('dState',0); // 找到相关索引的格子，增加状态属性，为0
			}
			$('#set_valid_days_div').find('.dayBlock[dValue]').css('cursor','pointer');  // 找到格子，添加鼠标经过样式
		}
		
		//超日期区间灰度显示
		$.each($('#set_valid_days_div').find('.dayBlock[dValue]'),function(index,value){
			var dValue=$(value).attr('dValue');  // 定义dValue 为当前的dValue
			// 如果dValue < 表格元素.edit_date1表开始时间；或者表格元素.edit_date2表结束时间
			if(dValue<$('#set_valid_days_div').find('.edit_date1').val()||dValue>$('#set_valid_days_div').find('.edit_date2').val()){
				$(value).css('color','#c0c0c0');  // 修改css显示
				$(value).removeAttr('dValue');    // 移除值
				$(value).removeAttr('dState');    // 移除状态值
			}			
		});
		
		
		// 点击小表格
		$('#set_valid_days_div').find('.dayBlock[dValue]').click(function(){
			// 获取当前的值和状态
			var dValue=$(this).attr('dValue');
			var dState=$(this).attr('dState');

			// 当前状态为0 的时候，表示存在
			if(dState==0){
				$(this).attr('dState',1);  // 修改当前属性状态值：1
				$(this).css('background','#ddffdd'); // 修改当前css背景颜色
			}
			else {
				$(this).attr('dState',0); // 修改当前属性状态值：0   
				$(this).css('background','transparent'); // 修改当前css背景样式
			}

			var md=dValue.substring(0,7);  // 截取长度
			//console.log('md='+md);
			var divs=$('.mItem[md="'+md+'"]');  // 获取当前的日期元素
			$(divs).find('.dCount').find('span').text($(divs).find('.dayBlock[dState=1]').length); // 找到“本月在校”的span标签，获取长度
		});
		
		set_valid_days_load_state();  // 调用状态的方法
	}
	
	// 状态的方法
	function set_valid_days_load_state(){
		var url =GetUrlRoot()+"/pc-web/moralH5/sys_valid_days_load.jsp";		
		var param = {};  // 定义一个空对象
		param.school_id=valid_school; // 赋值当前school_id
		param.term_id=valid_term; // 赋值当前term_id
		param.from_date=$('#set_valid_days_div').find('.edit_date1').val();  // 赋定义开始时间
		param.to_date=$('#set_valid_days_div').find('.edit_date2').val();    // 赋定义结束时间
		//console.log(url+' '+JSON.stringify(param));
		// 接口请求
		$.ajax({
			type:"POST",   // 请求方法
			url:url,  // 请求接口
			dataType:"json",     // 数据格式
			async:true,		 // 异步请求
			contentType:"application/json", // 内容类型：JSON       
			data:JSON.stringify(param),  // 转换JSON格式的数据	
			success: function (result) {
				//console.log('result='+JSON.stringify(result));
				$.each(result.data,function(index,value){
					var item=$('#set_valid_days_div').find('.dayBlock[dValue="'+value.d_name+'"]')  //找到当前的小格子
					if(value.d_state==1) {  // 当前状态=1时候
						$(item).attr('dState',1);  // 增加属性dState = 1
						$(item).css('background','#ddffdd'); // 修改css background
					} 
					else {  // 否则的话
						$(item).attr('dState',0); // 增加属性dState = 0
						$(item).css('background','transparent'); // 修改css background
					}				
				});
				
				if(valid_school==0&&result.data.length==0) set_default_state();// 当前参数=0时或数据长度=0，调用初始方法
				$.each($('#set_valid_days_div').find('.mItem'),function(index,value){  // 遍历每个日历
					$(value).find('.dCount').find('span').text($(value).find('.dayBlock[dState=1]').length);   // 找到对应元素并赋值本月在校的天数
				});
			}
		});
	}
	
	// 点击“保存”按钮
	$('#set_valid_days_div').find('.save_grid').click(function(){
		var dResult='';  // 初始化
		$.each($('#set_valid_days_div').find('.dayBlock[dValue]'),function(index,value){  // 遍历每一个小表格
			var dState=$(value).attr('dState');  // 获取属性值dState
			var dValue=$(value).attr('dValue');  // 获取属性值dValue
			dResult=dResult+dValue+','+dState+';'; // 将每天的日期值和状态组合起来	 		
		});
		var url =GetUrlRoot()+"/pc-web/moralH5/sys_valid_days_save.jsp";		
		var param = {};  // 定义一个空对象
		
		param.school_id=valid_school;  // 赋值当前的school_id
		param.term_id=valid_term;  //赋值当前的term_id
		param.valid_result=dResult; // 组合的日期和状态值
		//console.log(url+' '+JSON.stringify(param));
		
		$.ajax({
			type:"POST", 
			url:url, 
			dataType:"json",    
			async:true,		
			contentType:"application/json",               
			data:JSON.stringify(param),	 // 传入并转换JSON格式
			success: function (result) {
				//console.log('result='+JSON.stringify(result));
				set_valid_days_message('保存成功！');  // 调用提示的方法，自定义提示文字
				set_valid_days_load_state(); // 调用状态方法
			}
		});
	});
	
	// 点击“清除”按钮
	$('#set_valid_days_div').find('.clear_grid').click(function(){
		
		var url =GetUrlRoot()+"/pc-web/moralH5/sys_valid_days_clear.jsp"; // 定义接口
		var param = {}; // 定义一个空对象
		// 对象方法对应赋值：学校、学期、清空开始时间和结束时间
		param.school_id=valid_school;
		param.term_id=valid_term;
		param.from_date=$('#set_valid_days_div').find('.edit_date1').val();  // 给参数赋值元素.edit_date1的值
		param.to_date=$('#set_valid_days_div').find('.edit_date2').val(); // 给参数赋值元素.edit_date2的值
		//console.log(url+' '+JSON.stringify(param));
		
		$.ajax({
			type:"POST", 
			url:url, 
			dataType:"json",    
			async:true,		
			contentType:"application/json",               
			data:JSON.stringify(param),	
			success: function (result) {
				//console.log('result='+JSON.stringify(result));
				set_valid_days_message('清除成功，自动加载默认设置！'); // 调用提示的方法，自定义提示文字
				set_valid_days_load_state();  // 调用状态的方法
			}
		});
	});
	

	//1、每个格子的状态判断并记录：默认1-5为状态1即在校天；其余格子状态为0即透明表示
	function set_default_state(){
		//赋予初始状态
		$.each($('#set_valid_days_div').find('.dayBlock[dValue]'),function(index,value){ // 遍历每一个日历的小格子
			var dValue=$(value).attr('dValue');  // 给dValue获取小格子值和属性
			dValue=new Date(dValue); // 传入日期
			if(dValue.getDay()>0&&dValue.getDay()<6) {   // 当当前的天数>0与<6的时候
				$(value).attr('dState',1);    // 当前的格子属性状态为1
				$(value).css('background','#ddffdd'); // 当前的格子css背景为#ddffdd
			}
			else {  // 否则的话
				$(value).attr('dState',0); // 当前的格子属性状态为0
				$(value).css('background','transparent');  // 当前的格子css背景为透明
			}				
		});
	}
	
	// 获取学期数据
	function set_valid_days_term_list(){
		var url =GetUrlRoot()+"/zhiyu-baseplatform-web/zhiyu-data/list/term/"+valid_school;
			
		var param = {};	 // 定义一个空数组
		//console.log(url+' '+JSON.stringify(param));
		$.ajax({
			type:"POST",   
			async:false,
			url:url, 
			dataType:"json",      
			contentType:"application/json",               
			data:JSON.stringify(param),  // 传入数据
			success: function (result) {
				//console.log(JSON.stringify(result));
				if(result.code!=0) {ShowMessage("获取学期信息失败！",2);return;}  // 接口状态为不为0的时候，提示失败信息并修改状态为2，并返回
				datas=result.data.list;	 // 赋值  

				// 遍历数据
				$.each(datas,function(index,value){			
					// 给当前的元素追加并定义样式
					$('#set_valid_days_div').find('.edit_term').append('<option value='+value.id+' from_date="'+value.beginDate+'" to_date="'+value.endDate+'">'+value.name+'</option>');	 					
					
					// 当前状态为1 或  当前学期是本学期   valid_term 赋值 id
					if(parseInt(value.state)==1&&valid_term==0) valid_term=value.id;				
				});				
				// 找到元素edit_term赋值 id
				$('#set_valid_days_div').find('.edit_term').val(valid_term);
				// 触发 change 事件
				$('#set_valid_days_div').find('.edit_term').change(function(){
					valid_term=$(this).val();  // 赋值
					$('#set_valid_days_div').find('.refresh_grid').click(); // 清除事件
				});
			}
			,
			error:function(XMLHttpRequest) {
				alert("调取数据接口失败！");
			}
		});	
	}
	// 消息提示框
	function set_valid_days_message(msg)	{
		if(msg==undefined) msg='';  // 未定义的时候为空

		// 定义传入的提示内容和样式
		var sstr ='<div id="ShowMessage" style="position:fixed;z-index:2500;left: 0;right:0;top: 0;bottom:0;z-index:999999;background:rgba(0,0,0,0.7);">';
		sstr=sstr+'<div style="position:absolute;width:24rem;height:16rem;margin:auto;top:0;bottom:0;left:0;right:0;box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);border-radius:0.5rem;background:#f0f0f0;">';
		sstr=sstr+'<div style="width:100%;height:2.5rem;line-height:2.5rem;margin:0;background:#3bb4af;border-radius:0.5rem 0.5rem 0 0;color:white;text-align:left;font-size:1.2rem;text-indent:0.5rem;padding:0;z-index:99;">友情提醒</div>';
		sstr=sstr+'<div style="display:flex;width:100%;height:12rem;overflow-x:hidden;overflow-y: auto;">';
		sstr=sstr+'<div style="width:100%;line-height:2rem;font-size:1.2rem;margin:auto;text-align:center;padding:1rem;">'+msg+'</div>';
		sstr=sstr+'</div>';
		sstr=sstr+'<div style="position:absolute;width:1.8rem;height:1.7rem;line-height:1.7rem;top:0.4rem;right:0.4rem;background:url(img/exit02.png) white 50% 50% no-repeat;background-size:1.2rem;cursor:pointer;border-radius:1rem;z-index:99;" onclick="javascript:$(this).parent().parent().remove();"></div>';	
		sstr=sstr+'</div>';
		sstr=sstr+'</div>';
					
		$('body').append(sstr);   // 追加到body页面中
	}
}
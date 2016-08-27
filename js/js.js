
		var Calender=function(){
			var mydate=new Date();
			var thisyear=mydate.getFullYear();
			var thismonth=mydate.getMonth()+1;
			var thisday=mydate.getDate();
			var today_day=thisday; 
			var dutyDate;
			var getdaysinonemonth=function(year,month){
				month=parseInt(month);
			//取得当前日期的下个月的第一天的前一天的日子；即这个月的最后一天的日子
			var d=new Date(year,month,0);
			return d.getDate();
		};
		var inithtml=function(calenderId){
			var table = $('<table></table>');
			table.addClass('data_table');
			$(calenderId).append(table);
			var thread = $('<thead></thead>');
			table.append(thread);
			var thread_tr=$('<tr></tr>');
			thread.append(thread_tr);
			var weekArr=['日','一','二','三','四','五','六'];
			for (var k = 0; k < weekArr.length; k++) {
				var thread_td=$('<td>'+weekArr[k]+'</td>');
				thread_tr.append(thread_td);
			}
			for (var j = 0; j < 6; j++) {
				var tr = $('<tr></tr>');
				table.append(tr);
				for (var i = 0; i < 7; i++) {
					var div=$('<div></div>');
					var td = $('<td></td>');
					tr.append(td);
					td.append(div);
				}
			}
		};
		/*标记出值班日期*/
		var markdate=function(dutyyear,dutymonth,dutyday){
			var datetxt=thisyear+"年"+thismonth+"月";
			var dutydate=dutyyear+"年"+dutymonth+"月";
			if(datetxt==dutydate){
				for(var j=0;j<6;j++){
					for(var i=0;i<7;i++){
						var tdhtml=jQuery(".data_table tbody tr").eq(j).find("td").eq(i).find("div").html();
						
						if(tdhtml==dutyday){
							jQuery(".data_table tbody tr").eq(j).find("td").eq(i).addClass("tdselect");
							var tdheight=jQuery(".data_table tbody tr").eq(0).find("td").width();
							jQuery("td.tdselect div").css("line-height",tdheight+'px');
						}
					}
				}
			}
		}; 
		/*算某个月的第一天是星期几*/
		var getfirstday=function(year,month){             
			month=month-1;
			var d=new Date(year,month,1);
			return d.getDay();
		}
		/*往日历中填入日期*/
		var setcalender=function(days,weekday){           
			var a=1;//日期
			for(var j=0;j<6;j++){//六行
				   for(var i=0;i<7;i++){//七列
					//本月第一天之前的所有部分
					if(j==0&&i<weekday){
						jQuery(".data_table tbody tr").eq(0).find("td").eq(i).find("div").html("");
						jQuery(".data_table tbody tr").eq(0).find("td").eq(i).removeClass("usedate");
					}else{
						if(a<=days){
							jQuery(".data_table tbody tr").eq(j).find("td").eq(i).find("div").html(a);
							jQuery(".data_table tbody tr").eq(j).find("td").eq(i).addClass("usedate");
							a++;
						}else{
						//超过了本月最后一天的部分
						jQuery(".data_table tbody tr").eq(j).find("td").eq(i).find("div").html("");
						jQuery(".data_table tbody tr").eq(j).find("td").eq(i).removeClass("usedate");
						a=days+1;
						}
					}
				}
			}
	    };
	 //初始化日历
	 var initdata=function(dutydateArr){
	 	if(dutydateArr!=undefined){
	 		dutyDate=dutydateArr;
	 	}

	 	var tdheight=jQuery(".data_table tbody tr").eq(0).find("td").width();
	 	jQuery(".data_table tbody td").css("height",tdheight);

	 	jQuery(".selectdate").val(thisyear+"年"+thismonth+"月");

	 	var days=getdaysinonemonth(thisyear,thismonth);
	 	var weekday=getfirstday(thisyear,thismonth);
	 	setcalender(days,weekday); 
	 	for (var i = 0; i < dutyDate.length; i++) {
	 		var dateArr= dutyDate[i].split('-');
	 		markdate(dateArr[0],dateArr[1],dateArr[2]); 
	 	}
	 };
	 var clear=function(){
	 	jQuery(".data_table tbody tr td").removeClass("tdselect");
	 }

	 return{
	 	dutyinit:function(dateArr,calenderId){
	 		window.onload=function(){
	 			inithtml(calenderId);
	 			initdata(dateArr);
	 			$('.data_table').popover({
							delay: { show: 100, hide: 200 },//显示和隐藏的时间
							html: true,// 为true的话，会解析content里的html代码
							trigger: 'hover',//触发方式
							selector: 'td.tdselect',//目标对象
							placement: 'auto',//弹出提示的位置
							content: function() {
								return '您有排班哦';

											 },//这里可以直接写字符串，也可以 是一个函数，该函数返回一个字符
											 title: function() {
											 	return $(this).find("div").html()+'日';
											 },
											 container: 'body'
											});
	 			 //上一个月
	 			 jQuery(".lastmonth").click(function(){                 
	 			 	thismonth--;
	 			 	if(thismonth==0){
	 			 		thismonth=12;
	 			 		thisyear--;
	 			 	}
	 			 	clear();
	 			 	initdata();
	 			 });
				 //上一个月
				 jQuery(".nextmonth").click(function(){                  
				 	thismonth++;
				 	if(thismonth==13){
				 		thismonth=1;
				 		thisyear++;
				 	}
				 	clear();
				 	initdata();
				 });
				}
			}
		}

	}();

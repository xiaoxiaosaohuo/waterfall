$(function(){
	$(window).on("load",function(){    //要用load事件
		imgLocation();
		var dataimg={"data":[{"src":"01.jpg"},{"src":"07.jpg"},{"src":"03.jpg"},{"src":"04.jpg"},{"src":"05.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"09.jpg"}]};
		window.onscroll=function(){
			if(scrollslide()){
				$.each(dataimg.data,function(index,value){
				var box=$("<div>").addClass("wrapper").appendTo($(".container"));
				var img=$("<div>").addClass("img").appendTo(box);
		
				$("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(img);
				
			});
				imgLocation();
			
		}
	};
	});
	
	
});

function scrollslide(){    //滚动加载函数
	var wrapper=$(".wrapper");   //
	var lastboxHeight=wrapper.last().get(0).offsetTop+Math.floor(wrapper.last().height()/2);//最后一张照片的离顶部高度加上自身一半
	var docHeight=$(window).height();//页面高度
	var scrollTop=$(window).scrollTop();//滚动的高度
	return (lastboxHeight<(docHeight+scrollTop))?true:false;
}
function imgLocation(){
	var wrapper=$(".wrapper");
	var boxWidth=wrapper.eq(0).width();
	var num=Math.floor($(window).width()/boxWidth);//一行能放图片的个数
	var boxArr=[];
	wrapper.each(function(index,value){			//遍历照片对象
		var boxHeight=wrapper.eq(index).height();//获得高度
		if(index<num){							//如果当前索引小于第一行照片数量
			boxArr[index]=boxHeight;			//将照片高度依次存入数组
			
			
		}else{									//否则就取得数组中的最小高度，并找出最小高度的照片索引位置
			var minboxHeight=Math.min.apply(null,boxArr);
			
			var minboxIndex=$.inArray(minboxHeight,boxArr);
		$(value).css({
			"position":"absolute",
			"top":minboxHeight,
			"left":wrapper.eq(minboxIndex).position().left,

		});
		boxArr[minboxIndex]+=wrapper.eq(index).height();//重新计算该位置高度
		};
	})
}

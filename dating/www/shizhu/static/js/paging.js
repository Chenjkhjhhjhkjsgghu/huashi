(function($, window, document, undefined) {
		//定义分页类
		function Paging(element, options) {
			this.element = element;
			//传入形参
			this.options = {
				pageNo: options.pageNo||1,
				totalPage: options.totalPage,
				totalSize:options.totalSize,
				callback:options.callback
			};
			//根据形参初始化分页html和css代码
			this.init();
		}
		//对Paging的实例对象添加公共的属性和方法
		Paging.prototype = {
			constructor: Paging,
			init: function() {
				this.creatHtml();
				this.bindEvent();
			},
			creatHtml: function() {
				var me = this;
				var content = "";
				var current = parseInt(me.options.pageNo);
				var total = me.options.totalPage;
				var totalNum = me.options.totalSize;
				//总页数大于6时候
				if(total > 6) {
					//当前页数小于5时显示省略号
					if(current < 5) {
						for(var i = 1; i < 6; i++) {
							if(current == i) {
								content += "<li  class='active'><a>" + i + "</a></li>";
							} else {
								content += "<li><a>" + i + "</a></li>";
							}
						}
						// content += "<a>"+total+"</a>";
					} else {
						 //判断页码在末尾的时候
						if(current < total - 3) {
							for(var i = current - 2; i < current + 3; i++) {
								if(current == i) {
									content += "<li  class='active'><a>" + i + "</a></li>";
								} else {
									content += "<li><a>" + i + "</a></li>";
								}
							}
							// content += "<a>"+total+"</a>";
						//页码在中间部分时候	
						} else {
							for(var i = total - 4; i < total + 1; i++) {
								if(current == i) {
									content += "<li class='active'><a>" + i + "</a></li>";
								} else {
									content += "<li><a>" + i + "</a></li>";
								}
							}
						}
					}
					//页面总数小于6的时候
				} else {
					for(var i = 1; i < total + 1; i++) {
						if(current == i) {
							content += "<li class='active'><a>" + i + "</a></li>";
						} else {
							content += "<li><a>" + i + "</a></li>";
						}
					}
				}
				if (current == 1) {
					content = "<li class='prev disabled'><a id=\"firstPage\">首页</a></li>" + content;
				} else {
					content = "<li class='prev'><a id=\"firstPage\">首页</a></li>" + content;
				}
				if (current == total) {
					content += "<li class='next disabled'><a id=\"lastPage\">末页</a></li>";
				} else {
					content += "<li class='next'><a id=\"lastPage\">末页</a></li>";
				}
				me.element.html(content);
			},
			//添加页面操作事件
			bindEvent: function() {
				var me = this;
				me.element.off('click', 'a');
				me.element.on('click', 'a', function() {
					var num = $(this).html();
					var id=$(this).attr("id");
					if(id == "prePage") {
						if(me.options.pageNo == 1) {
							me.options.pageNo = 1;
						} else {
							me.options.pageNo = +me.options.pageNo - 1;
						}
					} else if(id == "nextPage") {
						if(me.options.pageNo == me.options.totalPage) {
							me.options.pageNo = me.options.totalPage
						} else {
							me.options.pageNo = +me.options.pageNo + 1;
						}
	
					} else if(id =="firstPage") {
						me.options.pageNo = 1;
					} else if(id =="lastPage") {
						me.options.pageNo = me.options.totalPage;
					}else{
						me.options.pageNo = +num;
					}
					me.creatHtml();
					if(me.options.callback) {
						me.options.callback(me.options.pageNo);
					}
				});
			}
		};
		//通过jQuery对象初始化分页对象
		$.fn.paging = function(options) {
			return new Paging($(this), options);
		}
	})(jQuery, window, document);

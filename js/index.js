$(function() {

	$.ajax({
		url: overall.origin + "api/db/GetAccountList",
		type: 'get',
		data: {},
		contentType: "application/json",
		dataType: 'json',
		success: function(res) {
			if(res.length > 0) {
				$.each(res, function(i, e) {
					var _html = '<li class="list-li">' +
						'<div class="list_1">' + this.Id + '</div>' +
						'<div class="list_2">' + this.Account + '</div>' +
						'<div class="list_3">' + this.FileKey + '</div>' +
						'<div class="list_4">' + this.LastSyncTime + '</div>' +
						'<div class="btn-delete list_5" data-id="' + this.Id + '">' +
						'<img src="img/r_1.png"/>' +
						'<span>删除</span>' +
						'</div>' +
						'</li>';
					$(".list-ul").append(_html);
				});
				var _time = res[res.length - 1].LastSyncTime;
				$(".time").text(_time);
				localStorage.setItem("time", _time);
			}
		}
	});
	//添加
	$("body").on("click", ".btn-add", function() {
		var _adderss = $("#adderss").val();
		var _key = $("#key").val();
		if(!_adderss) {
			overall.msg("请输入Address");
			return false;
		}
		if(!_key) {
			overall.msg("请输入Date Key");
			return false;
		}
		$.ajax({
			url: overall.origin + "api/db/AddUserDataAccount",
			type: 'post',
			data: {
				ContractAddress: "0x236a6142e9a74f165d08403562973149128a147d",
				Account: _adderss,
				FileKey: _key,
			},
			contentType: "application/x-www-form-urlencoded",
			dataType: 'json',
			success: function(res) {
				if(res.result == true) {
					overall.msg("添加成功");
					localStorage.setItem("address", _adderss);
					setTimeout(function() {
						location.reload();
					}, 2000)
				} else {
					overall.msg(res.error);
				}
			}
		});
	});
	//删除
	$("body").on("click", ".btn-delete", function() {
		var _id = $(this).attr("data-id");
		$.ajax({
			url: overall.origin + "api/db/DeleteAccount",
			type: 'post',
			data: {
				Id: _id
			},
			contentType: "application/x-www-form-urlencoded",
			dataType: 'json',
			success: function(res) {
				if(res.result == true) {
					overall.msg("删除成功");
					setTimeout(function() {
						location.reload();
					}, 2000)
				} else {
					overall.msg(res.error);
				}
			}
		});
	});

});
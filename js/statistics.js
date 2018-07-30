$(function() {

	laydate.render({
		elem: '#startDate',
		theme: 'molv',
	});
	laydate.render({
		elem: '#endDate',
		theme: 'molv'
	});
	var _address = localStorage.getItem("address");
	var _time = localStorage.getItem("time");
	$(".time").text(_time);
	$(".btn-add").on("click", function() {
		var _start = $("#startDate").val();
		var _end = $("#endDate").val();
		var bl = checkEndTime(_start, _end);
		if(!bl) {
			overall.msg("结束时间必须大于开始时间");
			return false;
		}
		ajax_list();
	});
	ajax_list();

	function ajax_list() {
		var _DateStart = $("#startDate").val();
		var _DateEnd = $("#endDate").val();
		$.ajax({
			url: overall.origin + "api/db/QueryHealthPressure",
			type: 'post',
			data: {
				Account: "0x975868c4032B1d2315995AD65fB87F5dd23595e7",//_address,
				DateStart: _DateStart,
				DateEnd: _DateEnd,
			},
			contentType: "application/x-www-form-urlencoded",
			dataType: 'json',
			success: function(res) {
				if(res.result == true) {
					lineChart(res.items);
				} else {
					overall.msg(res.error);
				}
			}
		});
	}

	function lineChart(data) {

		var _date = [];
		var _highPressure = [];
		var _lowPressure = [];
		var _pulse = [];
		$.each(data, function(i, e) {
			if(i < 10) {
				var _time = formatDate(this.buildTime);
				_date.push(_time);
				_highPressure.push(this.highPressure);
				_lowPressure.push(this.lowPressure);
				_pulse.push(this.pulse);
			}
		});
		var lineChartData = {
			labels: _date,
			datasets: [{
					label: "highPressure",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: _highPressure
				},
				{
					label: "lowPressure",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: _lowPressure
				},
				{
					label: "pulse",
					fillColor: "rgba(238,232,170,0.2)",
					strokeColor: "rgba(238,232,170,1)",
					pointColor: "rgba(238,232,170,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(238,232,170,1)",
					data: _pulse
				}
			]

		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true
		});
	}
	//日期之间比较大小
	function checkEndTime(startDate, endDate) {
		var start = new Date(startDate.replace("-", "/").replace("-", "/"));
		var end = new Date(endDate.replace("-", "/").replace("-", "/"));
		if(end < start) {
			return false;
		}
		return true;
	}

	function formatDate(date) {
		var result = "";
		if(date) {
			var endTime = new Date(date),
				oYear = endTime.getFullYear(),
				oMonth = parseInt(endTime.getMonth() + 1) < 10 ? '0' + (endTime.getMonth() + 1) : endTime.getMonth() + 1,
				oDay = parseInt(endTime.getDate()) < 10 ? '0' + endTime.getDate() : endTime.getDate(),
				oHour = parseInt(endTime.getHours()) < 10 ? '0' + endTime.getHours() : endTime.getHours(),
				oMin = parseInt(endTime.getMinutes()) < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes(),
				oSen = endTime.getSeconds();
			result = oMonth + "-" + oDay + " " + oHour + ":" + oMin;
		}
		return result;
	}

});
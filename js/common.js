var overall = {
	origin: 'http://127.0.0.1:8081/',
	msg: function(t) {
		var msg = $(".msg");
		var timer;
		msg.remove();
		clearTimeout(timer);
		var div = '<div class="msg"><span>' + t + '</span></div>';
		$("body").append(div);
		$(".msg").fadeIn(300);
		timer = setTimeout(function() {
			$(".msg").fadeOut(300);
		}, 3000);
	},
};
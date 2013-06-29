$(function() {
	$("#myp").html("The script works");
	$('#myp').load('ajax/data.html', function() {
		$('#myp').append("..and the callback fired like a boss");
	});
});
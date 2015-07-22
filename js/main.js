function checkSearch(){
	var search = $("#searchText").val();
	if (search == '') {
		$("#searchModal").modal();
	}
	else{
		$("#search").submit();
	}
}

function forwardToZone(){
	window.location.href="zone.html";
}
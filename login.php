<?php
	
	$email = $_REQUEST['email'];
	if ($email == '1119303512@qq.com') {
		$valid = true;
	}
	else{
		$valid = false;
	}
	echo json_encode(array(
    	'valid' => $valid,
	));

	
?>
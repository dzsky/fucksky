<?php
	$param = $_REQUEST['action'];
	$page = $_REQUEST['page'];

	if ($page == 2) {
		$data = array(
				'1' => array(
					'number' => '001',
					'name' => '年轮',
					'type' => '视频',
					'time' => '2015.07.23',
					'views' => '123'
				),
				'2' => array(
					'number' => '002',
					'name' => '年轮',
					'type' => '音频',
					'time' => '2015.07.23',
					'views' => '108'
				)
			);
	}
	else{
	$param = 'upload';
	switch ($param) {
		case 'upload':
			$data = array(
				'1' => array(
					'number' => '001',
					'name' => '年轮',
					'type' => '视频',
					'time' => '2015.07.23',
					'views' => '123'
				),
				'2' => array(
					'number' => '002',
					'name' => '年轮',
					'type' => '音频',
					'time' => '2015.07.23',
					'views' => '108'
				),
				'3' => array(
					'number' => '003',
					'name' => '年轮',
					'type' => '视频',
					'time' => '2015.07.23',
					'views' => '26'
				)
			);
			break;
		
		default:
			# code...
			break;
	}
}

$data = array(
				'1' => array(
					'number' => '001',
					'name' => '年轮',
					'type' => '视频',
					'time' => '2015.07.23',
					'views' => '123'
				),
				'2' => array(
					'number' => '002',
					'name' => '年轮',
					'type' => '音频',
					'time' => '2015.07.23',
					'views' => '108'
				),
				'3' => array(
					'number' => '003',
					'name' => '年轮',
					'type' => '视频',
					'time' => '2015.07.23',
					'views' => '26'
				)
			);

			
	echo json_encode($data);
?>
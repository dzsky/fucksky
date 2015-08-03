<?php
	$playNowPage = $_REQUEST['page'];
	if ($playNowPage == 2) {
			$playInfo = array(
			'1' => array(
				'videoImage' => 'images/movie-1.jpg',
				'videoName' => '大圣归来',
				'videoViews' => '233'
			),
			'2' => array(
				'videoImage' => 'images/movie-1.jpg',
				'videoName' => '大圣归来',
				'videoViews' => '233'
			),
			'3' => array(
				'videoImage' => 'images/movie-1.jpg',
				'videoName' => '大圣归来',
				'videoViews' => '233'
			),
			'4' => array(
				'videoImage' => 'images/movie-1.jpg',
				'videoName' => '大圣归来',
				'videoViews' => '233'
			),
		);
	}
	else{



	$playInfo = array(
		'1' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'2' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'3' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'4' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'5' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'6' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'7' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'8' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'9' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'10' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'11' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '233'
		),
		'12' => array(
			'videoImage' => 'images/movie-1.jpg',
			'videoName' => '大圣归来',
			'videoViews' => '23'
		)
	);
}

	echo json_encode($playInfo);
?>
<?php
	$target_dir = "../upload/images";
	
	if(!file_exists($target_dir)){
		mkdir($target_dir, 0777, true);
	}

	$target_dir = $target_dir . "/" . (count(scandir($target_dir)) - 1) . "_" . rand() . ".jpeg";
	
	if(move_uploaded_file($_FILES['image']['tmp_name'], $target_dir)){
		echo "Upload succesful!";
	} else {
		echo "Sorry, something went wrong...";
	}
	
	include 'sendAllImagesAsLinksToDatabase.php';
?>
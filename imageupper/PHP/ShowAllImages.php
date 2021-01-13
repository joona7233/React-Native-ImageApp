<?php
	error_reporting(E_ERROR | E_PARSE);

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "imageapp";	
		
	$con = new mysqli($servername, $username, $password, $dbname);
	$sql = "SELECT * FROM images";
	
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  exit();
	}
	
	//$numResults = mysqli_num_rows($result);
	$counter = 0;

	//echo "<span style='white-space: pre-line'>";
	
	if ($result = mysqli_query($con, $sql)) {
		
		$numResults = $result->num_rows;
			
		echo "[\n";
	  // Fetch one and one row
		while ($row = mysqli_fetch_array($result)) {
			echo "{". '"' . "id" . '"' . ":" . $row['id'] . "," . '"' . "get_image" . '"' . ":" . $row['image_url'] . "}";
			//echo "{" + '"' + "id" + '"' + ":" + $row['id'] + "}";
			$row['image_url'];
			if(++$counter != $numResults) {
				echo(",");
			}  	    	  

		echo("\n");
	  }
	  
	echo "]";	  
	  mysqli_free_result($result);
	}
	
	//echo "</span>";
?>
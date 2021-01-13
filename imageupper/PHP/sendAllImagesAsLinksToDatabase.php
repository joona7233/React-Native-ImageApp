<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "imageapp";	
	
	// Create connection
	
	// Check connection
	/*
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	*/
	
	
	// SELECT
	/*
	$conn = new mysqli($servername, $username, $password, $dbname);
	$result = mysqli_query($conn, "SELECT * FROM imageapp.images");
	
	$urls = [mysqli_num_rows[$result]];
	$i = 0;
	
	while($row = mysqli_fetch_array($result)){
		$urls[$i] = $row['url'];
		$i++;
	}
	*/
	
	$urls = [];
	$i = 0;
	
	// Get all images from directory
	if ($handle = opendir('../upload/images/')) {

    while (false !== ($entry = readdir($handle))) {

        if ($entry != "." && $entry != "..") {

			// 88.193.165.145:723/upload/images/
            $urls[$i] = ('"'."http://88.193.165.145:723/imageupper/upload/images/" . $entry . '"');
			$i++;
			
			//echo "--> " . $entry . "<br>";
        }
    }
		closedir($handle);
	}
	
	
	//for($h=0; $h < count($urls); $h++)
	//	echo "-----------> " . $urls[$h] . "<br>";
	
	
	// Delete alll from array
	$conn = new mysqli($servername, $username, $password, $dbname);
	$result = mysqli_query($conn, "TRUNCATE imageapp.images"); // <-- works
	//$result = mysqli_query($conn, "INSERT INTO imageapp.images(id, image_url) values(0, 'test')"); // <-- works
	if($conn->query($result) === TRUE)
		echo "Success!";
	
	
	// Insert image names to database
	//for($j=count($urls); $j >= 0; $j--){	
	  for($j=0; $j < count($urls); $j++){
		if($urls[$j] != null && strlen($urls[$j]) > 0)
		{
			$conn = new mysqli($servername, $username, $password, $dbname);
			$result = mysqli_query($conn, "INSERT INTO imageapp.images(id, image_url) values(0, '".$urls[$j]."')"); // <-- works
			//$result = mysqli_query($conn, "INSERT INTO imageapp.images(id, image_url) values(0, 'test')"); // <-- works
			if($conn->query($result) === TRUE)
				echo "Success!";	

			//echo $urls[$j] . "<br>" . "BRUH";			
		}		

	}



	
			
	$conn->close();
	
?>
<?php
header("Content-Type: application/json");
$ivegot = stripslashes(file_get_contents("php://input"));
$obj = json_decode($ivegot, true);

$clientID = "9233f55baed75bca049d4a8d53a8f50c";
$clientSecret = "111159eb0d3760732e2cedefbe1abb2b1aa07f2570bbcf7d5db0d690c1139faa";

$clientID_2 = "c1ea7e96842da6e2ad262f129d4a309e";
$clientSecret_2 = "b57e24945a94768ccf516e7c32dd66cfbbaf20aab4454cbd2220841c79284937";

if($obj["cid"]=="1"){
	$data = array(
	 "clientId" => $clientID,
	 "clientSecret" => $clientSecret,
	 "script" => urldecode($obj["script"]),
	 "stdin" => urldecode($obj["stdin"]),
	 "language" => "cpp17",
	 "versionIndex" => "1",
	);
}
else{
	$data = array(
	 "clientId" => $clientID_2,
	 "clientSecret" => $clientSecret_2,
	 "script" => urldecode($obj["script"]),
	 "stdin" => urldecode($obj["stdin"]),
	 "language" => "cpp17",
	 "versionIndex" => "1",
	);
}

$post_data = json_encode($data);

$headers = [
    'Content-Type: application/json',
];

	// api 호출
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://api.jdoodle.com/v1/execute");
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);	
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	//curl_setopt($curl, CURLOPT_TIMEOUT, 10); 

	$response = curl_exec($ch);

	curl_close($ch);

	echo $response;
?>

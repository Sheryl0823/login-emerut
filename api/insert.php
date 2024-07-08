<?php
    $CN = mysqli_connect("localhost", "root", "", "account");

    // Check connection
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $email = mysqli_real_escape_string($CN, $DecodedData['email']);
    $fullname = mysqli_real_escape_string($CN, $DecodedData['fullname']);
    $age = mysqli_real_escape_string($CN, $DecodedData['age']);
    $password = mysqli_real_escape_string($CN, $DecodedData['password']);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $insertMemberData = "INSERT INTO users (email, fullname, age, password) 
                         VALUES ('$email', '$fullname', '$age', '$hashed_password')";

    if (mysqli_query($CN, $insertMemberData)) {
        $Message = "Successfully Registered!!!";
    } else {
        $Message = "Server Error... please try later";
    }

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);

    // Close database connection
    mysqli_close($CN);
?>

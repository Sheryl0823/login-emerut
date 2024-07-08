<?php

$conn = mysqli_connect('localhost', 'your_db_user', 'your_db_password', 'account');
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

if (!isset($decodedData['email']) || !isset($decodedData['password'])) {
    $response = array("Message" => "Invalid input");
    echo json_encode($response);
    exit;
}
$UserEmail = mysqli_real_escape_string($conn, $decodedData['email']);
$UserPW = mysqli_real_escape_string($conn, $decodedData['password']);

// Check if the email exists in the database
$SQL = "SELECT * FROM users WHERE email = '$UserEmail'";
$exeSQL = mysqli_query($conn, $SQL);

if (!$exeSQL) {
    $response = array("Message" => "Query failed: " . mysqli_error($conn));
    echo json_encode($response);
    exit;
}

$checkEmail = mysqli_num_rows($exeSQL);

if ($checkEmail > 0) {
    // Email exists, verify password
    $arrayu = mysqli_fetch_array($exeSQL);
    $hashedPasswordFromDB = $arrayu['Password'];

    if (password_verify($UserPW, $hashedPasswordFromDB)) {
        $Message = "Success";
    } else {
        $Message = "Password incorrect";
    }
} else {
    $Message = "No account found";
}

$response = array("Message" => $Message);
echo json_encode($response);
mysqli_close($conn);
?>

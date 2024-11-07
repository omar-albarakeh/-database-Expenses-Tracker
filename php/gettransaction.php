<?php
require "../php/db.php";

$user_id = $_GET['user_id'];
$sql = "SELECT * FROM transactions WHERE user_id = $user_id ORDER BY created_at DESC";
$result = $conn->query($sql);

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);
?>

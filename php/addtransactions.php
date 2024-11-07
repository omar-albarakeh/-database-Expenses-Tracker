<?php
require "../php/db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];
    $type = $_POST['type'];
    $amount = $_POST['amount'];
    $notes = $_POST['notes'];

    $stmt = $conn->prepare("INSERT INTO transactions (user_id, type, amount, notes) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $user_id, $type, $amount, $notes);

    if ($stmt->execute()) {
        echo json_encode(["status" => "Transaction added successfully"]);
    } else {
        echo json_encode(["status" => "Error adding transaction"]);
    }
}
?>

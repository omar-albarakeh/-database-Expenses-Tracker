<?php
include "../php/db.php";

parse_str(file_get_contents("php://input"), $_DELETE);
$id = $_DELETE['id'];

$query = $connection->prepare("DELETE FROM transactions WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();

echo json_encode(["message" => "Transaction deleted"]);
?>

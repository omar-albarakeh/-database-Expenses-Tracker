<?php
$host='localhost';
$dbname='expense-tracker';
$dbuser='root';
$dbpass='';

$connection=new msqli($host,$dbuser,$dbpass,$dbname);
if($connection->connect_error){
    die("error !!!!!!!!!!!!");
}
?>
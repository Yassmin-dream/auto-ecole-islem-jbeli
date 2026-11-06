<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") { http_response_code(405); exit("error"); }
$clean = fn($k) => str_replace(["|", "\r", "\n"], " ", strip_tags(trim($_POST[$k] ?? "")));
$first = $clean("firstname"); $last = $clean("lastname");
$phone = $clean("phone");     $dob  = $clean("dob");
if ($first === "" || $last === "" || $phone === "") { http_response_code(400); exit("error"); }
$line = "[" . date("Y-m-d H:i:s") . "] Name: $first $last | Phone: $phone | DOB: $dob" . PHP_EOL;
// Written once (the old file wrote every lead twice)
if (file_put_contents(__DIR__ . "/leads.txt", $line, FILE_APPEND | LOCK_EX) !== false) echo "success";
else { http_response_code(500); echo "error"; }

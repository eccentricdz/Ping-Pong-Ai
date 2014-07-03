<?php
if(isset($_COOKIE['nick']))
{
	header("location: ai.php");
}
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="font-awesome.min.css" />
<link rel="stylesheet" href="style.css">
<script src="js/jquery-1.8.2.js"></script>

<title>Ping-Pong</title>
</head>

<body>
<center>
<div id="intro">
<img id='log' src="logo.png" width = "250px">
<form action="ai.php" method="post" class="nick">
<i class="icon-user icon-2x"></i>
<input id="nick" name="nick"  type="text" placeholder="Enter your nick" >
</form>
</div>
</center>
</body>
</html>

<?php
if(!isset($_COOKIE['nick']))
{
	setcookie('nick',$_POST['nick']);
	$nicks = fopen('nicks.txt','a');
fwrite($nicks,$_POST['nick']." : ".date('y-m-d')."\n");
fclose($nicks);
}

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Ping-Pong-Ai</title>
<script src="js/jquery-1.8.2.js"></script>
<script src="ping-pong-ai.js"></script>
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="../FortAwesome-Font-Awesome-v3.0.0-2-g16b6298/FortAwesome-Font-Awesome-16b6298/css/font-awesome.min.css" />
</head>

<body>
<audio preload="true" id="collide">
	<source src="tiing.mp3" />
	<source src="http://dl.dropbox.com/u/26141789/canvas/pingpong/Metal%20Cling%20-%20Hit.wav" />
</audio>
<div id="infowrapper">
<?php
if(isset($_POST['nick']))
echo("<p id='nik'>".$_POST['nick']."</p>");
elseif(isset($_COOKIE['nick']))
echo("<p id='nik'>".$_COOKIE['nick']."</p>");

?>
<p id='ys' class="desc">Your Score : </p>
<p class="info" id='score'>0</p>
<p class="desc">Ai Level : <span class="info" id="ai">1</span></p>
<ul id='lives'>
</ul></br>
<p id='hscore'><i class="icon-star" title="Highest Score"></i>&nbsp;&nbsp;<span id='hs'></span> </p>
</div>
<p id="msg"></p>
<p id="secmsg"></p>
<canvas id="myCanvas"></canvas>
</body>
</html>

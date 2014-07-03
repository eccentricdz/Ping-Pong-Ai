<?php
$hscore = fopen('hscore.txt','r+');	
if(isset($_POST['score']))
{
fwrite($hscore, $_COOKIE['nick']." : ".$_POST['score']."\n");
}
else
echo(fgets($hscore));
fclose($hscore);
?>
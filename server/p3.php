<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
		<title>Restaurant Information</title>
		<link href="mystyle.css" rel="stylesheet">
    </head>
    <body>
        <center>
		<table width="800" align="center">
			<tr align="center">
			<td bgcolor="#cccccc"><h1>Restaurant Information</h1></td>
			</tr>
		</table>
		<a href="p3.php?value=sort"><font color="#FF0000"><u>sort by rating</u></font></a>
		<br>
		<br>
		<table border="0" cellspacing="1" cellpadding="4" width="1050" align="center">
			<tr align='center'>
				<th bgcolor="#cccccc">name</th>
				<th bgcolor="#cccccc">website</th>
				<th bgcolor="#cccccc">price</th>
				<th bgcolor="#cccccc">rating</th>
			</tr>
            <?php
				$data=file_get_contents('merge.json');
				$data=json_decode($data);
				//$data=$data[0];
				$value=empty($_GET["value"])?"":$_GET["value"];
				if($value=="sort"){
					$temp_data=[];
					for($i=0;$i<count($data);$i++){
						$temp_data[(string)$i]=$data[$i]->rating;
						
					}					
					arsort($temp_data);					
					$td=[];
					$i=0;
					foreach($temp_data as $k=>$v){
						$td[$i]=$data[(integer)$k];
						$i++;
					}
					$data=$td;
				}
					
				foreach($data as $d){
					echo "<tr align='center'>";
					echo "<td bgcolor='#afeeee'>".$d->name."</td>";
					echo "<td bgcolor='#afeeee'><a href='".$d->href."'>".$d->href."</a></td>";
					echo "<td bgcolor='#afeeee'>".$d->price."</td>";
					echo "<td bgcolor='#afeeee'>".$d->rating."</td>";
					echo "</tr>";
				}
			?>
        </center>
    </body>
</html>
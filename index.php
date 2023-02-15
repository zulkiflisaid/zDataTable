<!doctype html>
<html lang="en">   
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="http://localhost/vanila-router-master/zdatatable/" target="_blank"> 
  <link rel="stylesheet" href="<?php echo "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>public/css/style.css" >    
   
<title>Go-POS</title>
 </head>
<body>
<div id="app" class="">
  <div id="contoh"></div> 
</div> 
<script>  
	function tombolAksi( v ){ 
		 console.log(v.value);
}
</script>  
<script type="module"  src="<?php echo "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>public/js/zDataTable.js">  
	  console.log(app);
</script> 
</body> 
</html>
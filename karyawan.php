<?php 
	
	
	header("Content-Type: application/json; charset=UTF-8");

	sleep(1);//melihat animasi loading

	 
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "quasar_pos";
	$port = 33068;

	  $data=array();  
 
	  $col = isset($_GET['col']) ? trim($_GET['col']) : 'name'; 
	  $sort = isset($_GET['sort']) ? trim($_GET['sort']) : 'asc'; 
	  $operator = isset($_GET['operator']) ? trim($_GET['operator']) : '='; 
	  $cari = isset($_GET['cari']) ? trim($_GET['cari']) : null; 
	  $page = isset($_GET['page']) ? (int)trim($_GET['page']) : 1; 
	  $limit = isset($_GET['limit']) ? (int)trim($_GET['limit']) : 10;
	  $skip =  ($page - 1) * $limit; 
	  
	   /*cek cari*/
	  $sql_cari='';
	  if(!is_null($cari)){
		$sql_cari=' WHERE name=:cari OR gaji=:cari OR email=:cari   ';
		if($operator=='like'){
		   $sql_cari=' WHERE name LIKE :cari OR gaji LIKE :cari OR email LIKE :cari';  
		   $cari ="%{$cari}%";
		} 
	  } 
	   
	   /*cek limit*/
	  $sql_limit='';
	  if($limit>0 and $page>0){
		 $sql_limit='LIMIT :skip, :limit';
	  } 

	   
	  
	   /*cek ORDER BY*/ 
	  $sql_order_by="ORDER BY :col :sort";
	  if($col!=''){
		//  $order_by=$col;
	  } 
	 
try {
	  
	  /*koneksi*/
	  $conn = new PDO("mysql:host=$servername;dbname=$dbname;port=$port", $username, $password);
	  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 
		 
	  /*sql baris data*/	 
	  $stmt = $conn->prepare("SELECT * FROM karyawan {$sql_cari}  {$sql_order_by} {$sql_limit}");
	  if(!is_null($cari)){
			$stmt->bindValue(':cari', $cari, PDO::PARAM_STR);
	   }  
	   $stmt->bindValue(':col', $col, PDO::PARAM_STR);
	   $stmt->bindValue(':sort', $sort, PDO::PARAM_STR);
	  
	  if($limit>0 and $page>0){
		 $stmt->bindValue(':skip', (int) trim($skip), PDO::PARAM_INT);
		 $stmt->bindValue(':limit', (int) trim($limit), PDO::PARAM_INT);
	  }   
	  $stmt->execute();
	   
	   
	   /*sql total data*/
	   $stmt_total = $conn->prepare("SELECT  count(*)  FROM karyawan {$sql_cari} ");  
	   if(!is_null($cari)){
			$stmt_total->bindValue(':cari', $cari, PDO::PARAM_STR);
	   }  
	   $stmt_total->execute( );  
		 
	   
	   //total Record
	   $totalRecord=$stmt_total->fetchColumn();
	   
	   /*repon json*/
	  $data['sql'] ="SELECT * FROM karyawan {$sql_cari}  {$sql_order_by} {$sql_limit}" ; 
	  $data['page'] =$page ; 
	  $data['limit'] =$limit ;
	  $data['totalRecord'] =$totalRecord;
	  $data['data'] =$stmt->fetchAll( PDO::FETCH_ASSOC); 
	  $data['message'] = $totalRecord == 0 ?'Data Kosong':'';  
	     
	   
} catch(PDOException $e) {
	  //echo "Error: " . $e->getMessage(); 
	  $data['page'] = $page ; 
	  $data['limit'] =$limit ;
	  $data['totalRecord'] =0;
	  $data['data'] = []; 
	  $data['message'] = $e->getMessage(); 
	 
}
$conn = null;
echo json_encode($data );  


 

?> 
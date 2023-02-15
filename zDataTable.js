import goTek from "./goTek.js";
class zDataTable {
		 
	constructor(id,config){ 
		this.id =  id;  
		this.container = config.container.querySelector('#'+id); //div tempat tabel   //untuk mempercepat node digunakan div parent
		this.url = config.url; //url ajax  
		this.header = config.header;  //token api
		this.colom= config.colom; //colom table atau tr
		this.sortCol= config.sortCol; //colom shor default  
		this.limit= Number(config.limit) ; //default halaman 
		this.combo = config.combo;  // [5,10,15,25, 50,100, 500, 1500, 'Semua']
		
		
		
		this.operator = '=';  //operator pencarian data  
		this.letakPaging = 'right'; //right left center
		this.color = 'blue'; //green blue red
		this.jumlahTombol = 3; //jumlah halaman ke kanan dan kiri dari halaman yang aktif   
		this.page = 1;  
		this.records = 0;//total data
		
		
		this.cari = '';     
		this.cssBtn='bar-item button'; 	
		this.template =`
				<select class="round select border white" name="option" style="width:100px;padding-left:8px">
				<option value="" disabled >Halaman</option></select>  
				<div class="right" style="width:200px"><input id="search${this.id}" class="round input border" type="search" placeholder="Cari"></div> 
				<table id="table${this.id}" class="table-all hoverable border striped" style="width:100%;margin-top:8px;min-width:600px;"><thead></thead><tbody></tbody></table>
				<div class="left margin-top p-t" id="total${this.id}">Total Data</div>
			    <div class="cell margin-top right" id="paging${this.id}"></div>
                <div id="loading${this.id}" class="paging shine show"><div><i class="fa fa-spinner spin" style="font-size:64px"></i>Loading...</div></div>`;
				 
	    //style container 
	     this.container.classList.add("ztable","display-container1","padding","prevent-select"); 
		 this.container.style.cssText  = 'position:relative; overflow-y: hidden; overflow-x: auto;  min-width:580px;'; 		
	} 
	
	run() { 
		  let ini = this; 
		  let template =goTek.parseDOM(this.template,'text/html').children; 
		  let fragment = document.createDocumentFragment();
		  let select = template[0];
		  let divsearch = template[1];
		  let inputSearch = template[1].firstChild;
		  let table = template[2];
		  let thead = table.firstChild;
		  let tbody = table.lastChild;
		  let divtotal = template[3];
		  let divpaging = template[4];
		  let divloading = template[5];  
		 
		 /*create select combobox*/
		   this.combo.forEach((val) => {
				let option = document.createElement('option');
				if(val=='Semua') {
				   option.setAttribute('value','0'); 
				}else{
					 option.setAttribute('value',val);  
				} 
				if(val==ini.limit)  { 
					option.setAttribute('selected','selected');	
				}
				option.textContent = val;
				select.appendChild(option);
		   }); 
		   /*event select*/
		   select.onchange=function(){
				let halamanLompat = Math.ceil(ini.records  / this.value);
				ini.limit=this.value; 
				if(ini.limit>halamanLompat){
					ini.page =halamanLompat; 
				} 
				if(ini.limit==0){
					ini.page =1; 
				} 
			   ini.reload(ini.page);
		   };
			
		/*create colom table*/
		let tr = document.createElement('tr');
		tr.classList.add("light-grey"); 
		
		for (let i = 0; i <  this.colom.length; i++) {
			let th = document.createElement('th'); 
            th.setAttribute("data-name",this.colom[i].name); 
            th.setAttribute("data-format",this.colom[i].format); 
			th.innerHTML =  this.colom[i].header; 
			
			/*lebar kolom*/
			if(this.colom[i].width!='' ){
			   th.style.cssText  = `width:${this.colom[i].width};`; 
			}
			
			/*class kolom*/
			let cls=this.colom[i].class.split(" ");
			for (let x = 0; x < cls.length; x++) {
			   if(cls[x]!=''){
			       th.classList.add(cls[x]); 
			   }
			}
			 		
			/*sort kolom*/
			if(this.colom[i].sort ){
                th.classList.add("ztable-th-sort"); 
			    th.setAttribute("data-sort","true");  
			    
				
				/*event click kolom sort asc dan desc*/
				th.onclick=function(){   
				    let col=this.dataset.name;
				    let sort=ini.sortCol.sort=='asc' ?'desc' :'asc'; 
					/*jika tetap pada kolom yg sama*/
					if(this.dataset.name==ini.sortCol.col){ 
					     this.classList.remove("ztable-th-asc","ztable-th-desc","ztable-th");  
						 this.classList.add("ztable-th"); 
					}else{
					    for (let y = 0; y <  ini.colom.length; y++) { 
						  if(ini.colom[y].sort ){ 
						    tr.cells[y].classList.remove("ztable-th-asc","ztable-th-desc");  
						    tr.cells[y].classList.add("ztable-th");  
						   } 
				       }
					}
				    ini.sortCol.col=this.dataset.name;
				    ini.sortCol.sort=sort;  
				    th.classList.add("ztable-th-"+sort);  
					ini.reload(ini.page); 
				 };   
				if(this.colom[i].name==this.sortCol.col ){ 
					 th.classList.add("ztable-th-"+this.sortCol.sort);  
			    }else{
				    th.classList.add("ztable-th");  
				} 
			}  
			
			tr.appendChild(th);
		} 
		thead.appendChild(tr); table.appendChild(thead); table.appendChild(tbody); 
 
		//event inputSearch enter
		inputSearch.onkeyup=function(e){
		       ini.page=1; 
			   ini.cari=this.value; 
			   ini.reload(ini.page);
		}

		//muat data ajax
		this._ajax();

		//muat semua tag ke dalam halaman web 
		fragment.appendChild(select);
		fragment.appendChild(divsearch); 
		fragment.appendChild(table); 
		fragment.appendChild(divtotal);
		fragment.appendChild(divpaging);
		fragment.appendChild(divloading); 
		this.container.appendChild(fragment);
	}
  
    reload(p) {    
		 this.page=Number(p) ;  
		 this._blur(true);
         //muat data ajax
         this._ajax();
    }
	
    _paging( ){
	     
	          this.container.querySelector('#paging'+this.id).remove(); 
	          let ini=this;
              let html='';
              let page=Number(this.page);
	          let jumlahTombol=this.jumlahTombol;
			  let color=this.color;  
			  let defaultClass=this.cssBtn;  
              let prev=0;
              let link_active='';  
              let next=0;   
              let jumlahPage = this.limit >0 ?  Math.ceil(this.records / this.limit) : 1;   
			  let start_number = ( page >  jumlahTombol) ? page  -  jumlahTombol : 1;  ;
               let end_number = (page < Number(jumlahPage)  -  jumlahTombol) ? page  +  jumlahTombol : jumlahPage;
			   if(this.records==0){  start_number=0; end_number=-1;}
		 
			  //tombol awal dan back
              if(page == 1 || this.records==0){
                html+= '<div class="'+defaultClass+' disabled">Awal</div>';
                html+= '<div class="'+defaultClass+' disabled" >&laquo;</div>';
              } else {
                prev = (page > 1) ? page-1  : 1;
                html+= '<div class="'+defaultClass+' ok hover-'+color+' "  data-page="1">Awal</div>';
                html+= '<div class="'+defaultClass+' ok hover-'+color+' "  data-page="'+prev+'">&laquo;</div>'; 
              }

               //tombol antara back dan next   
              for(let  i =  start_number;  i <= end_number;  i++){
                 link_active = (page==i)? 'hover-'+color+' '+color : 'ok hover-'+color+'';  
				 html+= '<div class="'+defaultClass+' '+link_active+' '+link_active+' "  data-page="'+i+'">'+i+'</div>'; 
              }
              
			   //tombol akhir dan next
              if(page ==  jumlahPage || this.records==0){ 
				 html+= '<div class="'+defaultClass+' disabled" >&raquo;</div>';
				 html+= '<div class="'+defaultClass+' disabled" >Akhir</div>';
              } else {
                next = (page <  jumlahPage) ? page+1 : jumlahPage; 
				 html+= '<div class="'+defaultClass+' ok hover-'+color+'  "  data-page="'+next+'  ">&raquo;</div>'; 
				 html+= '<div class="'+defaultClass+' ok hover-'+color+' "  data-page="'+jumlahPage+' ">Akhir</div>'; 
              }
			   
			   let doc=goTek.parseDOM('<div class="cell margin-top '+this.letakPaging+'" id="paging'+this.id+'"><div class="bar border round" >'+ 
				   html+'</div></div>','text/html').firstChild; 
					doc.querySelectorAll(".ok").forEach((btnOn) => {
							 btnOn.onclick=function(){   
								 ini.reload(btnOn.dataset.page); 
							 };  
					});   
			
		  return doc;    
     }
	 
    _ajax() {
          let ini = this;   
		  let myPromise = new Promise(function(Resolve, Reject) {   
				let myHeaders = new Headers({
				  'Content-Type': 'application/json',  
				}); 
				
				/*param page dan limi*/
				let params={
					operator: ini.operator,
					limit: ini.limit,
					page: ini.page,
				};
				
				/*param cari*/
				if(ini.cari!=''){
					params.cari= ini.cari;
				} 
				Object.assign(params, ini.sortCol); 
				
				 let myRequest = new Request(ini.url+ '?' + new URLSearchParams(params), {
					  method: 'GET',
					  headers: myHeaders,
					  mode: 'cors',
					  cache: 'default',
					  //body: JSON.stringify(data) /
				 });
				 
				 fetch(myRequest)
					 .then(async response => { 
						   /*
						   //kode ini bisa diipake jika mau sedikit chek data
						   let isJson = response.headers.get('content-type')?.includes('application/json');
							let data = isJson ? await response.json() : null;  
							if (!response.ok) { 
								let error = (data && data.message) || response.status; 
								return Reject([]);
							} else if(isJson==false || data==null){ 
							     return Reject([]);
						   } */
                           return response.json(); 
					 })
					  .then((res) => {  
						  Resolve(res )
					  })  
					  .catch(error => {  
						   Reject({'totalRecord':0,'limit':ini.limit,'page':1,'data':[],'message':'Terjadi kesalahan respon server'});  
					  }); 
			 });

			myPromise.then(
			   function(res) {ini._td(res);},
			   function(error) {ini._td(error);}
			);  
    }
	
    _td(res) { 
	 
	   let tbody=this.container.querySelector('tbody'); 
	   tbody.innerHTML='';  
	  	//div total data
		let ketTotal=this. container.querySelector('#total'+this.id);
		ketTotal.innerHTML ='Jumlah Baris: <b>'+ res.totalRecord +'</b>'; 
	  	this.records =  Number(res.totalRecord); 
		this.limit = Number(res.limit);  
	    this.page =Number(res.page);   
			 
	  //ada data
	  if(  Number(res.totalRecord)>0){ 
			//buat data table
			for (let j = 0; j <  res.data.length; j++) {
				let tr = document.createElement('tr');
				for (let k = 0; k <  this.colom.length; k++) {
					let td = document.createElement('td');
					//function format
					if (typeof this.colom[k].format === 'function') {
					   td.innerHTML  =this.colom[k].format(res.data[j][this.colom[k].name]); 
					}else{
						 td.innerHTML  = res.data[j][this.colom[k].name];
					}
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}  
	  
	  }else{
	    //kosong data
		 
	       let tr = document.createElement('tr');
		   let td = document.createElement('td');
		    td.setAttribute('colspan',this.colom.length);  
			td.classList.add('center'); 
			td.innerHTML  = res.message;
			tr.appendChild(td);
			tbody.appendChild(tr);
	  }
		   
		this.container.querySelector('table').appendChild(tbody);
	    this.container.querySelector('#table'+this.id).after(this._paging() );  
		this._blur(false); 
	} 	
	
    _blur(mode){ 
		 if(mode){
		   //lakukan blur animasi container
			this. container.classList.add("prevent-select");     
			this. container.querySelector('#loading'+this.id).classList.remove("hide");  
			this. container.querySelector('#loading'+this.id).classList.add("show");  
		}else{
           //hilangkan blur animasi container
			this. container.classList.remove("prevent-select");     
			this. container.querySelector('#loading'+this.id).classList.add("hide");  
			this. container.querySelector('#loading'+this.id).classList.remove("show");  
		} 
	}
	
}
    
//**************************************************************************** */
//tess  

 
const contohTable = new zDataTable('contoh',{  
		container:app, //untuk mempercepat node digunakan div parent
		url:'public/data/karyawan.php', 
		limit:10,
		header:{},
		colom:[
		  { 
			'name': "name", 'header': "NAME",  'width': 'auto', 'class':'center ','sort': true,
			'format': "html", 
		  },
		  { 
			'name': "gaji", 'header': "GAJI",  'width': '200px', 'class':'center','sort': true,
			'format':  function a( v ){ 
				 return `<input onkeyup="tombolAksi(this)" value="${v}"  style="width: 100%;">`; 
			},
		  },
		  { 
			'name': "email", 'header': "EMAIL",   'width': 'auto','class':'','sort': false,
			'format': ""
		  },
		  { 
			'name': "id", 'header': "",   'width': '100px','class':'','sort': false,
			'format':  function a( v ){ 
			  return `<div class="dropdown-hover">
				<button class="button tiny white border    ">Aksi</button>
				<div class="dropdown-content bar-block "  style="right:0">
				  <a href="#" onclick="javascript:alert('${v}');return false;" class="bar-item button  tiny ">Edit</a>
				  <a href="#"  onclick="javascript:alert('${v}');return false;" class="bar-item button tiny">Print</a>
				  <a href="#"  onclick="javascript:alert('${v}');return false;" class="bar-item button tiny ">Hapus</a>
				</div></div>`; 
			},
		  }
	   ],
		sortCol:{
			'col':'name',
			'sort':'asc'
		},
		combo: [5,10,15,25, 50,100, 500, 1500, 'Semua']
	}).run();
	  
 //**************************************************************************** */
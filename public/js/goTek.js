//goTechnologi
const  goTek = { 
	
  parseDOM(stringTag){
	   return new DOMParser().parseFromString(stringTag,'text/html').body;  
  },  
  dateFormat(code){
     //tanggal indonesi dan asing
	   return new Date();  
  } , 
  
  uang(angka){
	  return new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',

		  // These options are needed to round to whole numbers if that's what you want.
		  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
		}).format(Number(angka));
		
		 
  }
};
	
	
	
export default goTek;
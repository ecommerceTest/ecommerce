export default class verificareCampuri{
	constructor(){
		
	}
	verificareSuma(suma){
		let numberIsInteger = require('number-is-integer');
		let numberIsFloat = require('number-is-float');
		let isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
		let verif = false;
	    //verificare null sau underfined 
		if(!!suma){
			//verificare daca este numar
			if(isNumeric.test(suma)){
				//verificare pentru numere intregi/reale/NaN
				if((numberIsInteger(Number(suma)) || numberIsFloat(Number(suma))) && (Number(suma)!=='NaN')){
						//verificare pentru numere pozitive
						if(Number(suma) > 0){
							verif = true;
						}
				}
				
			}
		}
	return verif;
	}
	verificareString(text){
		let verif = false;
		if(!!text){
			verif = true;
		}
	return verif;
	}
	verificareLungString(l,text){
		let verif = false;
		if(l-text.length >= 0){
			verif = true;
		}
	return verif;
	}
	verificareCampuriComanda(text){
		let pattern = /^[^0-9\#\$\@\+]*$/;
		let textReturnat;
		if(text.match(pattern)) {
			textReturnat = text.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
		}
		else{
			textReturnat='';
		}
		return textReturnat;
	}
	verificareCampNrComanda(nr){
		let pattern = /[0-9]/g;
		if(nr.match(pattern)){
  			return true;
		}else{
			return false;
		}
	}
}

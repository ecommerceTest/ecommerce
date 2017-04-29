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
}

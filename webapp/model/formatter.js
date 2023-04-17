sap.ui.define([], function () {
	"use strict";
	return {
        formatRowTable : function(that){

            //Obtenemos todos los items bindeados en la tabla
            let items = that.getView().byId("historialPartidasTable").getItems();
            let ultimoItemAñadido = items[items.length - 1];

            if (ultimoItemAñadido.getCells()[0].mProperties.text == ultimoItemAñadido.getCells()[2].mProperties.text){
                    
                ultimoItemAñadido.getCells()[0].addStyleClass("color-verde");
            }else{
                ultimoItemAñadido.getCells()[0].addStyleClass("color-rojo");
            }
            
            if (ultimoItemAñadido.getCells()[1].mProperties.text == ultimoItemAñadido.getCells()[2].mProperties.text){
                    
                ultimoItemAñadido.getCells()[1].addStyleClass("color-verde");
            }else{
                ultimoItemAñadido.getCells()[1].addStyleClass("color-rojo");
            }
            
            
            
           /* let cont = 0;
            ultimoItemAñadido.getCells().forEach(function(cell){
                /*if(cont < 2){
                    if (cell.getCells()[cont].mProperties.text == cell.getCells()[2].mProperties.text){
                        console.log("conta: " + cont)
                        cell.getCells()[cont].addStyleClass("color-verde");
                    }else{
                        console.log("cont: " + cont)
                        cell.getCells()[cont].addStyleClass("color-rojo");
                    }
                }
                cont ++;
                console.log(cell)
                   
            });*/ 

        }
    };
});
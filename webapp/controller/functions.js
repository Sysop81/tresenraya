sap.ui.define([], function(){
	"use strict";

	return {
        /************************************************************************************************************
		 *  Funcion comprobarGanador                                                                                *
		 *  Esta funcion se encarga de comprobar si algun jugador ha ganado la partida.                             *
		 ************************************************************************************************************/
        comprobarGanador : function(aPartida){

            let hayGanador = false;

           // if (movimientos > 0 && !hayGanador){
            //Player 1 HORIZONTAL
            if(aPartida[0][0] == 1 && aPartida[0][1] == 1 && aPartida[0][2] == 1 || 
            aPartida[1][0] == 1 && aPartida[1][1] == 1 && aPartida[1][2] == 1 ||
            aPartida[2][0] == 1 && aPartida[2][1] == 1 && aPartida[2][2] == 1 ){
                    //console.log("Ganador player 1 HORIZONTAL");
                    hayGanador= true;
            }

            //Player 2 HORIZONTAL
            if (aPartida[0][0] == 2 && aPartida[0][1] == 2 && aPartida[0][2] == 2 ||
                aPartida[1][0] == 2 && aPartida[1][1] == 2 && aPartida[1][2] == 2 ||
                aPartida[2][0] == 2 && aPartida[2][1] == 2 && aPartida[2][2] == 2){
                    //console.log("Ganador Player 2 HORIZONTAL");
                    hayGanador= true;
            }

            //Player 1 VERTICAL
            if(aPartida[0][0] == 1 && aPartida[1][0] == 1 && aPartida[2][0] == 1 || 
                aPartida[0][1] == 1 && aPartida[1][1] == 1 && aPartida[2][1] == 1 ||
                aPartida[0][2] == 1 && aPartida[1][2] == 1 && aPartida[2][2] == 1 ){
                    //console.log("Ganador player 1 VERTICAL");
                    hayGanador= true;
            }

            //Player 2 VERTICAL
            if(aPartida[0][0] == 2 && aPartida[1][0] == 2 && aPartida[2][0] == 2 || 
            aPartida[0][1] == 2 && aPartida[1][1] == 2 && aPartida[2][1] == 2 ||
            aPartida[0][2] == 2 && aPartida[1][2] == 2 && aPartida[2][2] == 2 ){
                    //console.log("Ganador player 2 VERTICAL");
                    hayGanador= true;
            }
            
            //Player 1 DIAGONAL
            if(aPartida[0][0] == 1 && aPartida[1][1] == 1 && aPartida[2][2] == 1 || 
            aPartida[0][2] == 1 && aPartida[1][1] == 1 && aPartida[2][0] == 1 ){
                    //console.log("Ganador player 1 DIAGONAL");
                    hayGanador= true;
            } 

            //Player 1 DIAGONAL
            if(aPartida[0][0] == 2 && aPartida[1][1] == 2 && aPartida[2][2] == 2 || 
            aPartida[0][2] == 2 && aPartida[1][1] == 2 && aPartida[2][0] == 2 ){
                    //console.log("Ganador player 2 DIAGONAL");
                    hayGanador= true;
            }

            return hayGanador;
            
        },
        /************************************************************************************************************
		 *  Funcion informarJugadores                                                                               *
		 *  Esta funcion se encarga de informar a los jugadores del resultado de la partida                         *
		 ************************************************************************************************************/
        informarJugadores : function(hayGanador,isTurnoP1,movimientos,oBundle,that){
            
            console.log("hayGanador: " + hayGanador + " turnoP1: "  +isTurnoP1 + " mOVIMIENTOS: "  +movimientos)

            let oMsgToast;

            if (hayGanador){
                if(!isTurnoP1){ // Si es falso es porque ha sido el ultimo en jugar
                    //console.log("Ha ganado el PLAYER 1")
                    let nombreP1 = that.getView().getModel("jugadores").oData.jugador1;
                    oMsgToast = oBundle.getText("ganadorPlayer1", nombreP1);

                }else{
                    //console.log("Ha ganado el PLAYER 2")
                    let nombreP2 =that.getView().getModel("jugadores").oData.jugador2;
                    oMsgToast = oBundle.getText("ganadorPlayer2", nombreP2);
                }
            }else if(!hayGanador && movimientos <= 0){
                //console.log("EMPATE")
                oMsgToast = oBundle.getText("empate");

            }

            sap.m.MessageToast.show(oMsgToast);

        },
         /************************************************************************************************************
		 *  Funcion obtenerNumeroPartidasGanadas                                                                     *
		 *  Esta funcion se encarga de obtener el numero de partidas ganadas del jugador que entra como parametro    *
		 ************************************************************************************************************/
        obtenerNumeroPartidasGanadas: function(that,nombrePlayer){

            let contador = 0;

            if ( that.getView().getModel("historial") != undefined){
                let historialPartidas = that.getView().getModel("historial").oData;

                for(let i = 0; i < historialPartidas.length; i++){
                    if (historialPartidas[i].ganador == nombrePlayer){
                        contador++;
                    }
                }
            }
            

            return contador;
        },
         /************************************************************************************************************
		 *  Funcion generarMovimientoCPU                                                                             *
		 *  Esta funcion se encarga de generar el movimiento de la CPU                                               *
		 ************************************************************************************************************/
        generarMovimientoCPU: function(arrayBotonesSinPulsar, arrayPartida,movimientosMaxCPU){
            
            //Para consumo aleatorio de jugadas
            
            /*let max = arrayBotonesSinPulsar.length;

            let indiceBtnAleatorio = Math.floor(Math.random()* (max - 0)) + 0;

            arrayBotonesSinPulsar[indiceBtnAleatorio].setIcon('sap-icon://circle-task');

            arrayBotonesSinPulsar[indiceBtnAleatorio].addStyleClass('colorParaLasO');

            //Obtenemos el customData para obtener la fila y columna de la matriz, para insertar en su posicion correcta
			let arrFilaColum = arrayBotonesSinPulsar[indiceBtnAleatorio].data('filaColumna').split(",");
			let fila = Number(arrFilaColum[0]);
			let col = Number(arrFilaColum[1]);

            //Añadimos el valor 2 al array. 2 indica que la celda esta ocupada por el Player 2
			arrayPartida[fila][col] = 2;*/

            //CPU juega a la defensiva y al ataque, pero puede perder o ganar por azar
            
            //Contruimos un tablero con el estado de los movimientos actuales

            let aTableroActual = [[],[],[]];
            for(let i = 0; i <= 2; i++){
                for(let x = 0; x <= 2; x++){
                    if(arrayPartida[i][x] == null){
                        aTableroActual[i][x] = 0;
                    }else{
                        aTableroActual[i][x] = arrayPartida[i][x];
                    }
                   
                }
            }

            console.log(aTableroActual)
            
            let botonPulsadoCPU;
            let indiceBtnAleatorio;
            let max = arrayBotonesSinPulsar.length;

            //Comprobaciones para realizar la jugada
            if(movimientosMaxCPU == 4){
                if (aTableroActual[1][1] == 0){
                    //Localizamos el boton segun el custoData asociado
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == "1,1");

                }else{
                    indiceBtnAleatorio = Math.floor(Math.random()* (max - 0)) + 0;
                    botonPulsadoCPU = arrayBotonesSinPulsar[indiceBtnAleatorio];
                }
            }
            
            if(movimientosMaxCPU > 0 && movimientosMaxCPU  < 4){
                let indiceCustomData = "";
                let haMovidoCPU = false;
                
                
                //Verticales A
                if (aTableroActual[0][0] == 1 && aTableroActual[1][0] == 1 && aTableroActual[2][0] == 0 || aTableroActual[0][0] == 2 && aTableroActual[1][0] == 2 && aTableroActual[2][0] == 0 ){
                    indiceCustomData = "2,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][1] == 1 && aTableroActual[1][1] == 1 && aTableroActual[2][1] == 0 || aTableroActual[0][1] == 2 && aTableroActual[1][1] == 2 && aTableroActual[2][1] == 0 ){
                    indiceCustomData = "2,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][2] == 1 && aTableroActual[1][2] == 1 && aTableroActual[2][2] == 0 || aTableroActual[0][2] == 2 && aTableroActual[1][2] == 2 && aTableroActual[2][2] == 0 ){
                    indiceCustomData = "2,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }


                 //Verticales B
                if (aTableroActual[2][0] == 1 && aTableroActual[1][0] == 1 && aTableroActual[0][0] == 0 || aTableroActual[2][0] == 2 && aTableroActual[1][0] == 2 && aTableroActual[0][0] == 0 ){
                    indiceCustomData = "0,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[2][1] == 1 && aTableroActual[1][1] == 1 && aTableroActual[0][1] == 0 || aTableroActual[2][1] == 2 && aTableroActual[1][1] == 2 && aTableroActual[0][1] == 0){
                    indiceCustomData = "0,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[2][2] == 1 && aTableroActual[1][2] == 1 && aTableroActual[0][2] == 0 || aTableroActual[2][2] == 2 && aTableroActual[1][2] == 2 && aTableroActual[0][2] == 0 ){
                    indiceCustomData = "0,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                //Verticales C
                if (aTableroActual[0][0] == 1 && aTableroActual[1][0] == 0 && aTableroActual[2][0] == 1 || aTableroActual[0][0] == 2 && aTableroActual[1][0] == 0 && aTableroActual[2][0] == 2 ){
                    indiceCustomData = "1,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][1] == 1 && aTableroActual[1][1] == 0 && aTableroActual[2][1] == 1 || aTableroActual[0][1] == 2 && aTableroActual[1][1] == 0 && aTableroActual[2][1] == 2 ){
                    indiceCustomData = "1,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][2] == 1 && aTableroActual[1][2] == 0 && aTableroActual[2][2] == 1 || aTableroActual[0][2] == 2 && aTableroActual[1][2] == 0 && aTableroActual[2][2] == 2 ){
                    indiceCustomData = "1,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;

                }

                //Horizontales A
                if (aTableroActual[0][0] == 1 && aTableroActual[0][1] == 1 && aTableroActual[0][2] == 0 || aTableroActual[0][0] == 2 && aTableroActual[0][1] == 2 && aTableroActual[0][2] == 0 ){
                    indiceCustomData = "0,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][0] == 0 && aTableroActual[0][1] == 1 && aTableroActual[0][2] == 1 || aTableroActual[0][0] == 0 && aTableroActual[0][1] == 2 && aTableroActual[0][2] == 2 ){
                    indiceCustomData = "0,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[0][0] == 1 && aTableroActual[0][1] == 0 && aTableroActual[0][2] == 1 || aTableroActual[0][0] == 2 && aTableroActual[0][1] == 0 && aTableroActual[0][2] == 2 ){
                    indiceCustomData = "0,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                //Horizontales b
                if (aTableroActual[1][0] == 1 && aTableroActual[1][1] == 1 && aTableroActual[1][2] == 0 || aTableroActual[1][0] == 2 && aTableroActual[1][1] == 2 && aTableroActual[1][2] == 0 ){
                    indiceCustomData = "1,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[1][0] == 0 && aTableroActual[1][1] == 1 && aTableroActual[1][2] == 1 || aTableroActual[1][0] == 0 && aTableroActual[1][1] == 2 && aTableroActual[1][2] == 2 ){
                    indiceCustomData = "1,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[1][0] == 1 && aTableroActual[1][1] == 0 && aTableroActual[1][2] == 1 || aTableroActual[1][0] == 2 && aTableroActual[1][1] == 0 && aTableroActual[1][2] == 2 ){
                    indiceCustomData = "1,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                 //Horizontales c
                 if (aTableroActual[2][0] == 1 && aTableroActual[2][1] == 1 && aTableroActual[2][2] == 0 || aTableroActual[2][0] == 2 && aTableroActual[2][1] == 2 && aTableroActual[2][2] == 0 ){
                    indiceCustomData = "2,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[2][0] == 0 && aTableroActual[2][1] == 1 && aTableroActual[2][2] == 1 || aTableroActual[2][0] == 0 && aTableroActual[2][1] == 2 && aTableroActual[2][2] == 2 ){
                    indiceCustomData = "2,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if (aTableroActual[2][0] == 1 && aTableroActual[2][1] == 0 && aTableroActual[2][2] == 1 || aTableroActual[2][0] == 2 && aTableroActual[2][1] == 0 && aTableroActual[2][2] == 2 ){
                    indiceCustomData = "2,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                //Diagonales
                if(aTableroActual[0][0] == 1 && aTableroActual[1][1] == 1 && aTableroActual[2][2] == 0 || aTableroActual[0][0] == 2 && aTableroActual[1][1] == 2 && aTableroActual[2][2] == 0){
                    indiceCustomData = "2,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if(aTableroActual[2][2] == 1 && aTableroActual[1][1] == 1 && aTableroActual[0][0] == 0 || aTableroActual[2][2] == 2 && aTableroActual[1][1] == 2 && aTableroActual[0][0] == 0){
                    indiceCustomData = "0,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if(aTableroActual[2][0] == 1 && aTableroActual[1][1] == 1 && aTableroActual[0][2] == 0 || aTableroActual[2][0] == 2 && aTableroActual[1][1] == 2 && aTableroActual[0][2] == 0){
                    indiceCustomData = "0,2";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if(aTableroActual[0][2] == 1 && aTableroActual[1][1] == 1 && aTableroActual[2][0] == 0 || aTableroActual[0][2] == 2 && aTableroActual[1][1] == 2 && aTableroActual[2][0] == 0){
                    indiceCustomData = "2,0";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                if((aTableroActual[2][2] == 1 && aTableroActual[1][1] == 0 && aTableroActual[0][0] == 1) || (aTableroActual[2][0] == 1 && aTableroActual[0][2] == 1 && aTableroActual[1][1] == 0) ){
                    indiceCustomData = "1,1";
                    botonPulsadoCPU = arrayBotonesSinPulsar.find(element => element.data('filaColumna') == indiceCustomData);
                    haMovidoCPU =true;
                }

                
                // Echamos a suertes si falla la defensa de la CPU, para forzar a que genere un aleatorio
                let puedeQueFalleCPU = Math.floor(Math.random()* (4 - 1)) + 1;

                if(movimientosMaxCPU == 3 && puedeQueFalleCPU >= 3 && puedeQueFalleCPU <= 4){
                    haMovidoCPU = false;
                }
                
                // Juega el Azar
                if(!haMovidoCPU){
                    indiceBtnAleatorio = Math.floor(Math.random()* (max - 0)) + 0;
                    botonPulsadoCPU = arrayBotonesSinPulsar[indiceBtnAleatorio];
                }
               
                
            }

            

            if(movimientosMaxCPU >= 1){
            //Realizamos la pulsacion del boton cambiando icono y color
            botonPulsadoCPU.setIcon('sap-icon://circle-task');
            botonPulsadoCPU.addStyleClass('colorParaLasO');

            //Obtenemos el customData para obtener la fila y columna de la matriz, para insertar en su posicion correcta
			let arrFilaColum = botonPulsadoCPU.data('filaColumna').split(",");
			let fila = Number(arrFilaColum[0]);
			let col = Number(arrFilaColum[1]);

            //Añadimos el valor 2 al array. 2 indica que la celda esta ocupada por el Player 2
			arrayPartida[fila][col] = 2; 
            }

            

        },
        /************************************************************************************************************
		 *  Funcion reiniciarPartida                                                                                *
		 *  Esta funcion se encarga de reiniciar la partida, restableciendo a los valores iniciales e insertando el *
         *  resultado de la partida en el historial                                                                 *
		 ************************************************************************************************************/
        reiniciarPartida: function(arrayHistorial,formatter,isTurnoP1,hayGanador,that,JSONModel,oBundle){
            //Historial
			//Montamos el oData jugadores
            let oDataHistorial = {
                "jugador1" : that.getView().getModel("jugadores").oData.jugador1,
                "jugador2" : that.getView().getModel("jugadores").oData.jugador2,
                "ganador" : isTurnoP1 && hayGanador ?  that.getView().getModel("jugadores").oData.jugador2 : !isTurnoP1 && hayGanador ? that.getView().getModel("jugadores").oData.jugador1 : oBundle.getText("empate")
            }
            
            arrayHistorial.push(oDataHistorial);

            //Instanciamos el modelo
            let oModelHistorial = new JSONModel(arrayHistorial);

            //Lo seteamos en la vista
            that.getView().setModel(oModelHistorial,"historial");

            formatter.formatRowTable(that); //PRUEBAS
            

            //Reseteamos variables de la partida
            for(let i = 0; i < 9; i++){
                let idBtn = "btn" + (i+1);
                let btn = that.getView().byId(idBtn);
                btn.setIcon('sap-icon://navigation-down-arrow');
                btn.removeStyleClass('colorParaLasX').removeStyleClass('colorParaLasO');
            }

            
            //Quitamos el stylo CSS que indica el turno del jugador y se lo asignamos al otro jugador
            that.getView().byId("player2").removeStyleClass("turnoActivo");
            that.getView().byId("player1").addStyleClass("turnoActivo");			
        }
	}
});
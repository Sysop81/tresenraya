sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./functions",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/formatter"
], function(
	Controller, functions, JSONModel, Filter, FilterOperator,formatter
) {
	"use strict";

	//Definicion de variables globales
	let isTurnoP1;
	let arrayPartida;
	let arrayHistorial;
	let movimientos;
	let hayGanador;
	let oBundle;
	let that;
	let modoCPU;
	let movimientosMaxCPU;

	return Controller.extend("tresenraya.controller.Juego", {
		functions: functions,
		formatter: formatter,
		onInit: function () {
			
			that = this;
		    arrayPartida = [[],[],[]];
			arrayHistorial = [];
			isTurnoP1 = true;
			movimientos = 9;
			hayGanador = false;

			//Generamos el resource del i18n
			oBundle =  this.getOwnerComponent().getModel("i18n").getResourceBundle();

			//Obligamos a pasar por el metodo onRouteMatched para recoger los parametros que entran por la ruta
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteJuego").attachPatternMatched(this.onRouteMatched, this); 

		},
		/************************************************************************************************************
		 *  Manejador onRouteMatched                                                                                *
		 *  Este manejador, se encarga de recoger los parametros de la ruta, establecer si es un juego contra la CPU*
		 *  y establecer el modelo                                                                                  *
		 ************************************************************************************************************/
		onRouteMatched : function(oEvent){
			//Obtenemos los parametros pasados a la ruta
			let parametros = oEvent.getParameter("arguments");
			
			//Montamos el oData jugadores
			let oDataJugadores = {
				"jugador1" : parametros.nombreP1,
				"jugador2" : parametros.nombreP2
			}

			//Activamos o no el modoCPU
			if (parametros.nombreP2.toLowerCase() == "cpu"){
				modoCPU = true;
				movimientosMaxCPU = 4;
			}else{
				modoCPU = false;
			}

			//Instanciamos el modelo
			let oModelJugadores = new JSONModel(oDataJugadores);

			//Lo seteamos a la vista
			this.getView().setModel(oModelJugadores,"jugadores");
			console.log(this.getView().getModel("jugadores"));

			//Establecemos el turno al player 1
			this.getView().byId("player1").addStyleClass("turnoActivo");
		},
		/************************************************************************************************************
		 *  Manejador navToInicio                                                                                   *
		 *  Este manejador, se encarga de navegar hasta la ruta donde se muestra la vista de insercion de los nom-  *
		 *  -bres de los jugadores.                                                                                 * 
		 ************************************************************************************************************/
		navToInicio: function (oEvent) {
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteInicio");
		},
		/************************************************************************************************************
		 *  Manejador onPressCelda                                                                                  *
		 *  Este manejador, se encarga de navegar hasta la ruta donde se muestra la vista de insercion de los nom-  *
		 *  -bres de los jugadores.                                                                                 * 
		 ************************************************************************************************************/
		onPressCelda: function(oEvent){
			//Obtenemos el boton que ha lanzado el evento
			let botonPulsado = oEvent.getSource();
			
			//Obtenemos el customData para obtener la fila y columna de la matriz, para insertar en su posicion correcta
			let arrFilaColum = botonPulsado.data('filaColumna').split(",");
			let fila = Number(arrFilaColum[0]);
			let col = Number(arrFilaColum[1]);
			
			//Sólo cambiamos si tiene el valor del icono inicial
			if (botonPulsado.getIcon() == 'sap-icon://navigation-down-arrow' && !hayGanador){
				if(isTurnoP1){
					//Cambiamos el icono inicial por el de la cruz
					botonPulsado.setIcon('sap-icon://decline');

					botonPulsado.addStyleClass('colorParaLasX');
					
					//Añadimos el valor 1 al array. 1 indica que la celda esta ocupada por el Player 1
					arrayPartida[fila][col] = 1;

					
					//Cambiamos el turno al jugador 2
					isTurnoP1 = false;

					//Quitamos el stylo CSS que indica el turno del jugador y se lo asignamos al otro jugador
					this.getView().byId("player1").removeStyleClass("turnoActivo");
					this.getView().byId("player2").addStyleClass("turnoActivo");
				    
					
					//Juega la maquina ya que esta el modoCPU activado
					if(modoCPU && !isTurnoP1){

						movimientos--;

						//Comprobamos si hay un ganador despues del ultimo movimiento realizado
						hayGanador = functions.comprobarGanador(arrayPartida);	
						
						
						if (movimientosMaxCPU > 0 && !hayGanador){
							
							//Definimos un vector para incluir aquellos botones no pulsados aún
							let arrayBotonesSinPulsar = [];
							
							//Recuperamos los btn que aun se puedan utilizar
							for(let i = 0; i < 9; i++){
								let idBtn = "btn" + (i+1);
								let btn = that.getView().byId(idBtn);
								if (btn.getIcon() == 'sap-icon://navigation-down-arrow'){
									arrayBotonesSinPulsar.push(btn);
								}
								
							}

							// Establecemos un retraso en la ejecuacion, para que no sea instantaneo
							setTimeout(function(){

								//Pasamos la coleccion a la funcion encargada de determinar que boton pulsar
								functions.generarMovimientoCPU(arrayBotonesSinPulsar, arrayPartida,movimientosMaxCPU);
								
								movimientosMaxCPU--;

								//Quitamos el stylo CSS que indica el turno del jugador y se lo asignamos al otro jugador
								that.getView().byId("player2").removeStyleClass("turnoActivo");
								that.getView().byId("player1").addStyleClass("turnoActivo");
								
								//Cedemos nuevamente el turno al jugador 1
								isTurnoP1 = true;

								//Comprobamos si existe un ganador despues de la ultima jugada
								hayGanador = functions.comprobarGanador(arrayPartida);
								
								// Si existe??
								if (hayGanador){

									// Informamos a los jugadores
									functions.informarJugadores(hayGanador,isTurnoP1,movimientos,oBundle,that);

									// Retrasamos el reinicio de partida, para que no se a instantaneo
									setTimeout(function(){
										functions.reiniciarPartida(arrayHistorial,formatter,isTurnoP1,hayGanador,that,JSONModel,oBundle);

										arrayPartida = [[],[],[]];
										isTurnoP1 = true;
										movimientos = 9;
										hayGanador = false;

										if (modoCPU){
											movimientosMaxCPU = 4;
										}
									}, 1000);
								}

							}, 1000);
							
							
						}
	
					}
					

				}else{
					
					botonPulsado.setIcon('sap-icon://circle-task');

					botonPulsado.addStyleClass('colorParaLasO');

					//Añadimos el valor 2 al array. 2 indica que la celda esta ocupada por el Player 2
					arrayPartida[fila][col] = 2;
		
					//Cambiamos el turno al jugador 2
					isTurnoP1 = true;

					//Quitamos el stylo CSS que indica el turno del jugador y se lo asignamos al otro jugador
					this.getView().byId("player2").removeStyleClass("turnoActivo");
					this.getView().byId("player1").addStyleClass("turnoActivo");	
				
				}

				//Descontamos un movimiento al contador general
				movimientos--;

				//Comprobamos si hay un ganador despues del ultimo movimiento realizado
				hayGanador = functions.comprobarGanador(arrayPartida);

				//Lanzamos el mensaje al usuario informando de como ha terminado la partida
				if (hayGanador || movimientos <= 0){

					functions.informarJugadores(hayGanador,isTurnoP1,movimientos,oBundle,that);

					//Reiniciamos la partida
					setTimeout(function(){
						functions.reiniciarPartida(arrayHistorial,formatter,isTurnoP1,hayGanador,that,JSONModel,oBundle);

						arrayPartida = [[],[],[]];
						isTurnoP1 = true;
						movimientos = 9;
						hayGanador = false;

						if (modoCPU){
							movimientosMaxCPU = 4;
						}
						
					}, 2000);
					
				}
					
			}
			

			
		},
		/************************************************************************************************************
		 *  Manejador filtrarHistorial                                                                              *
		 *  Este manejador, se encarga de filtrar el historial mediante el campo ganador                            * 
		 ************************************************************************************************************/
		filtrarHistorial : function(oEvent){

			let aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ganador", FilterOperator.Contains, sQuery));
			}

			// filter binding
			let oList = this.byId("historialPartidasTable");
			let oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		/************************************************************************************************************
		 *  Manejador mostrarPartidasGanadas                                                                        *
		 *  Este manejador, se encarga de mostrar el cuadro de dialogo con el numero de paratidas que ha ganado el  *
		 *  jugador                                                                                                 * 
		 ************************************************************************************************************/
		mostrarPartidasGanadas : function(oEvent){
			// Obtenemos las propiedades del btn que lanza el evento
			let properties = oEvent.getSource().mProperties;

			//Obtenemos las partidas ganadas
			let partidasGanadas = functions.obtenerNumeroPartidasGanadas(that,properties.text);
			
			let mensaje = "El jugador " + properties.text + " ha ganado " + partidasGanadas + (partidasGanadas == 1 ? " partida" : " partidas");

			
			if (!this.oDefaultMessageDialog) {
				console.log("entro aqui")
				this.oDefaultMessageDialog = new sap.m.Dialog({
					type: sap.m.DialogType.Message,

					content: new sap.m.Text({ text: mensaje }),
					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: "OK",
						press: function () {
							this.oDefaultMessageDialog.close();
						}.bind(this)
					})
				});

				
			}
				
			// Añadimos el contenido dinamico al dialogo
			this.oDefaultMessageDialog.mAggregations.content[0].mProperties.text = mensaje;
			
			//Mostramos el dialogo a los jugadores
			this.oDefaultMessageDialog.open();

		}
	});
});
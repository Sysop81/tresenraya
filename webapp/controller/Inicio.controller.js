sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";
		let oBundle;

		return Controller.extend("tresenraya.controller.Inicio", {
			onInit: function () {
				//Generamos el resource del i18n
				oBundle =  this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},
			/************************************************************************************************************
		     *  Manejador iniciarPartida                                                                                *
		     *  Este manejador, se encarga de iniciar la partida de juego y validar los nombres de los jugadores        *
			 ************************************************************************************************************/
			iniciarPartida: function(oEvent){
				//Obtenemos los valores de los inputs con los nombres de los jugadores
				let player1 = this.getView().byId("player1").getValue();
				let player2 = this.getView().byId("player2").getValue();
				let oMsgToast;

				if ((player1 != "" && player2 != "") && (player1 != player2)){
					oMsgToast = oBundle.getText("BienvanidaIniciarPartida");

					//Procedemos a navegar hacia la vista de Juego
					let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("RouteJuego",{nombreP1:player1, nombreP2:player2});
				}else{
					//Informamos al/los usuari@s que debe introducir nombres
					if(player1 =="" && player2 != ""){
						oMsgToast = oBundle.getText("nombreJugador1Vacio");

						this.getView().byId("player1").addStyleClass('validacionRed').focus();

					}else if(player2 =="" && player1 != ""){
						oMsgToast = oBundle.getText("nombreJugador2Vacio");

						this.getView().byId("player2").addStyleClass('validacionRed').focus();

					}else if(player1 == player2 && (player1 != "" && player2 != "") ){
						oMsgToast = oBundle.getText("nombreJugadoresNopuedeSerIgual");
					}else{
						oMsgToast = oBundle.getText("nombreJugadoresVacio");

						this.getView().byId("player1").addStyleClass('validacionRed').focus();
						this.getView().byId("player2").addStyleClass('validacionRed');
					}

				}

				MessageToast.show(oMsgToast);

			},
			/************************************************************************************************************
		     *  Manejador comprobarCampo                                                                                *
		     *  Este manejador, se encarga de quitar la clase establecida para marcar un error en la validacion, cuando *
			 *  se introducen valores en el campo                                                                       * 
			 ************************************************************************************************************/
			comprobarCampo : function(oEvent){
				// Comprobamos si el input que lanza el evento tiene la clase establecida para el error de validacion,
				// al comenzar a escribir la eliminamos.
				if (oEvent.getSource().hasStyleClass('validacionRed')){
					oEvent.getSource().removeStyleClass('validacionRed');
				}
			}
		});
	});

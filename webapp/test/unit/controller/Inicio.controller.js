/*global QUnit*/

sap.ui.define([
	"tresenraya/controller/Inicio.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Inicio Controller");

	QUnit.test("I should test the Inicio controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

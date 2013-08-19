/*
 * File: app/controller/AgentController.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Spm.controller.AgentController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.agentController',

    isAvailable: false,
    models: [
        'Agent'
    ],
    stores: [
        'AuthenticatedAgent'
    ],
    views: [
        'AgentStatusPanel'
    ],

    refs: [
        {
            ref: 'agentStatusPanel',
            selector: 'agentStatusPanel',
            xtype: 'agentStatusPanel'
        }
    ],

    onMakeMeAvailable: function(button, e, eOpts) {
        this.getAgentStatusPanel().setAvailability(this.isAvailable = !this.isAvailable);
    },

    init: function(application) {
        this.control({
            "button#makeMeAvailableButton": {
                click: this.onMakeMeAvailable
            }
        });
    }

});

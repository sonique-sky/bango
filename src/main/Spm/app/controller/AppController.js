/*
 * File: app/controller/AppController.js
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

Ext.define('Spm.controller.AppController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.appController',

    views: [
        'TabPanel',
        'QueueContainer'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: 'tabPanel'
        }
    ],

    onQueueSelected: function(queue) {
        //tabCache.activateTabFor(queue);

        var queueContainer = Ext.create('Spm.view.QueueContainer', {closable: true, title: queue.get('name')});

        this.getTabPanel().add(queueContainer);
    },

    init: function(application) {
        tabCache = Ext.create('Spm.cache.TabCache', {
            tabPanel: this.getTabPanel()
        });

        application.on({
            queueSelected: {
                fn: this.onQueueSelected,
                scope: this
            }
        });
    }

});

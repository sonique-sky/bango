/*
 * File: app/view/QueueContainer.js
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

Ext.define('Spm.view.QueueContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.queueContainer',

    height: 505,
    width: 536,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: 'bulk-clear',
                            text: 'Bulk Clear'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
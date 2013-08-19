/*
 * File: app/view/HeaderContainer.js
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

Ext.define('Spm.view.HeaderContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.headerContainer',

    height: 50,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tpl: [
                '<div class="app-header">',
                '<div class="login-info">Welcome <span id="login-name" class="login-name">{name}</span> | <span id="logout" class="logout">Logout</span></div>',
                '<div class="app-logo"/>',
                '</div>'
            ],
            listeners: {
                click: {
                    delegate: 'span#logout',
                    fn: me.onLogoutClick,
                    element: 'el',
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onLogoutClick: function(container) {
        Spm.application.fireEvent('logout');
    }

});
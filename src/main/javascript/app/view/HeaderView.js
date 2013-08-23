Ext.define('Spm.view.HeaderView', {
    extend: 'Ext.view.View',
    alias: 'widget.headerView',

    height: 50,
    disableSelection: true,
    itemSelector: 'span#login-name',
    store: 'AuthenticatedAgent',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            itemTpl: [
                '<div class="app-header">',
                '    <div class="login-info">Welcome <span id="login-name" class="login-name">{displayName}</span> | <span id="logout" class="logout">Logout</span></div>',
                '	<div class="app-logo"/>',
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

    onLogoutClick: function(dataview) {
        Spm.application.fireEvent('logout');
    }

});
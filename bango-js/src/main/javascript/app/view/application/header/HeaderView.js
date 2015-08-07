Ext.define('Spm.view.application.header.HeaderView', {
    extend: 'Ext.view.View',
    alias: 'widget.headerView',

    height: 60,
    disableSelection: true,
    itemSelector: 'span#login-name',
    store: 'AuthenticatedAgent',

    itemTpl: [
        '<div class="app-header">',
        '    <div class="login-info">Welcome <span id="login-name" class="login-name">{displayName}</span> | <span id="logout" class="logout">Logout</span></div>',
        '	<div class="app-logo"/>',
        '</div>'
    ],
    listen: {
        click: {
            delegate: 'span#logout',
            fn: 'onLogoutClick',
            element: 'el'
        }
    },

    onLogoutClick: function () {
        Ext.GlobalEvents.fireEvent('logout');
    }
});
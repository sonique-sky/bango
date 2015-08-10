Ext.define('Spm.view.application.header.AppHeader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appHeader',

    controller: 'appHeader',
    reference: 'appHeader',

    height: 60,

    bind: {
        html: '' +
        '<div class="app-header">' +
        '    <div class="login-info">Welcome <span id="login-name" class="login-name">{authenticatedAgent.displayName}</span> | <span id="logout" class="logout">Logout</span></div>' +
        '    <div class="app-logo"/>' +
        '</div>'
    },

    listeners: {
        click: {
            delegate: 'span#logout',
            fn: 'onLogout',
            element: 'el'
        }
    }
});
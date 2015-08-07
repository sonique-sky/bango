Ext.define('Spm.view.application.header.AppHeaderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appHeader',

    listen: {
        global: {
            authenticated: 'onAuthenticated'
        }
    },

    onAuthenticated: function (authenticatedAgent) {
        this.getViewModel().set('authenticatedAgent', authenticatedAgent);
    },

    onLogout: function () {
        Ext.GlobalEvents.fireEvent('logout');
    }
});
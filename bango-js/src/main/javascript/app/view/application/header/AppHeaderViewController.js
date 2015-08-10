Ext.define('Spm.view.application.header.AppHeaderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appHeader',

    onLogout: function () {
        this.fireEvent('logout');
    }
});
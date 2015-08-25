Ext.define('Spm.view.header.AppHeaderViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appHeader',

    onLogout: function () {
        this.fireEvent('logout');
    }
});
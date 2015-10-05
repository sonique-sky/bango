Ext.define('Spm.view.SupermanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.superman',

    requires: [
        'Ext.window.Toast',
        'Spm.view.container.AppContainer',
        'Spm.view.login.LoginDialog'
    ],

    listen: {
        controller: {
            'loginDialog': {
                performAuthentication: 'onPerformAuthentication'
            },
            'appHeader': {
                logout: 'onLogout'
            },
            'serviceProblemTab': {
                displayNotification: 'onDisplayNotification'
            }
        }
    },

    init: function () {
        Ext.Ajax.on('requestexception', this.onProxyException, this);
        this.callParent();
    },

    onProxyException: function (proxy, response) {
        if (response.status == 403 || response.status == 401) {
            this.onAuthenticationRequired();
        } else if (response.status == 400) {
            Ext.Msg.alert("Error", Ext.JSON.decode(response.responseText).message);
        } else if (response.status == 500) {
            Ext.Msg.alert("Error", response.responseText);
        }
    },

    onLogout: function () {
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: this.onAuthenticationRequired,
            scope: this
        });
    },

    onPerformAuthentication: function (credentials) {
        Ext.Ajax.request({
            url: 'j_spring_security_check',
            params: credentials,
            success: this.loadAuthenticatedAgent,
            scope: this,
            failure: function (response) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: response.responseText,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING,
                    closable: false
                });
            }
        });
    },

    onDisplayNotification: function (params) {
        Ext.toast({
            html: params.message,
            title: params.title,
            width: 250,
            align: 'br',
            header: true,
            border: false
        });
    },

    onAuthenticationRequired: function () {
        var appContainer = this.lookupReference('appContainer');
        if (appContainer !== null) {
            appContainer.destroy();
        }
        Ext.create('Spm.view.login.LoginDialog').show();
    },

    onAuthenticatedAgentLoaded: function (store, records, success) {
        if (success) {
            this.getViewModel().set('authenticatedAgent', records[0]);
            this.getView().add({xtype: 'appContainer'});
        }
    },

    loadAuthenticatedAgent: function () {
        this.getStore('authenticatedAgents').load();
    }

});

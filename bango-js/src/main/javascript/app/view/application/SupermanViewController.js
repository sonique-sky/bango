Ext.define('Spm.view.application.SupermanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.superman',

    requires: ['Ext.window.Toast'],

    listen: {
        global: {
            authenticationRequired: 'onAuthenticationRequired',
            displayNotification: 'onDisplayNotification'
        },
        controller: {
            'loginDialog': {
                performAuthentication: 'onPerformAuthentication'
            },
            'appHeader': {
                logout: 'onLogout'
            }
        }
    },

    onLogout: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: function () {
                me.onAuthenticationRequired();
            },
            scope: this
        });
    },

    onPerformAuthentication: function (credentials) {
        var me = this;

        Ext.Ajax.request({
            url: 'j_spring_security_check',
            params: credentials,
            success: function () {
                me.onAuthenticated(false);
            },
            failure: function (response) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: response.statusText,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING,
                    closable: false,
                    callback: me.onAuthenticationRequired, scope: me
                });
            },
            scope: this
        });
    },

    onAuthenticated: function (alreadyAuthenticated) {
        if (!alreadyAuthenticated) {
            this.loadAuthenticatedAgent();
        }
    },

    onDisplayNotification: function (params) {
        Ext.toast({
            html: params.message,
            title: params.title,
            width: 200,
            align: 'br',
            header: false
        });
    },

    onAuthenticationRequired: function () {
        var appContainer = this.lookupReference('appContainer');
        if (appContainer !== null) {
            appContainer.hide();
        }
        Ext.create('Spm.view.application.LoginDialog').show();
    },

    onAuthenticatedAgentLoaded: function (store, records, success) {
        if (success) {
            this.getViewModel().set('authenticatedAgent', records[0]);

            this.fireEvent('authenticated', records[0]);
            this.lookupReference('appContainer').show();
        }
    },

    loadAuthenticatedAgent: function () {
        this.getStore('authenticatedAgent').load();
    },

    startAuthentication: function () {
        this.loadAuthenticatedAgent();
    },

    beforeRender: function () {
        this.startAuthentication();
    }
});
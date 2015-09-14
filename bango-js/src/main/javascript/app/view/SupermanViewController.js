Ext.define('Spm.view.SupermanViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.superman',

    requires: [
        'Ext.window.Toast',
        'Spm.view.container.AppContainer',
        'Spm.view.login.LoginDialog'
    ],

    listen: {
        global: {
            authenticationRequired: 'onAuthenticationRequired',
            displayNotification: 'onDisplayNotification'
        },
        proxy: {
            '*': {
                exception: 'onProxyException'
            }
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

    onProxyException: function (proxy, response) {
        if (response.status == 403) {
            Ext.GlobalEvents.fireEvent('authenticationRequired', response);
        }

        if (response.status == 400) {
            Ext.Msg.alert("Error", Ext.JSON.decode(response.responseText).message);
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
            appContainer.destroy();
        }
        Ext.create('Spm.view.login.LoginDialog').show();
    },

    onAuthenticatedAgentLoaded: function (store, records, success) {
        if (success) {
            var record = records[0];
            this.getViewModel().set('authenticatedAgent', record);

            var appContainer = Ext.create('Spm.view.container.AppContainer');
            this.getView().add(appContainer);
            this.fireEvent('authenticated', record);
        }
    },

    loadAuthenticatedAgent: function () {
        this.getStore('authenticatedAgents').load();
    },

    beforeRender: function () {
        this.loadAuthenticatedAgent();
    }
});
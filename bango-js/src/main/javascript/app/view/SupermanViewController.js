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
        if (response.status == 403 || response.status == 401) {
            this.onAuthenticationRequired(response);
        } else if (response.status == 400) {
            Ext.Msg.alert("Error", Ext.JSON.decode(response.responseText).message);
        } else if (response.status == 500) {
            Ext.Msg.alert("Error", response.responseText);
        }
    },

    onLogout: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: me.onAuthenticationRequired,
            scope: me
        });
    },

    onPerformAuthentication: function (credentials) {
        var me = this;

        Ext.Ajax.request({
            url: 'j_spring_security_check',
            params: credentials,
            success: me.loadAuthenticatedAgent,
            scope: me,
            failure: function (response) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: response.statusText,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.WARNING,
                    closable: false,
                    callback: me.onAuthenticationRequired,
                    scope: me
                });
            }
        });
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
            var authenticatedAgent = records[0];
            this.getViewModel().set('authenticatedAgent', authenticatedAgent);

            var appContainer = Spm.view.container.AppContainer.create({authenticatedAgent: authenticatedAgent});
            this.getView().add(appContainer);
        }
    },

    loadAuthenticatedAgent: function () {
        this.getStore('authenticatedAgents').load();
    },

    beforeRender: function () {
        this.loadAuthenticatedAgent();
    }
});

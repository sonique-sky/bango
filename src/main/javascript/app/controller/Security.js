Ext.define('Spm.controller.Security', {
    extend: 'Ext.app.Controller',
    alias: 'controller.security',

    models: [
        'Agent'
    ],
    stores: [
        'AuthenticatedAgent'
    ],
    views: [
        'SpmViewport'
    ],

    refs: [
        {
            ref: 'appContainer',
            selector: 'appContainer',
            xtype: 'appContainer'
        },
        {
            ref: 'loginWindow',
            selector: 'loginWindow',
            xtype: 'loginWindow'
        }
    ],

    onPerformAuthentication: function (credentials) {
        var me = this;
        Ext.Ajax.request({
            url: 'j_spring_security_check',
            params: credentials,
            success: function (response) {
                me.onAuthenticated(false);
            }
        });
    },

    onAuthenticated: function (alreadyAuthenticated) {
        if (!alreadyAuthenticated) {
            this.getAuthenticatedAgentStore().load();
            this.getLoginWindow().close();
        }
        this.getAppContainer().setVisible(true);
    },

    onAuthenticationRequired: function (response) {
        this.getAppContainer().setVisible(false);
        Ext.create('Spm.view.LoginWindow').show();
    },

    startAuthentication: function () {
        var me = this;
        this.getAuthenticatedAgentStore().load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            me.onAuthenticated(true);
                        }
                    }
                });
    },

    onLogout: function () {
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: function (response) {
                Spm.application.fireEvent('authenticationRequired');
            }
        });
    },

    init: function (application) {
        this.listen({
            controller: {
                '#Errors' : {
                    authenticationRequired: this.onAuthenticationRequired
                },
                '#Login' : {
                    performAuthentication: this.onPerformAuthentication
                }
            }
        });

        application.on({
            logout: {
                fn: this.onLogout,
                scope: this
            }
        });
    },

    onLaunch: function() {
        this.startAuthentication();
    }
});

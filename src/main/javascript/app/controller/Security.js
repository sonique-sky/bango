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
        'SpmViewport',
        'HeaderView'
    ],

    refs: [
        {
            ref: 'appContainer',
            selector: 'appContainer',
            xtype: 'appContainer'
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
        }
        this.getAppContainer().setVisible(true);
    },

    onAuthenticationRequired: function () {
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
        var me = this;
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: function () {
                me.onAuthenticationRequired();
            }
        });
    },

    init: function () {
        this.listen({
            controller: {
                '#Errors': {
                    authenticationRequired: this.onAuthenticationRequired
                },
                '#Login': {
                    performAuthentication: this.onPerformAuthentication
                }
            },
            component: {
                'headerView': {
                    logout: this.onLogout
                },
                "loginWindow": {
                    accepted: this.onPerformAuthentication
                }
            }
        });
    },

    onLaunch: function () {
        this.startAuthentication();
    }
});

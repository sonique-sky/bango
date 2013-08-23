Ext.define('Spm.controller.SecurityController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.securityController',

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

    onPerformAuthentication: function(credentials) {
        Ext.Ajax.request({
            url: 'j_spring_security_check',
            params: credentials,
            success: function(response) {
                Spm.application.fireEvent('authenticated', false);
            }
        });
    },

    onAuthenticated: function(alreadyAuthenticated) {
        if(!alreadyAuthenticated) {
            this.getAuthenticatedAgentStore().load();
            this.getLoginWindow().close();
        }
        this.getAppContainer().setVisible(true);
    },

    onAuthenticationRequired: function(response) {
        this.getAppContainer().setVisible(false);
        Ext.create('Spm.view.LoginWindow').show();
    },

    onStartAuthentication: function() {
        this.getAuthenticatedAgentStore().load(
        {
            callback : function(records,operation,success){
                if(success) {
                    Spm.application.fireEvent('authenticated', true);
                }
            }
        });
    },

    onLogout: function() {
        Ext.Ajax.request({
            url: 'j_spring_security_logout',
            success: function(response) {
                Spm.application.fireEvent('authenticationRequired');
            }
        });
    },

    init: function(application) {
        application.on({
            performAuthentication: {
                fn: this.onPerformAuthentication,
                scope: this
            },
            authenticated: {
                fn: this.onAuthenticated,
                scope: this
            },
            authenticationRequired: {
                fn: this.onAuthenticationRequired,
                scope: this
            },
            startAuthentication: {
                fn: this.onStartAuthentication,
                scope: this
            },
            logout: {
                fn: this.onLogout,
                scope: this
            }
        });
    }

});

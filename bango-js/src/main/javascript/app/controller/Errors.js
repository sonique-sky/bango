Ext.define('Spm.controller.Errors', {
    extend: 'Ext.app.Controller',
    alias: 'controller.errors',

    requires: ['Spm.domain.ProxyEventDomain'],

    listen: {
        proxy: {
            '#ajax': {
                exception: 'onProxyException'
            },
            '#rest': {
                exception: 'onProxyException'
            }
        }
    },

    onProxyException: function (proxy, response, operation, eOpts) {
        if (response.status == 403) {
            Ext.GlobalEvents.fireEvent('authenticationRequired', response);
        }
    }
});
Ext.define('Spm.controller.Errors', {
    extend: 'Ext.app.Controller',
    alias: 'controller.errors',

    requires: ['Spm.domain.ProxyEventDomain'],

    listen: {
        proxy: {
            '*': {
                exception: 'onProxyException'
            }
        }
    },

    onProxyException: function (proxy, response, operation, eOpts) {
        if (response.status == 403) {
            Ext.GlobalEvents.fireEvent('authenticationRequired', response);
        }

        if (response.status == 400) {
            Ext.Msg.alert("Error", JSON.parse(response.responseText).message);
        }
    }
});
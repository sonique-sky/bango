Ext.define('Spm.controller.Errors', {
    extend: 'Ext.app.Controller',
    alias: 'controller.errors',

    requires: ['Spm.domain.ProxyEventDomain'],

    init: function () {
        this.listen({
            proxy: {
                '#ajax': {
                    exception: this.onProxyException
                }
            }
        });
    },

    onProxyException: function (proxy, response, operation, eOpts) {
        this.fireEvent('authenticationRequired', response);
    }
});
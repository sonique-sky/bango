Ext.define('Spm.store.ResolutionReasons', {
    extend: 'Ext.data.Store',
    alias: 'store.resolutionReasons',

    requires: [
        'Spm.proxy.ResolutionReasonsProxy'
    ],

    proxy: 'resolutionReasonsProxy',

    autoLoad: false

});
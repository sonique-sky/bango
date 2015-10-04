Ext.define('Spm.store.Causes', {
    extend: 'Ext.data.Store',
    alias: 'store.causes',

    requires: [
        'Spm.proxy.CausesProxy'
    ],

    proxy: 'causesProxy',

    autoLoad: false

});
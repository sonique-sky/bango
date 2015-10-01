Ext.define('Spm.store.Faults', {
    extend: 'Ext.data.Store',
    alias: 'store.faults',

    requires: [
        'Spm.proxy.FaultsProxy'
    ],

    proxy: 'faultsProxy',

    autoLoad: false

});
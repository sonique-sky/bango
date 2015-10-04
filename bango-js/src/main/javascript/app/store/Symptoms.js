Ext.define('Spm.store.Symptoms', {
    extend: 'Ext.data.Store',
    alias: 'store.symptoms',

    requires: [
        'Spm.proxy.SymptomsProxy'
    ],

    autoLoad: false,

    proxy: 'symptomsProxy'

});
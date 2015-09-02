Ext.define('Spm.store.Symptoms', {
    extend: 'Ext.data.Store',
    alias: 'store.symptoms',

    autoLoad: false,

    proxy: 'symptomsProxy'

});
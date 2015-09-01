Ext.define('Spm.store.TestProducts', {
    extend: 'Ext.data.Store',
    alias: 'store.testProducts',

    autoLoad: false,

    proxy: 'testProductsProxy'

});
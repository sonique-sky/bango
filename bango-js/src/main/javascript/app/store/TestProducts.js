Ext.define('Spm.store.TestProducts', {
    extend: 'Ext.data.Store',
    alias: 'store.testProducts',

    requires: [
        'Spm.proxy.TestProductsProxy'
    ],

    autoLoad: false,

    proxy: 'testProductsProxy'

});
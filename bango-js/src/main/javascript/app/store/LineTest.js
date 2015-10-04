Ext.define('Spm.store.LineTest', {
    extend: 'Ext.data.Store',
    alias: 'store.lineTest',

    requires: [
        'Spm.proxy.LineTestProxy'
    ],

    autoLoad: false,

    proxy: 'lineTestProxy'

});
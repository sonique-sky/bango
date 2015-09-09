Ext.define('Spm.store.TroubleReports', {
    extend: 'Ext.data.Store',
    alias: 'store.troubleReports',

    requires: [
        'Spm.proxy.TroubleReportProxy'
    ],

    autoLoad: false,
    filterOnLoad: false,
    model: 'Spm.model.TroubleReport',
    sortOnLoad: false,

    proxy: {
        type: 'troubleReportProxy'
    }
});
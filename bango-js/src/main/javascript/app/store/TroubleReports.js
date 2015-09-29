Ext.define('Spm.store.TroubleReports', {
    extend: 'Ext.data.Store',
    alias: 'store.troubleReports',

    requires: [
        'Spm.model.TroubleReport',
        'Spm.proxy.TroubleReportProxy'
    ],

    autoLoad: false,
    filterOnLoad: false,
    model: 'Spm.model.TroubleReport',
    sortOnLoad: true,
    sorters: [
        {
            property: 'troubleReportId',
            direction: 'DESC'
        }
    ],

    proxy: {
        type: 'troubleReportProxy'
    }
});
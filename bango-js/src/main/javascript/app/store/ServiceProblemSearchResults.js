Ext.define('Spm.store.ServiceProblemSearchResults', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblemSearchResults',

    requires: [
        'Spm.proxy.ServiceProblemSearchProxy'
    ],

    autoLoad: false,
    filterOnLoad: false,
    model: 'Spm.model.ServiceProblem',
    sortOnLoad: false,

    proxy: {
        type: 'serviceProblemSearchProxy'
    }
});
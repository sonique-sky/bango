Ext.define('Spm.store.ServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblems',

    requires: [
        'Ext.data.proxy.Rest',
        'Spm.model.ServiceProblem'
    ],

    model: 'Spm.model.ServiceProblem',

    remoteSort: true,
    remoteFilter: true,

    proxy: {
        type: 'rest',
        url: 'api/serviceProblem',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
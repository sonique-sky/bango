Ext.define('Spm.proxy.ServiceProblemApiProxy', {
    extend: 'Spm.proxy.ApiProxy',

    singleton: true,

    model: 'Spm.model.ServiceProblem',

    requires: [
        'Spm.model.ServiceProblem'
    ]
});
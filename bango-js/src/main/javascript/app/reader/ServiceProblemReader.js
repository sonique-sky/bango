Ext.define('Spm.reader.ServiceProblemReader', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'ServiceProblemReader',

    singleton: true,

    requires: [
        'Spm.model.ServiceProblem'
    ],

    model: 'Spm.model.ServiceProblem'
});
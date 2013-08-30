Ext.define('Spm.model.ServiceProblem', {
    extend: 'Ext.data.Model',
    alias: 'model.serviceProblem',

    uses: [
            'Spm.model.WorkItem'
    ],

    fields: [
        {
            name: 'serviceProblemId'
        },
        {
            name: 'status'
        },
        {
            name: 'hasActiveServiceProblem',
            type: 'boolean'
        }
    ],

    hasOne: [
        'workItem', {model: 'Spm.model.WorkItem', name: 'workItem', associationKey: 'workItem', getterName: 'workItem'}
    ]

});
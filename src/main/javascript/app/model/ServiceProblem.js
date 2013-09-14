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
            name: 'directoryNumber'
        },
        {
            name: 'hasActiveTroubleReport',
            type: 'boolean'
        }
    ],

    hasOne: [
        'workItem', {model: 'Spm.model.WorkItem', name: 'workItem', associationKey: 'workItem', getterName: 'workItem'},
        'queue', {model: 'Spm.model.Queue', name: 'queue', associationKey: 'queue', getterName: 'queue'}
    ],

    serviceProblemId: function() {
        return this.get('serviceProblemId');
    }

});
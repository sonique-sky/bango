Ext.define('Spm.model.ServiceProblem', {
    extend: 'Ext.data.Model',
    alias: 'model.serviceProblem',

    requires: [
        'Spm.model.WorkItem'
    ],

    idProperty: 'serviceProblemId',

    fields: [
        {
            name: 'serviceProblemId'
        },
        {
            name: 'status'
        },
        {
            name: 'snsServiceId'
        },
        {
            name: 'directoryNumber'
        },
        {
            name: 'hasActiveTroubleReport',
            type: 'boolean'
        },
        {
            name: 'customerName',
            mapping: 'endUserInformation.name'
        },
        {
            name: 'contactNumber',
            mapping: 'endUserInformation.preferredContactNumber'
        },
        {
            name: 'chordiantAccountNumber',
            mapping: 'endUserInformation.operatorAccountNumber'
        },
        {
            name: 'operatorReference'
        },
        {
            name: 'openedDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i:s'
        },
        {
            name: 'closedDate',
            type: 'date',
            dateFormat: 'd/m/Y H:i:s'
        },
        {
            name: 'problem'
        },
        {
            name: 'fault',
            mapping: 'resolution.fault'
        },
        {
            name: 'cause',
            mapping: 'resolution.cause'
        },
        {
            name: 'resolutionReason',
            mapping: 'resolution.resolutionReason'
        },
        {
            name: 'workItemId',
            reference: 'Spm.model.WorkItem',
            unique: true
        }
    ],

    proxy: {
        type: 'rest',
        url: 'api/serviceProblem'
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    hasWorkItem: function () {
        return this.getWorkItem() !== null;
    }
});
Ext.define('Spm.model.ServiceProblem', {
    extend: 'Ext.data.Model',
    alias: 'model.serviceProblem',

    requires: [
        'Spm.model.WorkItem',
        'Spm.reader.QueueReader'
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
        },
        {
            name: 'queue',
            convert: function (rawQueue) {
                return Spm.reader.QueueReader.fromJson(rawQueue);
            }
        }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        url: 'api/serviceProblem'
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    queue: function () {
        return this.get('queue');
    },

    hasWorkItem: function () {
        return this.getWorkItem() !== null;
    },

    hasActiveTroubleReport: function () {
        return this.get('hasActiveTroubleReport');
    },

    serviceType: function () {
        return this.getData().serviceType;
    },

    status: function () {
        return this.get('status');
    },

    isManagedLineTestRequested: function() {
        return this.get('isManagedLineTestRequested');
    }

});
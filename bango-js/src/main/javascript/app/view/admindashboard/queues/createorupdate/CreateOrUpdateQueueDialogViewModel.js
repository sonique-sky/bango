Ext.define('Spm.view.admindashboard.queues.createorupdate.CreateOrUpdateQueueDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createOrUpdateQueueDialog',

    data: {
        queue: null
    },

    stores: {
        queueDomains: {
            fields: ['name'],
            data: [
                ['SNS'],
                ['ThirdParty'],
                ['CST'],
                ['Project'],
                ['ROI'],
                ['BTIreland']
            ]
        }
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{queue}',
                deep: true
            },
            get: function (queue) {
                return !queue.get('name')
                    || !queue.get('pullSla')
                    || !queue.get('domain');
            }
        }
    },

    queue: function () {
        return this.get('queue');
    }

});
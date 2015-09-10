Ext.define('Spm.view.serviceproblem.nextworkitem.NextWorkItemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.nextWorkItemDialog',

    data: {
        nextWorkItem: null
    },

    stores: {
        workItemActions: {
            proxy: {
                type: 'ajax',
                url: 'api/serviceProblem/workItemActions',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            autoLoad: true
        }
    },

    workItem: function () {
        return this.get('workItem');
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    nextWorkItem: function () {
        return this.get('nextWorkItem');
    }

});

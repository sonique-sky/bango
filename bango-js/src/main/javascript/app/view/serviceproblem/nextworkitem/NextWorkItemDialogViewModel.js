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

    serviceProblem: function () {
        return this.get('serviceProblem');
    },

    nextWorkItem: function () {
        return this.get('nextWorkItem');
    }

});

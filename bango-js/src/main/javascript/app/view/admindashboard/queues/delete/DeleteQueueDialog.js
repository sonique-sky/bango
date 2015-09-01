Ext.define('Spm.view.admindashboard.queues.delete.DeleteQueueDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.deleteQueueDialog',

    controller: 'deleteQueueDialog',
    viewModel: 'deleteQueueDialog',
    title: 'Confirm Queue Deletion',

    height: 200,
    width: 430,

    items: [
        {
            xtype: 'label',
            text: 'Are you sure you wish to delete queue?'
        }
    ]

});
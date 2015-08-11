Ext.define('Spm.view.queue.QueueTabToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    items: [
        {
            xtype: 'button',
            text: 'Select All',
            handler: 'onSelectAll'
        },
        {
            xtype: 'button',
            text: 'Deselect All',
            handler: 'onDeselectAll'
        },
        {
            xtype: 'button',
            text: 'Transfer',
            handler: 'onBulkTransfer'
        },
        {
            xtype: 'button',
            text: 'Clear'
        }
    ]
});
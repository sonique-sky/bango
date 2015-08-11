Ext.define('Spm.view.queue.BulkClearDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.bulkClearDialog',

    width: 350,
    height: 160,
    iconCls: 'icon-bulk-clear',
    title: 'Bulk Clear',
    controller: 'bulkClearDialog',

    items: [
        {
            xtype: 'label',
            cls: 'bulk-clear-message',
            bind: {
                html: '{message}'
            }
        }
    ]
});
Ext.define('Spm.view.queue.BulkTransferDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.bulkTransferDialog',

    height: 250,
    width: 450,
    iconCls: 'icon-bulk-transfer',
    title: 'Bulk Transfer',

    config: {
        parentQueueTab: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            collectFn: this.getItemsOfInterestArray,
            acceptButtonText: 'Transfer',
            acceptButtonDefaultDisabled: true,
            content: {
                id: 'bulk-transfer-view',
                xtype: 'dataview',
                cls: 'bulk-transfer-view',
                tpl: [
                    '<div id="transfer-queues-group">',
                    '   <tpl for=".">',
                    '      <div id="transfer-{name}" class="queue x-view-item">{name}</div>',
                    '   </tpl>',
                    '</div>'
                ],
                itemSelector: 'div.queue',
                overItemCls: 'x-item-over',
                store: 'AllQueues',
                trackOver: true,
                autoScroll: true,
                margin: 5,
                border: 1,
                style: {
                    borderColor: '#bcb1b0',
                    borderStyle: 'solid'
                },
                listeners: {
                    select: { fn: me.onQueueSelected, scope: me}
                }
            }
        });

        me.callParent(arguments);
    },

    onQueueSelected: function () {
        this.setAcceptButtonDisabled(false);
    },

    getItemsOfInterestArray: function () {
        return ['bulkTransfer', this.parentQueueTab, this.down('dataview').getSelectionModel().getSelection()[0]];
    }
});
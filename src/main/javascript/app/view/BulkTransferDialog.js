Ext.define('Spm.view.BulkTransferDialog', {
    extend: 'Ext.window.Window',
    alias: 'widget.bulkTransferDialog',

    height: 300,
    width: 500,
    layout: {
        type: 'vbox'
    },
    iconCls: 'icon-queue',
    title: 'Bulk Transfer',
    modal: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    id: 'bulk-transfer-view',
                    xtype: 'dataview',
                    flex: 1,
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
                    margin: 10
                },
                {
                    xtype: 'container',
                    layout: {
                        pack: 'end',
                        type: 'hbox'
                    },
                    width: '100%',
                    padding: 5,
                    items: [
                        {
                            xtype: 'button',
                            id: 'ok-button',
                            text: 'Ok'
                        },
                        {
                            xtype: 'tbspacer',
                            width: 5
                        },
                        {
                            xtype: 'button',
                            id: 'cancel-button',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
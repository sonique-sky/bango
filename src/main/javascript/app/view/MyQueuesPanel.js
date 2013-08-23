Ext.define('Spm.view.MyQueuesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.myQueuesPanel',

    cls: 'my-queues-panel',
    layout: {
        type: 'fit'
    },
    animCollapse: false,
    collapsible: true,
    title: 'My Queues',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'dataview',
                    cls: 'my-queues',
                    tpl: [
                        '<ul>',
                        '	<tpl for=".">',
                        '		<li class="queue-wrap" id="queue-{id}">',
                        '            <div>{name}</div>',
                        '        </li>',
                        '	</tpl>',
                        '</ul>',
                        ''
                    ],
                    itemSelector: 'li.queue-wrap',
                    overItemCls: 'x-item-over',
                    store: 'QueueStore',
                    trackOver: true,
                    listeners: {
                        select: {
                            fn: me.onQueueSelect,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onQueueSelect: function (dataviewmodel, record, eOpts) {
        Spm.application.fireEvent('queueSelected', record);
    }

});
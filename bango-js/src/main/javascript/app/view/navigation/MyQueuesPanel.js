Ext.define('Spm.view.navigation.MyQueuesPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.myQueuesPanel',

    cls: 'my-queues-panel',
    iconCls: 'icon-queue',
    title: 'My Queues',
    maxHeight: 300,
    overflowY: 'auto',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    id: 'my-queues-view',
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
                    store: 'AgentQueues',
                    trackOver: true
                }
            ]
        });

        me.callParent(arguments);
    }
});
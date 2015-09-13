Ext.define('Spm.view.navigation.queues.Queues', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.myQueues',

    controller: 'myQueues',
    reference: 'myQueues',

    cls: 'queues-panel',
    iconCls: 'icon-queue',
    title: 'My Queues',
    maxHeight: 300,
    overflowY: 'auto',
    collapsible: true,

    items: [
        {
            id: 'queues-view',
            reference: 'myQueuesDataView',
            xtype: 'dataview',
            cls: 'queues',
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
            bind: {
                store: '{agentQueues}'
            },
            trackOver: true,
            listeners: {
                select: 'onAgentQueueSelect'
            }
        }
    ]
});
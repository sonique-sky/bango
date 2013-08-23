Ext.define('Spm.view.QueueTabContent', {
    extend: 'Ext.container.Container',
    alias: 'widget.queueTabContent',

    height: 505,
    width: 536,

    initComponent: function () {
        var me = this;

        me.processQueueContainer(me);
        me.callParent(arguments);
    },

    processQueueContainer: function (config) {
        var items = [];
        var toolbarConfig = {};

        items.push({
            id: 'foo-' + config.queue.get('id'),
            itemId: 'foo-' + config.queue.get('id'),
            text: config.queue.get('name')
        });

        toolbarConfig.items = items;

        config.items = Ext.create('widget.toolbar', toolbarConfig);
    }

});
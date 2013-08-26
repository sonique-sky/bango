Ext.define('Spm.controller.MyQueues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myQueues',

    views: [
        'MyQueuesPanel'
    ],

    init: function () {
        this.listen({
            component: {
                "#my-queues-view": {
                    select: this.onQueueSelect
                }
            }
        });
    },

    onQueueSelect: function (dataviewmodel, record) {
        this.fireEvent('queueSelected', record);
    }
});

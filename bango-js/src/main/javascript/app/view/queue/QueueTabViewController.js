Ext.define('Spm.view.queue.QueueTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueTab',

    listen: {
        component: {
            'queueTab': {
                activate: 'onQueueTabActivated',
                close: 'onQueueTabClosed'
            }
        }
    },

    onQueueTabActivated: function () {
        this.fireEvent('queueTabSelected', this.getViewModel().get('queue').get('id'));
    },

    onQueueTabClosed: function () {
        this.fireEvent('queueTabClosed', this.getViewModel().get('queue').get('id'));
    }

});
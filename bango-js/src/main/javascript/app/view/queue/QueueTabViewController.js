Ext.define('Spm.view.queue.QueueTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueTab',

    listen: {
        component: {
            'queueTab': {
                activate: 'onQueueTabActivated'
            }
        }
    },

    onQueueTabActivated: function () {
        this.fireEvent('queueTabSelected', this.getViewModel().get('queue').get('id'));
    }

});
Ext.define('Spm.mixin.TabHeaderId', {
    queueTabHeaderIdFor: function(queue) {
        return 'tab-header-id-queue-' + queue.get('id');
    }
});
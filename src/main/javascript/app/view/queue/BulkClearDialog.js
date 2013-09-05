Ext.define('Spm.view.queue.BulkClearDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.bulkClearDialog',

    width: 350,
    height: 160,
    iconCls: 'icon-bulk-clear',
    title: 'Bulk Clear',

    config: {
        parentQueueTab: undefined
    },

    initComponent: function () {
        var me = this;

        var message = this.messageFor(me.hasActiveTroubleReports);

        Ext.apply(me, {
            collectFn: this.getItemsOfInterestArray,
            acceptButtonText: 'Continue',
            content: {
                xtype: 'label',

                cls: 'bulk-clear-message',
                html: message
            }
        });

        me.callParent(arguments);
    },

    messageFor: function (hasActiveTroubleReports) {
        if(hasActiveTroubleReports) {
            return 'One or more of the selected Service Problems has an active Trouble Report.<br/><br/>Are you sure you wish to continue?';
        }

        return 'Are you sure you wish to clear these Service Problems?';
    },

    getItemsOfInterestArray: function() {
        return ['bulk-clear', this.parentQueueTab];
    }
});
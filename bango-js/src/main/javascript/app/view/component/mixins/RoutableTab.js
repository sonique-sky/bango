Ext.define('Spm.view.component.mixins.RoutableTab', {
    extend: 'Ext.Mixin',
    alternateClass: 'Spm.component.RoutableTab',

    parentTabId: undefined,

    mixinConfig: {
        after: {
            initComponent: 'addRoutingRedirect'
        }
    },

    addRoutingRedirect: function () {
        var me = this;
        me.on('activate', function () {
            if (me.controller) {
                var tabPath = 'tab/';
                if(me.parentTabId) {
                    tabPath += me.parentTabId + '--'
                }
                tabPath += me.itemId;
                me.controller.redirectTo(tabPath, false);
            }
        });
    }

});

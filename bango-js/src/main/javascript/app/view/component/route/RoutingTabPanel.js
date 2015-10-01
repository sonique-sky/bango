Ext.define('Spm.view.component.route.RoutingTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.routingTabPanel',

    requires: [
        'Spm.view.component.route.RoutingTabPanelViewController'
    ],

    controller: 'routingTab',

    listeners: {
        add: 'onAddRoutingTab',
        tabChange: 'onRoutingTabChange',
        activate: 'onActivateRoutingTab'
    }

});

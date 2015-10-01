Ext.define('Spm.view.component.route.RoutingTabPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.routingTab',

    onAddRoutingTab: function (tabPanel, tab, index, eOpts) {
        console.log('adding ' + tab.itemId);
        var parentTab = tabPanel.findParentByType('routingTabPanel');

        console.log(tabPanel);
        console.log(parentTab);
        if(parentTab) {
            console.log('parent ' + parentTab.getActiveTab().itemId);
        }
    },

    onRoutingTabChange: function (tabPanel, newTab) {
        var route = 'tab/';
        var parentTab = tabPanel.findParentByType('routingTabPanel');
        if (parentTab) {
            route += parentTab.getActiveTab().itemId + '--';
        }
        route += newTab.itemId;
        this.redirectTo(route, false);
    },

    onActivateRoutingTab: function (tabPanel) {
        this.onRoutingTabChange(tabPanel, tabPanel.getActiveTab());
    }

});

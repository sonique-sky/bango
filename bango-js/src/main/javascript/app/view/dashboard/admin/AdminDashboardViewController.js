Ext.define('Spm.view.dashboard.admin.AdminDashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminDashboardTab',

    routes: {
        'tab/adminDashboard--:tabId' : {
            action: 'setActiveTab'
        }
    },

    loadActiveTab: function () {
        var activeTabs = this.getViewModel().get('activeTabs');
        console.log(activeTabs);
        this.setActiveTab(activeTabs.shift());
    },

    setActiveTab: function(tabId) {
        //var activeTab = this.getActiveTab();
        //if (activeTab.itemId !== tabId) {
        //    this.setActiveTab(tabId);
        //}
    }

});

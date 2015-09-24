Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.updateProblemCategoryDialog',

    requires: [
        'Ext.panel.Panel',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping'
    ],

    loadAssignmentCodeTabs: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'api/assignmentCode',
            success: function (response) {
                var tabPanel = me.lookupReference('assignmentCodeTabPanel');

                var payload = Ext.JSON.decode(response.responseText);
                Ext.Array.each(payload.data, function (assignmentCode) {
                    tabPanel.add({xtype: 'assignmentMapping', title: assignmentCode});
                });

                tabPanel.add({xtype: 'panel', title: '+'});
                tabPanel.setActiveTab(0);
            }
        });
    },

    onAccept: function () {
        var me = this,
            problemCategoryStore = me.getViewModel().get('problemCategories');

        problemCategoryStore.sync({
            scope: me,
            success: me.closeView,
            failure: function () {
                problemCategoryStore.reload();
                me.closeView();
            }
        });
    }

});

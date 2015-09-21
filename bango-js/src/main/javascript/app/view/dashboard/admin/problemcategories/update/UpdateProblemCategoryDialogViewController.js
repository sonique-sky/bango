Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.updateProblemCategoryDialog',



    initViewModel: function (viewModel) {
        var me = this;
        Ext.Ajax.request({
            url: 'api/assignmentCode',
            success: function (response) {
                var tabPanel = me.lookupReference('assignmentCodeTabPanel');

                var payload = Ext.JSON.decode(response.responseText);
                Ext.Array.each(payload.data, function (assignementCode) {
                    tabPanel.add({xtype: 'assignmentMapping', title: assignementCode});
                });

                tabPanel.add({xtype: 'panel', title: '+'});
            }
        })
    },

    onAccept: function () {
        this.closeView();
    }

});

Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.updateProblemCategoryDialog',

    requires: [
        'Ext.form.field.Text',
        'Ext.panel.Panel',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping'
    ],

    newAssignmentTab: function (tabPanel, me) {
        return {
            xtype: 'panel',
            reference: 'addNewAssignment',
            title: '+',
            tabConfig: {
                clickEvent: 'click',
                handler: function (btn) {
                    var ed = Ext.create('Ext.Editor', {
                        field: {
                            xtype: 'textfield'
                        },
                        listeners: {
                            canceledit: function(){
                              tabPanel.setActiveTab(0);
                            },
                            deactivate: function(){
                              tabPanel.setActiveTab(0);
                            },
                            complete: function (ed, newValue, startValue) {
                                if (newValue !== startValue) {
                                    var newAssignmentTab = me.lookupReference('addNewAssignment');
                                    tabPanel.remove(newAssignmentTab);
                                    tabPanel.add(me.createNewTab(newValue)).show();
                                    tabPanel.add(me.newAssignmentTab(tabPanel, me));
                                }
                            }
                        }
                    });
                    ed.startEdit(btn.getEl(), '', true);
                }
            }
        };
    },

    loadAssignmentCodeTabs: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'api/assignmentCode',
            success: function (response) {
                var tabPanel = me.lookupReference('assignmentCodeTabPanel');

                var payload = Ext.JSON.decode(response.responseText);
                Ext.Array.each(payload.data, function (assignmentCode) {
                    tabPanel.add({
                            xtype: 'assignmentMapping',
                            title: assignmentCode
                        }
                    );
                });

                tabPanel.add(me.newAssignmentTab(tabPanel, me));

                tabPanel.setActiveTab(0);
            }
        });
    },

    createNewTab: function (title) {
        return {
            xtype: 'assignmentMapping',
            title: title
        };
    },

    onAccept: function () {
        var me = this,
            problemCategoryStore = me.getViewModel().get('problemCategories'),
            mode = me.getViewModel().get('mode');

        if (mode === 'Create') {
            problemCategoryStore.add(me.getViewModel().get('problemCategory'));
        }

        problemCategoryStore.sync({
            scope: me,
            success: function () {
                me.closeView();
            },
            failure: function () {
                problemCategoryStore.reload();
                me.closeView();
            }
        });
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', false);
    },

    onCancel: function () {
        this.getViewModel().get('problemCategories').reload();
        this.getViewModel().get('problemCategory').set('veryDirtyFlag', false);
        this.callParent();
    }

});

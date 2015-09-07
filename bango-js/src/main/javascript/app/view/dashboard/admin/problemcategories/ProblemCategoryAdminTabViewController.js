Ext.define('Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.problemCategoryAdminTab',

    listen: {
        controller: {
            'updateProblemCategoryDialog': {
                rowAdded: 'selectFirstRow'
            }
        }
    },

    onActivated: function () {
        this.getViewModel().getStore('problemCategories').load();
    },

    selectFirstRow: function (store) {
        var first = store.first();
        if (first) {
            this.getView().setSelection(first);
        }
    },

    selectedRow: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    updateRow: function () {
        var dialog = this.getView().add({
            xtype: 'updateProblemCategoryDialog',
            title: 'Edit Problem Category and Routing',
            viewModel: {
                data: {
                    problemCategory: this.selectedRow()
                }
            }
        });

        dialog.show();
    },

    createRow: function () {
        var dialog = this.getView().add({
            xtype: 'updateProblemCategoryDialog',
            title: 'Create Problem Category',
            viewModel: {
                data: {
                    queue: Ext.create('Spm.model.ProblemCategory')
                }
            }
        });

        dialog.show();
    },

    //deleteProblemCategory: function () {
    //    var me = this;
    //    var selectedRow = this.selectedRow();
    //
    //    if (selectedRow) {
    //        var store = this.getStore('problemCategories');
    //        Ext.Msg.show({
    //            title: 'Delete Problem Category',
    //            msg: Ext.String.format('Are you sure you wish to delete problem category [{0}]?', selectedQueue.get('name')),
    //            buttons: Ext.Msg.YESNO,
    //            icon: Ext.Msg.QUESTION,
    //            callback: function (buttonId) {
    //                if ('yes' == buttonId) {
    //                    store.remove(selectedRow);
    //                    store.sync({
    //                        failure: function () {
    //                            me.loadStore();
    //                        }
    //                    });
    //                    me.selectFirstRow(store);
    //                }
    //            }
    //        });
    //    }
    //},

    renderYesNoValue: function (value) {
        return value === true ? 'Yes' : 'No';
    }
});
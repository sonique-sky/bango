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

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
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
        this.getView().add({
            xtype: 'updateProblemCategoryDialog',
            viewModel: {
                data: {
                    problemCategory: this.selectedRow(),
                    mode: 'Update'
                }
            }
        }).show();
    },

    createRow: function () {
        this.getView().add({
            xtype: 'updateProblemCategoryDialog',
            viewModel: {
                data: {
                    problemCategory: Ext.create('Spm.model.ProblemCategory'),
                    mode: 'Create'
                }
            }
        }).show();
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
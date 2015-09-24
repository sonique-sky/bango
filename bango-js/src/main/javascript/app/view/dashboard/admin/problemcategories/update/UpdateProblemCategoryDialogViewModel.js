Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.updateProblemCategoryDialog',

    data: {
        problemCategory: null
    },

    stores: {
        queues: {
            type: 'queues',
            pageSize: 0,
            autoLoad: true
        }
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{problemCategory}',
                deep: true
            },
            get: function (problemCategory) {
                return !problemCategory.dirty;
            }
        }
    },

    problemCategory: function () {
        return this.get('problemCategory');
    }

});
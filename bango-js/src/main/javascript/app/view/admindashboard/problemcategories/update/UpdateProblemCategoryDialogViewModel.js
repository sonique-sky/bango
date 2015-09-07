Ext.define('Spm.view.admindashboard.problemcategories.update.UpdateProblemCategoryDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.updateProblemCategoryDialog',

    data: {
        problemCategory: null
    },

    stores: {
        queues: {
            type: 'queues',
            pageSize: 0
        }
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{problemCategory}',
                deep: true
            },
            get: function (problemCategory) {
                return false;
            }
        }
    },

    problemCategory: function () {
        return this.get('problemCategory');
    }

});
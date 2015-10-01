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
                return problemCategory === null
                    || !problemCategory.dirty
                    || problemCategory.problemCode() === null
                    || problemCategory.description() === null
                    || problemCategory.problemCode().length == 0
                    || problemCategory.description().length == 0;
            }
        },
        titleForMode: {
            bind: {
                bindTo: '{mode}'
            },
            get: function (mode) {
                if (mode === 'Create') {
                    return 'Create Problem Category';
                }
                return 'Edit Problem Category and Routing';
            }
        },
        readOnlyForMode: {
            bind: {
                bindTo: '{mode}'
            },
            get: function (mode) {
                return mode !== 'Create';

            }
        }
    },

    problemCategory: function () {
        return this.get('problemCategory');
    }

});
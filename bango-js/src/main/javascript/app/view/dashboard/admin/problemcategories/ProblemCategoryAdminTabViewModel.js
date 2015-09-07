Ext.define('Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.problemCategoryAdminTab',

    stores: {
        problemCategories: {
            type: 'problemCategories',
            autoSync: false,
            listeners: {
                load: 'selectFirstRow'
            }
        }
    }
});
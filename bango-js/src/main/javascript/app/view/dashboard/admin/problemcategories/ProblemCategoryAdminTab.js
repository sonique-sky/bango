Ext.define('Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.problemCategoryAdminTab',
    itemId: 'problemCategoryAdmin',

    requires: [
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewController',
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewModel'
    ],

    viewModel: {type: 'problemCategoryAdminTab'},
    controller: 'problemCategoryAdminTab',

    mixins: {
        tab: 'Spm.view.component.mixins.RoutableTab'
    },

    parentTabId: 'adminDashboard',

    listeners: {
        activate: 'loadStore'
    },

    bind: {
        store: '{problemCategories}'
    },

    title: 'Problem Categories',
    iconCls: 'icon-admin-dashboard',
    border: 0,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                xtype: 'button',
                padding: '5,5,5,5'
            },
            items: [
                {
                    tooltip: 'Update a Problem Category',
                    iconCls: 'icon-admin-problem-category-edit',
                    handler: 'updateRow'
                },
                {
                    tooltip: 'Create a Problem Category',
                    iconCls: 'icon-admin-problem-category-create',
                    handler: 'createRow'
                },
                //{
                //    tooltip: 'Delete a Problem Category',
                //    iconCls: 'icon-admin-problem-category-delete',
                //    handler: 'deleteRow'
                //},
                {
                    xtype: 'tbspacer'
                },
                {
                    xtype: 'pagingtoolbar',
                    border: 0,
                    bind: {
                        store: '{problemCategories}'
                    }
                }
            ]
        }
    ],

    columns: [
        {
            text: 'Code',
            width: '15%',
            dataIndex: 'problemCode'
        },
        {
            text: 'Description',
            width: '70%',
            dataIndex: 'description'
        },
        {
            text: 'Force Auto Trouble Report',
            width: '15%',
            dataIndex: 'forceAutoTroubleReport',
            renderer: 'renderYesNoValue'
        }
    ]
});

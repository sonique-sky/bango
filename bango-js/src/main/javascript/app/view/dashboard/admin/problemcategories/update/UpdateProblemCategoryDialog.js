Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.updateProblemCategoryDialog',

    requires: [
        'Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewController',
        'Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewModel'
    ],

    controller: 'updateProblemCategoryDialog',
    viewModel: {type: 'updateProblemCategoryDialog'},

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,

        defaults: {
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },

        width: 480,

        items: [
            {
                xtype: 'textfield',
                labelWidth: 150,
                itemId: 'problemCode',
                fieldLabel: 'Problem Code:',
                allowBlank: false,
                bind: {
                    value: '{problemCategory.problemCode}'
                }
            },
            {
                xtype: 'textfield',
                labelWidth: 150,
                itemId: 'description',
                fieldLabel: 'Description:',
                allowBlank: false,
                bind: {
                    value: '{problemCategory.description}'
                }
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Force Auto Trouble Report:',
                name: 'forceAutoTroubleReport',
                bind: {
                    value: '{problemCategory.forceAutoTroubleReport}'
                }
            },
            {
                xtype: 'tabpanel',
                reference: 'assignmentCodeTabPanel'
            }
        ]
    }]
});
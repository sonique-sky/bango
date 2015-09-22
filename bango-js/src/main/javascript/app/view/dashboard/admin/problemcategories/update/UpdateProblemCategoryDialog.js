Ext.define('Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.updateProblemCategoryDialog',

    reference: 'updateProblemCategory',

    requires: [
        'Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewController',
        'Spm.view.dashboard.admin.problemcategories.update.UpdateProblemCategoryDialogViewModel'
    ],

    controller: 'updateProblemCategoryDialog',
    viewModel: {type: 'updateProblemCategoryDialog'},

    listeners: {
        show: 'loadAssignmentCodeTabs'
    },

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,
        width: 480,
        height: 400,
        layout: {type: 'vbox', align: 'stretch'},

        defaults: {
            xtype: 'textfield',
            allowBlank: false,
            labelWidth: 150,
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },
        items: [
            {
                itemId: 'problemCode',
                fieldLabel: 'Problem Code:',
                bind: {
                    value: '{problemCategory.problemCode}'
                }
            },
            {
                itemId: 'description',
                fieldLabel: 'Description:',
                bind: {
                    value: '{problemCategory.description}'
                }
            },
            {
                xtype: 'checkbox',
                fieldLabel: 'Force Auto Trouble Report:',
                name: 'forceAutoTroubleReport',
                labelWidth: 200,
                bind: {
                    value: '{problemCategory.forceAutoTroubleReport}'
                }
            },
            {
                xtype: 'tabpanel',
                reference: 'assignmentCodeTabPanel',
                width: '100%',
                flex: 1
            }
        ]
    }]

});

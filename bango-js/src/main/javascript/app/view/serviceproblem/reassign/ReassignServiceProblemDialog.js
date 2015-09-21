Ext.define('Spm.view.serviceproblem.reassign.ReassignServiceProblemDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.reassignServiceProblemDialog',

    viewModel: {type: 'reassignServiceProblemDialog'},
    controller: 'reassignServiceProblemDialog',

    title: 'Reassign Service Problem',
    iconCls: 'icon-reassign',

    height: 250,
    width: 450,
    bodyPadding: 10,

    listeners: {
        show: 'onShow'
    },

    items: [
        {
            xtype: 'gridpanel',
            rowLines: false,
            reference: 'agentsGrid',
            height: 135,
            hideHeaders: true,
            bind: {
                store: '{agents}'
            },
            columns: [
                {
                    text: 'Agent',
                    dataIndex: 'code',
                    flex: 1
                }
            ]
        }
    ]
});
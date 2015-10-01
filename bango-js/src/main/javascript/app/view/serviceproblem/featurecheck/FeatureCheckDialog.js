Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.featureCheckDialog',

    viewModel: {type: 'featureCheckDialog'},
    controller: 'featureCheckDialog',

    title: 'Feature Request Results',

    height: 350,
    width: 250,
    bodyPadding: 10,

    listeners: {
        show: 'onShow'
    },

    items: [
        {
            xtype: 'gridpanel',
            rowLines: false,
            reference: 'mspGrid',
            height: 135,
            bind: {
                store: '{featureCheckResults}'
            },
            columns: [
                {
                    text: 'Feature',
                    dataIndex: 'name',
                    flex: 1
                },
                {
                    text: 'Enabled',
                    dataIndex: 'featureActive',
                    flex: 1
                }
            ]
        }
    ]
});
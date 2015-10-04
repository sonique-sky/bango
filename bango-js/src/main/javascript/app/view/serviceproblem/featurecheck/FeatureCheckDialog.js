Ext.define('Spm.view.serviceproblem.featurecheck.FeatureCheckDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.featureCheckDialog',

    requires: [
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.layout.container.Card',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewController',
        'Spm.view.serviceproblem.featurecheck.FeatureCheckDialogViewModel'
    ],

    viewModel: {type: 'featureCheckDialog'},
    controller: 'featureCheckDialog',

    title: 'Feature Request Results',

    height: 450,
    width: 400,
    bodyPadding: 2,

    listeners: {
        show: 'onShow'
    },
    closable: true,
    layout: 'card',
    items: [
        {
            xtype: 'panel',
            cls: 'feature-check-panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'noFeaturesFoundLabel',
                    text: 'No features found for the service',
                    cls: 'no-features-for-service-text'
                }
            ]
        },
        {
            xtype: 'gridpanel',
            rowLines: false,
            reference: 'featureCheckGrid',
            bind: {
                store: '{featureCheckResults}'
            },
            columns: [
                {
                    text: 'Feature',
                    dataIndex: 'name',
                    flex: 2
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

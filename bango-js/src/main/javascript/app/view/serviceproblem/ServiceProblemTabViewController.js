Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
    alias: 'controller.serviceProblemTab',

    requires: [
        'Spm.reader.ServiceProblemReader'
    ],

    onServiceProblemTabClosed: function () {
        this.fireEvent('serviceProblemTabClosed', this.getViewModel().serviceProblemId());
    },

    onSetWorkReminder: function () {
        this.doSetWorkReminder(this.getViewModel().serviceProblem(), Ext.emptyFn);
    },

    onServiceProblemTabAdded: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        if (!serviceProblem) {
            this.loadServiceProblem();
        } else {
            this.displayServiceProblem(serviceProblem);
        }
    },

    loadServiceProblem: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        Spm.model.ServiceProblem.load(serviceProblemId, {
            scope: this,
            success: this.displayServiceProblem
        });
    },

    displayServiceProblem: function (serviceProblem) {
        this.getViewModel().set('serviceProblem', serviceProblem);
        this.getViewModel().set('serviceProblemId', serviceProblem.serviceProblemId());
        this.getViewModel().set('workItem', serviceProblem.getWorkItem());

        var workItemPanel = this.lookupReference('workItemPanel');
        workItemPanel.fireEvent('switchWorkItem', serviceProblem);

        var eventHistoryPanel = this.lookupReference('eventHistoryPanel');
        eventHistoryPanel.fireEvent('serviceProblemLoaded', serviceProblem.serviceProblemId());

        this.getStore('troubleReports').load({
            params: {
                serviceProblemId: serviceProblem.serviceProblemId()
            }
        });

        Spm.model.TroubleReport.load(serviceProblem.serviceProblemId(), {
            scope: this,
            success: this.setTroubleReports
        });
    },

    setTroubleReports: function (troubleReport) {
        this.getViewModel().set('troubleReport', troubleReport);
    },

    showTroubleReportPanel: function () {
        var servicePanel = this.lookupReference('servicePanel');
        var troublePanel = this.lookupReference('troublePanel');
        var serviceProblem = this.getViewModel().serviceProblem();

        (!serviceProblem.getData().hasActiveTroubleReport) ? troublePanel.setActiveItem('hasNoTroubleReports') : troublePanel.setActiveItem('hasTroubleReports');

        servicePanel.setActiveItem('troubleReportPanel');
    },

    showServiceProblemPanel: function () {
        var servicePanel = this.lookupReference('servicePanel');
        servicePanel.setActiveItem('serviceProblemPanel');
    },

    onPullServiceProblem: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Confirm Assign',
            msg: 'Do you want to assign this Work Item to yourself?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    Ext.Ajax.request({
                        url: Ext.String.format('api/serviceProblem/{0}/pull', me.getViewModel().serviceProblemId()),
                        method: 'POST',
                        success: function (response) {
                            var serviceProblem = ServiceProblemReader.fromJsonString(response.responseText);
                            me.displayServiceProblem(serviceProblem);
                            me.fireEvent('serviceProblemPulled');

                            Ext.GlobalEvents.fireEvent('displayNotification', {
                                title: 'Service Problem Assigned',
                                message: Ext.String.format('Service Problem [{0}] has been assigned to you', serviceProblem.serviceProblemId())
                            });
                        }
                    });
                }
            }
        });
    },

    onCreateTroubleReport: function () {
        var me = this;

        var troubleReportTemplate = Ext.create('Spm.model.TroubleReportTemplate');
        troubleReportTemplate.load({
            params: {serviceProblemId: me.getViewModel().serviceProblemId()},
            success: function () {
                var dialog = me.getView().add({
                    xtype: 'troubleReportDialog',
                    viewModel: {
                        type: 'troubleReportDialog',
                        data: {
                            troubleReportTemplate: troubleReportTemplate
                        }
                    }
                });
                dialog.show();
            }
        });
    },

    onToggleHoldServiceProblem: function () {
        var me = this;

        this.doToggleHoldServiceProblem(
            me.getViewModel().serviceProblem(),
            function (response) {
                var serviceProblem = ServiceProblemReader.fromJsonString(response.responseText);
                me.displayServiceProblem(serviceProblem);
            }
        );
    },

    onSelectTroubleReport: function (view, td, cellIndex, record) {
        this.getViewModel().set('troubleReport', record);
    }
});

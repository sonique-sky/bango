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

    onTransferServiceProblem: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        var currentQueueId = this.getViewModel().serviceProblem().getData().queue.queueId;
        var dialog = this.getView().add({
            xtype: 'transferServiceProblemDialog',
            viewModel: {
                type: 'transferServiceProblemDialog',
                data: {
                    serviceProblem: serviceProblem,
                    currentQueueId: currentQueueId
                }
            }
        });
        dialog.show();
    },

    clearServiceProblem: function () {
        var me = this;
        var serviceProblem = this.getViewModel().serviceProblem();

        if (serviceProblem.getData().hasActiveTroubleReport) {
            Ext.Msg.show({
                title: 'Confirm Clear',
                msg: Ext.String.format('There is an Outstanding Trouble Report for this Service Problem - Are you sure you wish to clear this Service Problem?'),
                height: 125,
                width: 320,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                callback: function (buttonId) {
                    if ('yes' == buttonId) {
                        me.showClearServiceProblemDialog(serviceProblem);
                    } else {
                        me.close();
                    }
                }
            });
        } else {
            me.showClearServiceProblemDialog(serviceProblem);
        }
    },

    onSelectNextWorkItem: function () {
        var workItem = this.getViewModel().serviceProblem().getWorkItem();
        var serviceProblemId = this.getViewModel().serviceProblemId();

        var dialog = this.getView().add({
            xtype: 'nextWorkItemDialog',
            viewModel: {
                type: 'nextWorkItemDialog',
                data: {
                    workItem: workItem,
                    serviceProblemId: serviceProblemId
                }
            }
        });
        dialog.show();
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
            success: this.setTroubleReport
        });
    },

    setTroubleReport: function (troubleReport) {
        this.getViewModel().set('troubleReport', troubleReport);
        this.fireEvent('troubleReportLoaded', troubleReport);
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
        this.setTroubleReport(record);
    },

    showClearServiceProblemDialog: function (serviceProblem) {
        var dialog = this.getView().add({
            xtype: 'clearServiceProblemDialog',
            viewModel: {
                type: 'clearServiceProblemDialog',
                data: {
                    serviceProblem: serviceProblem
                }
            }
        });
        dialog.show();
    }

});

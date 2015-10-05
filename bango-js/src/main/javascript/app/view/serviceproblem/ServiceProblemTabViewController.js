Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewController', {
    extend: 'Spm.view.common.BaseServiceProblemViewController',
    alias: 'controller.serviceProblemTab',

    requires: [
        'Spm.reader.ServiceProblemReader',
        'Spm.view.serviceproblem.clear.ClearServiceProblemDialog',
        'Spm.view.serviceproblem.msp.AssociateServiceProblemToMspDialog',
        'Spm.view.serviceproblem.transfer.TransferServiceProblemDialog',
        'Spm.view.component.notification.Notification'
    ],

    listen: {
        controller: {
            'cancelTroubleReportDialog': {
                troubleReportCancelled: 'loadServiceProblem'
            },
            'troubleReportDialog': {
                troubleReportAmended: 'loadServiceProblem'
            }
        }
    },

    onServiceProblemTabClosed: function () {
        this.fireEvent('serviceProblemTabClosed', this.getViewModel().serviceProblemId());
    },

    onSetWorkReminder: function () {
        this.doSetWorkReminder(this.getViewModel().serviceProblem(), Ext.emptyFn);
    },

    associateToMsp: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        var dialog = this.getView().add({
            xtype: 'associateServiceProblemToMspDialog',
            viewModel: {
                type: 'associateServiceProblemToMspDialog',
                data: {
                    serviceProblem: serviceProblem
                }
            }
        });
        dialog.show();
    },

    requestFeatureCheck: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        var dialog = this.getView().add({
            xtype: 'featureCheckDialog',
            viewModel: {
                type: 'featureCheckDialog',
                data: {
                    serviceProblemId: serviceProblemId
                }
            }
        });
        dialog.show();
    },

    requestManagedLineTest: function () {
        var serviceType = this.getViewModel().serviceProblem().serviceType().code;
        var serviceProblemId = this.getViewModel().serviceProblemId();

        if (serviceType === 'FTTC') {
            var dialog = this.getView().add({
                xtype: 'managedLineTestDialog',

                viewModel: {
                    type: 'managedLineTestDialog',
                    data: {
                        serviceProblemId: serviceProblemId
                    }
                },
                controller: {
                    type: 'managedLineTestDialog',
                    requestHandler: this.makeManagedLineTestRequest
                }
            });
            dialog.show();
        } else {
            this.makeManagedLineTestRequest([], serviceProblemId, function () {
                this.fireEvent('managedLineTestRequested', serviceProblemId);
            })
        }
    },

    makeManagedLineTestRequest: function (answeredQuestions, serviceProblemId, successCallback) {
        Ext.Ajax.request(
            {
                scope: this,
                url: Ext.String.format('api/serviceProblem/{0}/requestManagedLineTest', serviceProblemId),
                method: 'POST',
                jsonData: {
                    questionAndAnswers: answeredQuestions
                },
                success: successCallback
            }
        );
    },


    onTransferServiceProblem: function () {
        this.getView().add({xtype: 'transferServiceProblemDialog'}).show();
    },

    clearServiceProblem: function () {
        var me = this;
        if (me.getViewModel().serviceProblem().hasActiveTroubleReport()) {
            Ext.Msg.show({
                title: 'Confirm Clear',
                msg: Ext.String.format('There is an Outstanding Trouble Report for this Service Problem - Are you sure you wish to clear this Service Problem?'),
                height: 125,
                width: 320,
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                callback: function (buttonId) {
                    if ('yes' == buttonId) {
                        me.showClearServiceProblemDialog();
                    }
                }
            });
        } else {
            me.showClearServiceProblemDialog();
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
    },

    setTroubleReport: function (troubleReport) {
        this.lookupReference('troubleReportsGrid').setSelection(troubleReport);
        this.getViewModel().set('troubleReport', troubleReport);
        this.fireEvent('troubleReportLoaded', troubleReport);
    },

    showTroubleReportPanel: function () {
        var servicePanel = this.lookupReference('servicePanel');
        var troublePanel = this.lookupReference('troublePanel');
        var troubleReports = this.getStore('troubleReports');

        troubleReports.totalCount === 0 ? troublePanel.setActiveItem('hasNoTroubleReports') : troublePanel.setActiveItem('hasTroubleReports');

        servicePanel.setActiveItem('troubleReportPanel');
        this.loadServiceProblem();
    },

    onTroubleReportsLoaded: function (store) {
        var first = store.first();
        if (first !== null) {
            this.setTroubleReport(first);
        }
    },

    showServiceProblemPanel: function () {
        var servicePanel = this.lookupReference('servicePanel');
        servicePanel.setActiveItem('serviceProblemPanel');
        this.loadServiceProblem();
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
                            var serviceProblem = Spm.ServiceProblemReader.fromJsonString(response.responseText);
                            me.displayServiceProblem(serviceProblem);
                            me.fireEvent('serviceProblemPulled');

                            Spm.Notification.notify(
                                'Service Problem Assigned',
                                Ext.String.format('Service Problem [{0}] has been assigned to you', serviceProblem.serviceProblemId())
                            );
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
                            troubleReportTemplate: troubleReportTemplate,
                            mode: 'Raise'
                        }
                    }
                });
                dialog.show();
            }
        });
    },

    onAmendTroubleReport: function () {
        var me = this,
            troubleReportTemplate = Ext.create('Spm.model.TroubleReportTemplate');

        troubleReportTemplate.load({
            params: {serviceProblemId: me.getViewModel().serviceProblemId()},
            success: function () {
                me.getView().add({
                    xtype: 'troubleReportDialog',
                    viewModel: {
                        type: 'troubleReportDialog',
                        data: {
                            troubleReportTemplate: troubleReportTemplate,
                            mode: 'Amend'
                        }
                    }
                }).show();
            }
        });
    },

    onCancelTroubleReport: function () {
        var me = this;
        me.getView().add({
            xtype: 'cancelTroubleReportDialog',
            viewModel: {
                type: 'cancelTroubleReportDialog',
                data: {
                    troubleReport: me.getViewModel().troubleReport(),
                    serviceType: me.getViewModel().serviceProblem().serviceType()
                }
            }
        }).show();
    },

    onConfirmEquipmentIsDisconnected: function () {
        var me = this;

        Ext.Ajax.request({
            url: Ext.String.format('api/troubleReport/{0}/confirmEquipmentDisconnected', me.getViewModel().troubleReport().troubleReportId()),
            method: 'POST',
            success: function () {
                me.loadServiceProblem();
            }
        });
    },

    onToggleHoldServiceProblem: function () {
        var me = this;

        this.doToggleHoldServiceProblem(
            me.getViewModel().serviceProblem(),
            function (response) {
                var serviceProblem = Spm.ServiceProblemReader.fromJsonString(response.responseText);
                me.displayServiceProblem(serviceProblem);
            }
        );
    },

    onReassignServiceProblem: function () {
        var serviceProblem = this.getViewModel().serviceProblem();
        var dialog = this.getView().add({
            xtype: 'reassignServiceProblemDialog',
            viewModel: {
                type: 'reassignServiceProblemDialog',
                data: {
                    serviceProblem: serviceProblem
                }
            }
        });
        dialog.show();
    },

    onSelectTroubleReport: function (view, td, cellIndex, record) {
        this.setTroubleReport(record);
    },

    showClearServiceProblemDialog: function () {
        this.getView().add({xtype: 'clearServiceProblemDialog'}).show();
    },

    onServiceProblemTabActivated: function () {
        if (!this.lookupReference('serviceProblemPanel').hidden) {
            this.getView().lookupReference("serviceProblemButton").setPressed(true);
        } else {
            this.getView().lookupReference("troubleReportButton").setPressed(true);
        }
    }

});

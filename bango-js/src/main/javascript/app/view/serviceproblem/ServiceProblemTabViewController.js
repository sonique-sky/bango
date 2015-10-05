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
        this.getView().add({
            xtype: 'associateServiceProblemToMspDialog',
            viewModel: {
                type: 'associateServiceProblemToMspDialog',
                data: {
                    serviceProblem: serviceProblem
                }
            }
        }).show();
    },

    requestFeatureCheck: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        this.getView().add({
            xtype: 'featureCheckDialog',
            viewModel: {
                type: 'featureCheckDialog',
                data: {
                    serviceProblemId: serviceProblemId
                }
            }
        }).show();
    },

    requestManagedLineTest: function () {
        var me = this,
            serviceType = me.getViewModel().serviceProblem().serviceType().code,
            serviceProblemId = me.getViewModel().serviceProblemId();

        if (serviceType === 'FTTC') {
            me.getView().add({
                xtype: 'managedLineTestDialog',

                viewModel: {
                    type: 'managedLineTestDialog',
                    data: {
                        serviceProblemId: serviceProblemId
                    }
                },
                controller: {
                    type: 'managedLineTestDialog',
                    requestHandler: me.makeManagedLineTestRequest
                }
            }).show();
        } else {
            me.makeManagedLineTestRequest([], serviceProblemId, function () {
                me.fireEvent('managedLineTestRequested', serviceProblemId);
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

        this.getView().add({
            xtype: 'nextWorkItemDialog',
            viewModel: {
                type: 'nextWorkItemDialog',
                data: {
                    workItem: workItem,
                    serviceProblemId: serviceProblemId
                }
            }
        }).show();
    },

    onServiceProblemTabAdded: function () {
        var me = this,
            serviceProblem = me.getViewModel().serviceProblem();

        if (!serviceProblem) {
            me.loadServiceProblem();
        } else {
            me.displayServiceProblem(serviceProblem);
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
        var me = this,
            viewModel = me.getViewModel(),
            workItemPanel = me.lookupReference('workItemPanel'),
            eventHistoryPanel = me.lookupReference('eventHistoryPanel');

        viewModel.set('serviceProblem', serviceProblem);
        viewModel.set('serviceProblemId', serviceProblem.serviceProblemId());
        viewModel.set('workItem', serviceProblem.getWorkItem());

        workItemPanel.fireEvent('switchWorkItem', serviceProblem);
        eventHistoryPanel.fireEvent('serviceProblemLoaded', serviceProblem.serviceProblemId());

        me.getStore('troubleReports').load({
            params: {
                serviceProblemId: serviceProblem.serviceProblemId()
            }
        });
    },

    setTroubleReport: function (troubleReport) {
        var me = this;
        me.lookupReference('troubleReportsGrid').setSelection(troubleReport);
        me.getViewModel().set('troubleReport', troubleReport);
        me.fireEvent('troubleReportLoaded', troubleReport);
    },

    showTroubleReportPanel: function () {
        var me = this,
            servicePanel = me.lookupReference('servicePanel'),
            troublePanel = me.lookupReference('troublePanel'),
            troubleReports = me.getStore('troubleReports');

        troubleReports.totalCount === 0 ? troublePanel.setActiveItem('hasNoTroubleReports') : troublePanel.setActiveItem('hasTroubleReports');

        servicePanel.setActiveItem('troubleReportPanel');
        me.loadServiceProblem();
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
                me.getView().add({
                    xtype: 'troubleReportDialog',
                    viewModel: {
                        type: 'troubleReportDialog',
                        data: {
                            troubleReportTemplate: troubleReportTemplate,
                            mode: 'Raise'
                        }
                    }
                }).show();
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

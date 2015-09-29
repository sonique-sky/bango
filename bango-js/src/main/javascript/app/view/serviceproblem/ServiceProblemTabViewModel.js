Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.serviceProblemTab',

    stores: {
        troubleReports: {
            type: 'troubleReports',
            listeners: {
                load: 'onTroubleReportsLoaded'
            }
        }
    },

    data: {
        serviceProblemId: null,
        serviceProblem: null,
        workItem: null,
        troubleReport: null
    },

    formulas: {
        serviceProblemTabTitle: {
            bind: '{serviceProblemId}',
            get: function (serviceProblemId) {
                return Ext.String.format('Service Problem [{0}]', serviceProblemId);
            }
        },
        serviceProblemOwned: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                return workItem !== null && workItem.isAssignedTo(this.authenticatedAgent());
            }
        },
        canRaiseTroubleReport: {
            bind: {
                serviceProblem: '{serviceProblem}',
                deep: true
            },
            get: function (data) {
                var serviceProblem = data.serviceProblem;
                var applicableServiceTypes = [
                    'NvnData',
                    'NvnVoice',
                    'OnnetBroadband',
                    'WLR3',
                    'FTTC',
                    'RoiOffnetVoice',
                    'RoiRuralOffnetBroadband',
                    'RoiUrbanOffnetBroadband',
                    'RoiFttc'
                ];
                if (serviceProblem !== null) {
                    workItem = serviceProblem.getWorkItem();
                    return workItem !== null
                        && workItem.isAssignedTo(this.authenticatedAgent())
                        && serviceProblem.hasActiveTroubleReport() === false
                        && applicableServiceTypes.indexOf(serviceProblem.serviceType().code) > -1;
                }
                return false;
            }
        },
        canAmendTroubleReport: {
            bind: {
                serviceProblem: '{serviceProblem}',
                troubleReport: '{troubleReport}',
                deep: true
            },
            get: function (data) {
                var serviceProblem = data.serviceProblem;
                var troubleReport = data.troubleReport;
                if (this.isServiceProblemPanelActive()) {
                    return false;
                }
                var applicableServiceTypes = [
                    'NvnData',
                    'NvnVoice',
                    'OnnetBroadband',
                    'WLR3',
                    'FTTC'
                ];
                if (serviceProblem !== null) {
                    workItem = serviceProblem.getWorkItem();
                    return workItem !== null
                        && workItem.isAssignedTo(this.authenticatedAgent())
                        && troubleReport != null
                        && troubleReport.status() === 'Open'
                        && troubleReport.isCancelRequested() === false
                        && troubleReport.isAmendRequested() === false
                        && troubleReport.hasConfirmEquipmentDisconnectRequested() === false
                        && applicableServiceTypes.indexOf(serviceProblem.serviceType().code) > -1;
                }
                return false;
            }
        },
        canCancelTroubleReport: {
            bind: {
                serviceProblem: '{serviceProblem}',
                troubleReport: '{troubleReport}',
                deep: true
            },
            get: function (data) {
                var serviceProblem = data.serviceProblem;
                var troubleReport = data.troubleReport;
                if (this.isServiceProblemPanelActive()) {
                    return false;
                }
                var applicableServiceTypes = [
                    'NvnData',
                    'NvnVoice',
                    'OnnetBroadband',
                    'WLR3',
                    'FTTC'
                ];
                if (serviceProblem !== null) {
                    workItem = serviceProblem.getWorkItem();
                    return workItem !== null
                        && workItem.isAssignedTo(this.authenticatedAgent())
                        && troubleReport != null
                        && troubleReport.status() === 'Open'
                        && troubleReport.isCancelRequested() === false
                        && troubleReport.isAmendRequested() === false
                        && applicableServiceTypes.indexOf(serviceProblem.serviceType().code) > -1;
                }
                return false;
            }
        },
        canConfirmEquipmentIsDisconnected: {
            bind: {
                serviceProblem: '{serviceProblem}',
                troubleReport: '{troubleReport}',
                deep: true
            },
            get: function (data) {
                var serviceProblem = data.serviceProblem;
                var troubleReport = data.troubleReport;

                if (this.isServiceProblemPanelActive()) {
                    return false;
                }
                var applicableServiceTypes = [
                    'NvnData',
                    'NvnVoice',
                    'OnnetBroadband',
                    'WLR3',
                    'FTTC'
                ];
                if (serviceProblem !== null) {
                    workItem = serviceProblem.getWorkItem();
                    return workItem !== null
                        && workItem.isAssignedTo(this.authenticatedAgent())
                        && troubleReport != null
                        && serviceProblem.status() === 'Open'
                        && applicableServiceTypes.indexOf(serviceProblem.serviceType().code) > -1
                        && troubleReport.status() === 'Open'
                        && troubleReport.isCancelRequested() === false
                        && troubleReport.isAmendRequested() === false
                        && troubleReport.hasConfirmEquipmentDisconnectRequested() === false;
                }
                return false;
            }
        },
        pullServiceProblemButtonDisabled: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                var isNotPullable = workItem == null || !workItem.isPullable();
                var agentCanPullWorkItems = this.authenticatedAgent().hasPrivilege('PullServiceProblem');
                return isNotPullable || !agentCanPullWorkItems;
            }
        },
        toggleHoldData: {
            bind: {
                bindTo: '{workItem}',
                deep: true
            },
            get: function (workItem) {
                var canBeHeld = workItem === null || !workItem.isHeld();
                return {
                    iconCls: (canBeHeld ? 'icon-hold' : 'icon-release'),
                    tooltip: (canBeHeld ? 'Hold this Work Item' : 'Unhold this Work Item')
                }
            }
        },
        assignedStateIconClass: {
            bind: {
                bindTo: '{serviceProblemOwned}'
            },
            get: function (serviceProblemOwned) {
                return serviceProblemOwned ? 'icon-sp-assigned' : 'icon-sp-unassigned';
            }
        }
    },

    serviceProblem: function () {
        return this.get('serviceProblem');
    },

    troubleReport: function () {
        return this.get('troubleReport');
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    authenticatedAgent: function () {
        return this.get('authenticatedAgent');
    },

    isServiceProblemPanelActive: function () {
        return !this.getView().lookupReference('serviceProblemPanel').hidden;
    }
});

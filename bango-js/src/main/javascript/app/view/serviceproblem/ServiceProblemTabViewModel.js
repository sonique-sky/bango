Ext.define('Spm.view.serviceproblem.ServiceProblemTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.serviceProblemTab',

    stores: {
        troubleReports: {
            type: 'troubleReports'
        }
    },

    data: {
        serviceProblemId: null,
        serviceProblem: null,
        workItem: null
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
                bindTo: '{serviceProblem}',
                deep: true
            },
            get: function (serviceProblem) {
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
                if(serviceProblem !== null) {
                    workItem = serviceProblem.getWorkItem();
                    return workItem !== null
                        && workItem.isAssignedTo(this.authenticatedAgent())
                        && serviceProblem.getData().hasActiveTroubleReport === false
                        && applicableServiceTypes.indexOf(serviceProblem.getData().serviceType.code) > -1;
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

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    authenticatedAgent: function() {
        return this.get('authenticatedAgent');
    }
});

Ext.define('Spm.controller.action.BaseAction', {

    startAction: Ext.emptyFn,
    finishAction: Ext.emptyFn,

    applyStartStep: function(stepArguments) {
        this.applyStep(this.startAction, stepArguments);
    },

    applyFinishStep: function(stepArguments) {
        this.applyStep(this.finishAction, stepArguments);
    },

    applyStep: function(stepFunction, stepArguments) {
        stepFunction.apply(this, Array.prototype.slice.call(stepArguments, 1))
    }
});
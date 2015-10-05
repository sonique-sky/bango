Ext.define('Spm.view.serviceproblem.mlt.ManagedLineTestDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.managedLineTestDialog',

    config: {
        requestHandler: undefined
    },

    onShow: function () {
        var rootQuestion = this.findQuestion('rootQuestion');
        this.createQuestionCard(rootQuestion);
    },

    createAnswerButtons: function (question) {
        var me = this;
        var answeredQuestions = me.getViewModel().answeredQuestions();
        var answers = question.answers;
        var answerButtons = [];
        answers.forEach(function (answer) {
            answerButtons.push(
                {
                    xtype: 'button',
                    cls: 'mlt-answer-button',
                    flex: 1,
                    scale: 'large',
                    margin: 4,
                    text: answer.answer,
                    handler: function () {
                        answeredQuestions.push({
                            reference: question.reference,
                            question: question.question,
                            answer: answer.answer,
                            answerCode: answer.code
                        });
                        var nextQuestion = me.findQuestion(answer.nextQuestion);
                        if (nextQuestion !== null) {
                            me.createQuestionCard(nextQuestion);
                        } else {
                            me.showSummary();
                        }
                    }
                }
            );
        });
        return answerButtons;
    },

    onAccept: function () {
        var viewModel = this.getViewModel();
        var answeredQuestions = viewModel.answeredQuestions();
        var serviceProblemId = this.getViewModel().serviceProblemId();

        if (this.getRequestHandler()) {
            this.getRequestHandler().call(this, answeredQuestions, serviceProblemId, function () {
                this.fireEvent('managedLineTestRequested', serviceProblemId);
                this.closeView();
            });
        }
    },

    onBack: function () {
        var lastQuestion = this.getViewModel().answeredQuestions().pop();
        var question = this.findQuestion(lastQuestion.reference);
        this.createQuestionCard(question);
    },

    findQuestion: function (questionRef) {
        var nextQuestion = null;
        var questionWizard = this.getViewModel().questionWizard();
        questionWizard.find(function (element) {
            if (element.reference === questionRef) {
                nextQuestion = element;
            }
        });
        return nextQuestion;
    },

    showSummary: function () {
        var answeredQuestions = this.getViewModel().answeredQuestions();
        var summaryPanel = Ext.create(
            {
                xtype: 'panel',
                cls: 'mlt-panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'center'
                }
            }
        );
        this.getView().setTitle('Request Managed Line Test : Summary');
        answeredQuestions.forEach(function (answeredQuestion) {
            summaryPanel.add({
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                border: 0,
                flex: 1,
                items: [
                    {
                        xtype: 'label',
                        cls: 'mlt-questions-text',
                        width: 400,
                        flex: 2,
                        text: answeredQuestion.question,
                        margin: '2 15 2 5'
                    },
                    {
                        xtype: 'label',
                        cls: 'mlt-answer-text',
                        width: 100,
                        flex: 1,
                        text: answeredQuestion.answer,
                        margin: '2 0 2 5'
                    }
                ]
            })
        });
        this.getView().getLayout().setActiveItem(summaryPanel);
        this.getViewModel().set('acceptButtonDefaultDisabled', false);
    },

    createQuestionCard: function (question) {
        var nextQuestionPanel = Ext.create(
            {
                xtype: 'panel',
                reference: question.reference,
                cls: 'mlt-panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'end'
                },
                items: [
                    {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        border: 0,
                        items: [
                            {
                                xtype: 'label',
                                height: 100,
                                text: question.question,
                                cls: 'mlt-questions-text',
                                margin: '0 60 0 60',
                                flex: 1

                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        border: 0,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: this.createAnswerButtons(question)
                    }
                ]
            }
        );

        this.getView().setTitle('Request Managed Line Test');
        this.getView().setActiveItem(nextQuestionPanel);

        if (question.reference === 'rootQuestion') {
            this.getViewModel().set('backButtonDisabled', true);
        } else {
            this.getViewModel().set('backButtonDisabled', false);
        }
        this.getViewModel().set('acceptButtonDefaultDisabled', true);
    }
});

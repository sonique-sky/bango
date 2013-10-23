package sonique.bango.serviceproblem.eventhistorytoolbar;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.EventDescription;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.dialog.FilterByTypeDialog;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.util.BangoDataFixtures.someEventHistoryItemsFor;

public class FilterHistoryByTypeTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setup() {
        loginAgent();
    }

    @Ignore
    @Test
    public void canFilterHistoryByEventType() throws Exception {
        given(aServiceProblemIsOpenWithNotes());
        and(theAgentIsViewingTheServiceProblem());

        when(theAgentClicksTheFilterByEventTypeButton());
        then(theFilterByTypeDialog(), isDisplayed());

    }

    private GivensBuilder aServiceProblemIsOpenWithNotes() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();

        serviceProblem.historyItems().addAll(someEventHistoryItemsFor(serviceProblem, EventDescription.Note));
        ServiceProblemScenario supermanScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest, serviceProblem);

        return new ScenarioGivensBuilder(supermanScenario);
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                new ViewServiceProblemAction(supermanApp, serviceProblem).goBango();
                return givens;
            }
        };
    }

    private ActionUnderTest theAgentClicksTheFilterByEventTypeButton() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel().eventHistoryToolbar().filterButton().click();

                return capturedInputAndOutputs;
            }
        };
    }

    private StateExtractor<FilterByTypeDialog> theFilterByTypeDialog() {
        return new StateExtractor<FilterByTypeDialog>() {
            @Override
            public FilterByTypeDialog execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.dialogs().filterHistoryByType();
            }
        };
    }

    private AppendableAllOf<FilterByTypeDialog> isDisplayed() {
            return IsDisplayed.isDisplayed();
        }
}

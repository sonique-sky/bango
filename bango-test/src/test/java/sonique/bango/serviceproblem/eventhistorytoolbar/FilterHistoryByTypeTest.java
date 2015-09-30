package sonique.bango.serviceproblem.eventhistorytoolbar;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.junit.After;
import org.junit.Before;
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

    @After
    public void tearDown() {
        supermanApp.dialogs().filterHistoryByType().cancelButton().click();
    }

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
        return givens -> {
            new ViewServiceProblemAction(supermanApp, serviceProblem).goBango();
            return givens;
        };
    }

    private ActionUnderTest theAgentClicksTheFilterByEventTypeButton() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.appContainer().tab().serviceProblem(serviceProblem).tabContent().eventHistoryPanel().eventHistoryToolbar().filterButton().click();

            return capturedInputAndOutputs;
        };
    }

    private StateExtractor<FilterByTypeDialog> theFilterByTypeDialog() {
        return inputAndOutputs -> supermanApp.dialogs().filterHistoryByType();
    }

    private AppendableAllOf<FilterByTypeDialog> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }
}

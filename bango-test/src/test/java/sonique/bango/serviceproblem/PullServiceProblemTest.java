package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.dialog.MessageBox;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.driver.panel.serviceproblem.WorkItemPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.bango.service.ServiceProblemApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.mockito.Mockito.never;
import static sonique.bango.matcher.AMessageOf.aMessageOf;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.panel.WorkItemPanelMatchers.aWorkItemAssignedAgent;
import static sonique.bango.matcher.panel.WorkItemPanelMatchers.aWorkItemStatus;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemBuilder;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;
import static util.SupermanDataFixtures.someAgent;

public class PullServiceProblemTest extends BangoYatspecTest {

    private DomainServiceProblem theServiceProblem;
    private DomainWorkItem workItemAfterPull;

    @Before
    public void setUp() throws Exception {
        loginAgent();
        workItemAfterPull = DomainWorkItemBuilder.withAllDefaults().withAgent(someAgent()).build();
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(anOpenServiceProblem());
        and(theAgentIsViewingTheServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(aMessageBox(), isDisplayed()
                .with(aTitleOf("Confirm Assign"))
                .and(aMessageOf("Do you want to assign this Work Item to yourself?")));

        when(theAgentClicksYes());

        then(theServiceProblemService(), hasPullMethodCalled());
        and(theWorkItemPanelFor(theServiceProblem), displaysTheUpdatedInformation());
    }

    @Test
    public void canCancelPullingAServiceProblem() throws Exception {
        given(anOpenServiceProblem());
        and(theAgentIsViewingTheServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(aMessageBox(), isDisplayed());

        when(theAgentClicksNo());

        then(theServiceProblemService(), isNotCalled());
    }

    private AppendableAllOf<MessageBox> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }

    private ActionUnderTest theAgentClicksYes() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().message().clickYes();
            return capturedInputAndOutputs;
        };
    }

    private ActionUnderTest theAgentClicksNo() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().message().clickNo();
            return capturedInputAndOutputs;
        };
    }

    private Matcher<WorkItemPanel> displaysTheUpdatedInformation() {
        return thatHas(aWorkItemAssignedAgent(equalTo(workItemAfterPull.agent().details().getDisplayName())))
                .and(aWorkItemStatus(equalTo(workItemAfterPull.status())));
    }

    private Matcher<ServiceProblemApiService> hasPullMethodCalled() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.pull(theServiceProblem.serviceProblemId());
            }
        };
    }

    private Matcher<ServiceProblemApiService> isNotCalled() {
        return new MockieMatcher<ServiceProblemApiService>(never()) {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.pull(theServiceProblem.serviceProblemId());
            }
        };
    }

    private StateExtractor<ServiceProblemApiService> theServiceProblemService() {
        return inputAndOutputs -> scenarioDriver().servicesFor(agentForTest).serviceProblemApiService();
    }

    private StateExtractor<MessageBox> aMessageBox() {
        return capturedInputAndOutputs -> supermanApp.dialogs().message();
    }

    private ActionUnderTest theAgentPullsTheServiceProblem() {
        return (givens, capturedInputAndOutputs) -> {
            ServiceProblemTab serviceProblemTab = supermanApp.appContainer().tab().serviceProblem(theServiceProblem);

            serviceProblemTab.tabContent().serviceProblemToolbar().pullButton().click();

            return capturedInputAndOutputs;
        };
    }

    private GivensBuilder anOpenServiceProblem() {
        theServiceProblem = serviceProblemWithWorkItem().build();
        DomainServiceProblem afterPullServiceProblem = serviceProblemBuilder().withWorkItem(workItemAfterPull).build();

        ServiceProblemScenario supermanScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest, theServiceProblem)
                .returnsWhenPulled(afterPullServiceProblem);

        return new ScenarioGivensBuilder(supermanScenario);
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return givens -> {
            supermanApp.appContainer().searchPanel().searchFor(theServiceProblem.serviceProblemId());
            return givens;
        };
    }
}
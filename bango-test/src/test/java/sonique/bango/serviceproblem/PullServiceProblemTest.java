package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.MessageBox;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.driver.panel.serviceproblem.WorkItemPanel;
import sonique.bango.matcher.IsDisplayed;
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
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().messageBox().clickYes();
                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentClicksNo() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().messageBox().clickNo();
                return capturedInputAndOutputs;
            }
        };
    }

    private Matcher<WorkItemPanel> displaysTheUpdatedInformation() {
        return thatHas(aWorkItemAssignedAgent(equalTo(workItemAfterPull.agent().details().getDisplayName())))
                .and(aWorkItemStatus(equalTo(workItemAfterPull.status())));
    }

    private Matcher<ServiceProblemApiService> hasPullMethodCalled() {
        return new TypeSafeMatcher<ServiceProblemApiService>() {
            @Override
            protected boolean matchesSafely(ServiceProblemApiService item) {
                Mockito.verify(item).pull(theServiceProblem.serviceProblemId());
                return true;
            }

            @Override
            public void describeTo(Description description) {
                throw new UnsupportedOperationException("Method  describeTo() not yet implemented");
            }
        };
    }

    private Matcher<ServiceProblemApiService> isNotCalled() {
        return new TypeSafeMatcher<ServiceProblemApiService>() {
            @Override
            protected boolean matchesSafely(ServiceProblemApiService item) {
                Mockito.verify(item, never()).pull(theServiceProblem.serviceProblemId());
                return true;
            }

            @Override
            public void describeTo(Description description) {
                throw new UnsupportedOperationException("Method  describeTo() not yet implemented");
            }
        };
    }

    private StateExtractor<ServiceProblemApiService> theServiceProblemService() {
        return new StateExtractor<ServiceProblemApiService>() {
            @Override
            public ServiceProblemApiService execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return scenarioDriver().servicesFor(agentForTest).serviceProblemApiService();
            }
        };
    }

    private StateExtractor<MessageBox> aMessageBox() {
        return new StateExtractor<MessageBox>() {
            @Override
            public MessageBox execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().messageBox();
            }
        };
    }



    private ActionUnderTest theAgentPullsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(theServiceProblem.serviceProblemId());

                serviceProblemTab.tabContent().serviceProblemToolbar().pullButton().click();

                return capturedInputAndOutputs;
            }
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
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(theServiceProblem.serviceProblemId());
                return givens;
            }
        };
    }
}
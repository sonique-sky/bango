package sonique.bango;

import com.google.common.collect.Lists;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.domain.*;
import sonique.bango.driver.panel.LoginDialog;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.givens.ServiceProblemGivensBuilder;
import sonique.bango.matcher.IsDisplayed;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.driver.panel.SearchPanel.SearchType.DirectoryNumber;
import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceId;
import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceProblemId;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class SearchTest extends BaseBangoTest {

    private Agent agent;
    private ServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        agent = new Agent("K.K", Lists.<Queue>newArrayList(), Role.ROLE_USER);

        serviceProblem = new ServiceProblem(
                100000,
                "Open",
                new WorkItem(1, "Unassigned"),
                new Queue(1, "Queue"),
                false,
                "dirNum",
                Lists.<EventHistoryItem>newArrayList(),
                "1");
    }

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(anAgentHasLoggedIn());
        and(aServiceProblemExists());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(aServiceProblemTab(), isDisplayed());
    }

    @Test
    public void searchByDirectoryNumber() throws Exception {
        given(anAgentHasLoggedIn());
        and(aServiceProblemExists().withADirectoryNumber());

        when(theAgentSearchesForTheServiceProblemUsingDirectoryNumber());

        then(aServiceProblemTab(), isDisplayed());
    }

    @Test
    public void searchForNonExistentServiceProblem() throws Exception {
        given(anAgentHasLoggedIn());
        and(noServiceProblemExists());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(theNoResultsMessageBox(), isDisplayed());
    }

    @Test
    public void searchByServiceId() throws Exception {
        given(anAgentHasLoggedIn());
        and(aServiceProblemExists().withAServiceId());

        when(theAgentSearchesForTheServiceProblemUsingAServiceId());

        then(aServiceProblemTab(), isDisplayed());
    }

    public ServiceProblemGivensBuilder aServiceProblemExists() {
        return new ServiceProblemGivensBuilder(scenarioDriver(), serviceProblem, agent);
    }

    private GivensBuilder noServiceProblemExists() {
        return new ServiceProblemGivensBuilder(scenarioDriver(), serviceProblem, agent).withNoServiceProblem();
    }

    private GivensBuilder anAgentHasLoggedIn() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
                register(agent);

                LoginDialog loginDialog = supermanApp.loginDialog();
                loginDialog.username().enter(agent.agentCode());
                loginDialog.password().enter(agent.password());

                loginDialog.loginButton().click();

                assertThat(supermanApp.appContainer().headerPanel(), isDisplayed());

                return interestingGivens;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingServiceProblemId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceProblemId, serviceProblem.serviceProblemId().toString());

                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingAServiceId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceId, serviceProblem.serviceId());

                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingDirectoryNumber() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(DirectoryNumber, serviceProblem.directoryNumber());

                return capturedInputAndOutputs;
            }
        };
    }

    private StateExtractor<SupermanElement> theNoResultsMessageBox() {
        return new StateExtractor<SupermanElement>() {
            @Override
            public SupermanElement execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.messageBox();
            }
        };
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());
            }
        };
    }

    private AppendableAllOf<SupermanElement> isDisplayed() {
        return thatHas(IsDisplayed.isDisplayed());
    }
}

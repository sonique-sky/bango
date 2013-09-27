package sonique.bango;

import com.google.common.collect.Lists;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sonique.bango.domain.*;
import sonique.bango.driver.panel.LoginDialog;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.service.SearchApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import static com.google.common.collect.Lists.newArrayList;
import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.driver.panel.SearchPanel.SearchType.DirectoryNumber;
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
                Lists.<EventHistoryItem>newArrayList()
        );
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

    private AppendableAllOf<SupermanElement> isDisplayed() {
        return thatHas(IsDisplayed.isDisplayed());
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());
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

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingDirectoryNumber() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(DirectoryNumber, serviceProblem.directoryNumber());

                return capturedInputAndOutputs;
            }
        };
    }


    public ServiceProblemGivensBuilder aServiceProblemExists() {
        return new ServiceProblemGivensBuilder(serviceProblem);
    }

    public class ServiceProblemGivensBuilder implements GivensBuilder {
        private final SearchApiService searchApiService = scenarioDriver().searchApiServiceFor(agent);
        private final ServiceProblem serviceProblem;

        public ServiceProblemGivensBuilder(ServiceProblem serviceProblem) {
            this.serviceProblem = serviceProblem;
            Mockito.when(searchApiService.serviceProblemById(this.serviceProblem.serviceProblemId())).thenReturn(newArrayList(this.serviceProblem));
        }

        public ServiceProblemGivensBuilder withADirectoryNumber() {
            Mockito.when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.directoryNumber())).thenReturn(newArrayList(serviceProblem));
            return this;
        }

        @Override
        public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
            return interestingGivens;
        }
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
}

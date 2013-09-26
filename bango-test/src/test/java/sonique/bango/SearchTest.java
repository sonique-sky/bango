package sonique.bango;

import com.google.common.collect.Lists;
import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sonique.bango.domain.*;
import sonique.bango.driver.panel.LoginWindow;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.service.SearchApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import static com.google.common.collect.Lists.newArrayList;
import static org.hamcrest.MatcherAssert.assertThat;
import static sonique.bango.driver.panel.SearchFormPanel.SearchType.ServiceProblemId;
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

        when(theAgentSearchesForTheServiceProblem());

        then(aServiceProblemTab(), isDisplayed());
    }

    private AppendableAllOf<SupermanElement> isDisplayed() {
        return thatHas(IsDisplayed.isDisplayed());
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.serviceProblemTab(serviceProblem.serviceProblemId());
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.searchPanel().searchUsing(ServiceProblemId, serviceProblem.serviceProblemId().toString());

                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder aServiceProblemExists() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
                SearchApiService searchApiService = scenarioDriver().searchApiServiceFor(agent);

                Mockito.when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(newArrayList(serviceProblem));

                return interestingGivens;
            }
        };
    }

    private GivensBuilder anAgentHasLoggedIn() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
                register(agent);

                LoginWindow loginWindow = supermanApp.loginWindow();
                loginWindow.username().enter(agent.agentCode());
                loginWindow.password().enter(agent.password());

                loginWindow.loginButton().click();

                assertThat(supermanApp.headerPanel(), isDisplayed());

                return interestingGivens;
            }
        };
    }
}

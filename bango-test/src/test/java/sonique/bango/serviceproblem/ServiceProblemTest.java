package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.BangoYatspecTest;

@Ignore
public class ServiceProblemTest extends BangoYatspecTest {

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(hasFoundAServiceProblem());

        when(theAgentPullsTheServiceProblemAndConfirmsTheAssignmentToTheLoggedInUser());

        then(theAssignedAgent(), isLoggedInAgent());
    }

    private Matcher<? super Object> isLoggedInAgent() {
        return null;
    }

    private StateExtractor<Object> theAssignedAgent() {
        return null;
    }

    private ActionUnderTest theAgentPullsTheServiceProblemAndConfirmsTheAssignmentToTheLoggedInUser() {
        return null;
    }

    private GivensBuilder hasFoundAServiceProblem() {
        return null;
    }

    @Override
    protected DomainAgent agentForTest() {
        throw new UnsupportedOperationException("Method ServiceProblemTest agentForTest() not yet implemented");
    }
}

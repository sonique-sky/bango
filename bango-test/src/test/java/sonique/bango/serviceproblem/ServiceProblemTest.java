package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Ignore;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.testsupport.matchers.AppendableAllOf;


public class ServiceProblemTest extends BangoYatspecTest{

    private ServiceProblemScenario serviceProblemScenario;

    @Ignore
    @Test
    public void findsAndDisplaysServiceProblemWithoutWorkItem() throws Exception {
        given(aServiceProblemWithoutWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theServiceProblemTab(),isDisplayed().with(anEmptyWorkItemPanel()));
    }

    private Matcher<? super ServiceProblemTab> anEmptyWorkItemPanel() {
        return null;
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return null;
    }

    private StateExtractor<ServiceProblemTab> theServiceProblemTab() {
        return null;
    }

    private GivensBuilder aServiceProblemWithoutWorkItem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                throw new UnsupportedOperationException("Method  build() not yet implemented");
            }
        };
    }

    private ActionUnderTest anAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {

                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
    }




    private static class ServiceProblemGivens implements GivensBuilder {
        private DomainServiceProblem serviceProblem;

        @Override
        public InterestingGivens build(InterestingGivens givens) throws Exception {
            throw new UnsupportedOperationException("Method ServiceProblemGivens build() not yet implemented");
        }
    }
}

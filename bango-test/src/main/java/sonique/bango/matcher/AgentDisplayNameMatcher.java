package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import sky.sns.spm.domain.model.DomainAgent;

public class AgentDisplayNameMatcher extends TypeSafeMatcher<String> {
    private final DomainAgent expectedAgent;

    public AgentDisplayNameMatcher(DomainAgent expectedAgent) {
        this.expectedAgent = expectedAgent;
    }

    public static AgentDisplayNameMatcher withTheDisplayNameOf(DomainAgent expectedAgent) {
        return new AgentDisplayNameMatcher(expectedAgent);
    }

    @Override
    protected boolean matchesSafely(String actual) {
        return expectedAgent.details().getDisplayName().equals(actual);
    }

    @Override
    public void describeTo(Description description) {
        description.appendText(String.format("A display name of [%s]", expectedAgent.details().getDisplayName()));
    }

    @Override
    protected void describeMismatchSafely(String item, Description mismatchDescription) {
        mismatchDescription.appendText(String.format("was [%s]", item));
    }
}

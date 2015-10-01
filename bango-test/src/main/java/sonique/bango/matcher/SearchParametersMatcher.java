package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.junit.internal.matchers.TypeSafeMatcher;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.types.StringValue;

import static org.hamcrest.CoreMatchers.hasItem;

public class SearchParametersMatcher extends TypeSafeMatcher<SearchParametersDTO> {
    public static SearchParametersMatcher serviceProblemIdSearchFor(DomainServiceProblem serviceProblem) {
        return new SearchParametersMatcher("serviceProblemId", serviceProblem.serviceProblemId());
    }

    public static SearchParametersMatcher serviceIdSearchFor(DomainServiceProblem serviceProblem) {
        return new SearchParametersMatcher("serviceId", serviceProblem.serviceId());
    }

    public static SearchParametersMatcher directoryNumberSearchFor(DomainServiceProblem serviceProblem) {
        return new SearchParametersMatcher("directoryNumber", serviceProblem.getDirectoryNumber());
    }

    private final Matcher<Iterable<? super Filter>> matcher;

    private SearchParametersMatcher(String searchParameter, StringValue searchValue) {
        this(hasItem(new Filter(searchParameter, searchValue.asString())));
    }

    public SearchParametersMatcher(Matcher<Iterable<? super Filter>> matcher) {
        this.matcher = matcher;
    }

    @Override
    public boolean matchesSafely(SearchParametersDTO searchParametersDTO) {
        return matcher.matches(searchParametersDTO.filters());
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("Tim didn't know what to do here");
    }
}

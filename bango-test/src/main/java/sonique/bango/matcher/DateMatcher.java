package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import org.joda.time.DateTime;

import java.util.Date;

public abstract class DateMatcher extends TypeSafeMatcher<Date> {

    public static DateMatcher theSameDateAs(Date date) {
        return new DateMatcher(date) {
            protected DateTime rounded(DateTime datetime) {
                return datetime.withSecondOfMinute(0).withMillis(0);
            }
        };
    }

    private final DateTime expected;

    public DateMatcher(Date expected) {
        this.expected = rounded(new DateTime(expected));
    }

    @Override
    protected boolean matchesSafely(Date item) {
        return rounded(new DateTime(item)).isEqual(expected);
    }

    protected abstract DateTime rounded(DateTime item);

    @Override
    public void describeTo(Description description) {
        description.appendText(" " + expected.toDate());
    }
}

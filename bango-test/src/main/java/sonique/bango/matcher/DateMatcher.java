package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public abstract class DateMatcher extends TypeSafeMatcher<Date> {

    public static DateMatcher theSameDateAs(Date date) {

        return new DateMatcher(date) {
            protected ZonedDateTime rounded(Date datetime) {
                return ZonedDateTime.ofInstant(datetime.toInstant(), ZoneId.systemDefault()).withSecond(0).withNano(0);
            }
        };
    }

    private final ZonedDateTime expected;

    public DateMatcher(Date expected) {
        this.expected = rounded(expected);
    }

    @Override
    protected boolean matchesSafely(Date item) {
        return rounded(item).isEqual(expected);
    }

    protected abstract ZonedDateTime rounded(Date item);

    @Override
    public void describeTo(Description description) {
        description.appendText(" " + expected);
    }
}

package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public abstract class DateMatcher extends TypeSafeMatcher<LocalDateTime> {

    public static DateMatcher theSameDateAs(LocalDateTime date) {
        return new DateMatcher(date) {
            protected LocalDateTime rounded(LocalDateTime datetime) {
                return datetime.truncatedTo(ChronoUnit.MINUTES);
            }
        };
    }

    public static DateMatcher theSameDateAs(Date date) {
        return new DateMatcher(LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault())) {
            protected LocalDateTime rounded(LocalDateTime datetime) {
                return datetime.truncatedTo(ChronoUnit.MINUTES);
            }
        };
    }

    private final LocalDateTime expected;

    public DateMatcher(LocalDateTime expected) {
        this.expected = rounded(expected);
    }

    @Override
    protected boolean matchesSafely(LocalDateTime item) {
        return rounded(item).isEqual(expected);
    }

    protected abstract LocalDateTime rounded(LocalDateTime item);

    @Override
    public void describeTo(Description description) {
        description.appendText(" " + expected);
    }
}

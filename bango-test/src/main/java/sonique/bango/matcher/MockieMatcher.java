package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import org.mockito.Mockito;

public abstract class MockieMatcher<T> extends TypeSafeMatcher<T> {

    protected abstract void doTheMock(T t);

    @Override
    protected final boolean matchesSafely(T t) {
        doTheMock(Mockito.verify(t));
        return true;
    }

    @Override
    public final void describeTo(Description description) {
        throw new IllegalStateException("Mockito should blow-up before the matcher fails...");
    }
}
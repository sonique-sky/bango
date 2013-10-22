package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import org.mockito.Mockito;
import org.mockito.verification.VerificationMode;

import static org.mockito.Mockito.times;

public abstract class MockieMatcher<T> extends TypeSafeMatcher<T> {

    private final VerificationMode verificationMode;


    protected MockieMatcher() {
        this.verificationMode = times(1);
    }

    protected MockieMatcher(VerificationMode verificationMode) {
        this.verificationMode = verificationMode;
    }

    protected abstract void doTheMock(T t);

    @Override
    protected final boolean matchesSafely(T t) {
        doTheMock(Mockito.verify(t, verificationMode));
        return true;
    }

    @Override
    public final void describeTo(Description description) {
        throw new IllegalStateException("Mockito should blow-up before the matcher fails...");
    }
}
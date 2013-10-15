package sonique.bango.driver.predicate;

import com.google.common.base.Predicate;
import sonique.bango.driver.component.SupermanElement;

public class IsEnabledPredicate<T extends SupermanElement> implements Predicate<T> {

    public static <T extends SupermanElement> IsEnabledPredicate<T> isEnabled() {
        return new IsEnabledPredicate<T>();
    }

    private IsEnabledPredicate() {
    }

    @Override
    public boolean apply(T element) {
        return element.isEnabled();
    }
}

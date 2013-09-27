package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

import static com.google.common.base.Predicates.not;

public class IsNotDisplayed extends AsynchronousMatcher<SupermanElement> {

    public static IsNotDisplayed isNotDisplayed() {
         return new IsNotDisplayed();
     }

     @Override
     protected Predicate<SupermanElement> until() {
         return not(IsDisplayedPredicate.isDisplayed());
     }

     @Override
     protected String failureDescription() {
         return " element not to be displayed";
     }

     @Override
     protected String expectedDescription() {
         return " was displayed";
     }
}

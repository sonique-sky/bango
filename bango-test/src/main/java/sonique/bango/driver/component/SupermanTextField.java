package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import sonique.bango.driver.panel.SupermanElement;

public class SupermanTextField extends SupermanComponent implements SupermanField<String> {

    public SupermanTextField(SupermanElement element, By by) {
        super(element, by);
    }

    @Override
    public void enter(String enterValue) {
        element().sendKeys(enterValue);
        element().sendKeys(Keys.TAB);
    }

    @Override
    public String value() {
        return element().getAttribute("value");
    }

    @Override
    public void clear() {
        element().clear();
    }
}
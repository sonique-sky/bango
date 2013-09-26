package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;

import java.util.Arrays;
import java.util.List;

public abstract class SupermanElement {

    protected final SupermanWebDriver driver;
    protected final SupermanElement parentElement;
    protected final WebElement element;

    protected SupermanElement(SupermanWebDriver driver, By by) {
        this(driver, null, by);
    }

    protected SupermanElement(SupermanWebDriver driver, SupermanElement parentElement, By by) {
        this.driver = driver;
        this.parentElement = parentElement;
        this.element = parentElement == null ? driver.waitFor(by) : parentElement.element.findElement(by);
    }

    public boolean isEnabled() {
        return true;
    }

    public boolean isDisplayed() {
        return element.isDisplayed();
    }

    protected List<String> classes() {
        return Arrays.asList(element.getAttribute("class").split(" "));
    }
}

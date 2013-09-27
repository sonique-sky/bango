package sonique.bango.driver.panel;

import com.google.common.base.Predicate;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.FluentWait;

import java.util.Arrays;
import java.util.List;

public abstract class SupermanComponent implements SupermanElement {

    private final SupermanElement element;
    private final By by;

    protected SupermanComponent(SupermanElement element, By by) {
        this.element = element;
        this.by = by;
    }

    protected WebElement element() {
        return element.find(by);
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isDisplayed() {
        try {
            return element().isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    @Override
    public WebElement find(By by) {
        return element().findElement(by);
    }

    public void waitFor(WebElement element) {
        new FluentWait<WebElement>(element).until(new Predicate<WebElement>() {
            @Override
            public boolean apply(WebElement webElement) {
                return webElement.isEnabled();
            }
        });
    }

    protected List<String> classes() {
        return Arrays.asList(element().getAttribute("class").split(" "));
    }
}
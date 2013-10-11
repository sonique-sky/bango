package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;

import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.SECONDS;

public abstract class SupermanContainer implements SupermanElement {

    protected final SupermanWebDriver driver;
    private final By by;

    protected SupermanContainer(SupermanWebDriver driver, By by) {
        this.driver = driver;
        this.by = by;
    }

    protected WebElement element() {
        return driver.waitUntil(by);
    }

    @Override
    public boolean isEnabled() {
        throw new UnsupportedOperationException("Method SupermanContainer isEnabled() not yet implemented");
    }

    @Override
    public boolean isDisplayed() {
        try {
            return driver.waitUntil(by, 1000).isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }

    @Override
    public WebElement find(By by) {
        return element().findElement(by);
    }
}

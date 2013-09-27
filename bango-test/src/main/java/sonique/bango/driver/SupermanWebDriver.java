package sonique.bango.driver;

import com.google.common.base.Predicate;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;

import static java.util.concurrent.TimeUnit.*;
import static sonique.bango.driver.SupermanWebDriver.DriverFactory.FIREFOX;

public class SupermanWebDriver {
    private final WebDriverWait wait;
    private final WebDriver webDriver;

    public SupermanWebDriver(String url) {
//        webDriver = HTML_UNIT.build();
        webDriver = FIREFOX.build();
        wait = new WebDriverWait(webDriver, 5);
        webDriver.get(url);
    }

    public WebElement waitFor(By by) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(by));
    }

    public <T> void waitUntil(T item, Predicate<T> predicate) {
        new FluentWait<T>(item)
                .withTimeout(5, SECONDS)
                .pollingEvery(100, MILLISECONDS)
                .until(predicate);
    }

    public WebElement find(By by) {
        return webDriver.findElement(by);
    }

    public void quit() {
        webDriver.quit();
    }

    public enum DriverFactory {
        HTML_UNIT {
            @Override
            public WebDriver build() {
                HtmlUnitDriver webDriver = new HtmlUnitDriver();
                webDriver.setJavascriptEnabled(true);
                return webDriver;
            }
        },
        FIREFOX {
            @Override
            public WebDriver build() {
                return new FirefoxDriver();
            }
        };

        public abstract WebDriver build();
    }
}
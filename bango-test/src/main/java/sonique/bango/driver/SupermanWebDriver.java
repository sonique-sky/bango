package sonique.bango.driver;

import com.google.common.base.Predicate;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import static java.util.concurrent.TimeUnit.*;
import static sonique.bango.driver.BetterWait.*;

public class SupermanWebDriver {
    private final WebDriver webDriver;

    public SupermanWebDriver(String url) {
//        webDriver = DriverFactory.HTML_UNIT.build();
        webDriver = DriverFactory.FIREFOX.build();
        webDriver.get(url);
    }

    public WebElement waitUntil(final By by) {
        return waitUntil(by, 500);
    }

    public WebElement waitUntil(final By by, long milliseconds) {
        dally().withTimeout(milliseconds, MILLISECONDS)
                .until(webDriver, new Predicate<WebDriver>() {
                    @Override
                    public boolean apply(WebDriver webDriver) {
                        WebElement element = webDriver.findElement(by);

                        return element != null;
                    }
                });

        return webDriver.findElement(by);
    }

    public void close() {
        webDriver.close();
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
package sonique.bango.driver;

import com.gargoylesoftware.htmlunit.ElementNotFoundException;
import com.google.common.base.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static sonique.bango.driver.BetterWait.dally;

public class SupermanWebDriver {
    private final WebDriver webDriver;

    public SupermanWebDriver(String url) {
//        webDriver = DriverFactory.HTML_UNIT.build();
        webDriver = DriverFactory.FIREFOX.build();
        webDriver.get(url);
    }

    public WebElement waitUntil(final By by) {
        return waitUntil(by, 100000);
    }

    public WebElement waitUntil(final By by, long milliseconds) {
        Function<WebDriver, WebElement> function = webDriver1 -> {
            try {
                return webDriver1.findElement(by);
            } catch (ElementNotFoundException | NotFoundException e) {
                return null;
            }
        };

        return dally().withTimeout(milliseconds, MILLISECONDS)
                .until(webDriver, function);
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
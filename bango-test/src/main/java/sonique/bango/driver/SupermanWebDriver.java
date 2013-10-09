package sonique.bango.driver;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

public class SupermanWebDriver {
    private final WebDriverWait wait;
    private final WebDriver webDriver;

    public SupermanWebDriver(String url) {
//        webDriver = DriverFactory.HTML_UNIT.build();
        webDriver = DriverFactory.FIREFOX.build();
        wait = new WebDriverWait(webDriver, 5);
        webDriver.get(url);
    }

    public WebElement waitFor(By by) {
        return wait.until(presenceOfElementLocated(by));
    }

    public WebElement waitFor(By by, int seconds) {
        return new WebDriverWait(webDriver, seconds).until(presenceOfElementLocated(by));
    }

    public void close() {
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
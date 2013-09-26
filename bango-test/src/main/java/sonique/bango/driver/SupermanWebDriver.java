package sonique.bango.driver;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.internal.seleniumemulation.JavascriptLibrary;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.logging.Level;
import java.util.logging.Logger;

import static sonique.bango.driver.SupermanWebDriver.DriverFactory.*;

public class SupermanWebDriver {
    private final WebDriverWait wait;
    private final WebDriver webDriver;

    public SupermanWebDriver(String url) {
//        webDriver = HTML_UNIT.build();
        webDriver = FIREFOX.build();
        wait = new WebDriverWait(webDriver, 5);
        webDriver.get(url);
    }

    public WebElement waitFor(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
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
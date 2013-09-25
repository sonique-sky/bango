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

public class SupermanWebDriver {
    private final WebDriverWait wait;

    public SupermanWebDriver(String url) {
        HtmlUnitDriver webDriver = new HtmlUnitDriver();
//        FirefoxDriver webDriver = new FirefoxDriver();
        webDriver.setJavascriptEnabled(true);
        wait = new WebDriverWait(webDriver, 5);
        webDriver.get(url);
    }

    public WebElement waitFor(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
}
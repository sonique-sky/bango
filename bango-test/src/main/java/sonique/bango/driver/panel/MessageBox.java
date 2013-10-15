package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.predicate.IsDisplayedPredicate;
import sonique.bango.driver.predicate.IsEnabledPredicate;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.openqa.selenium.By.cssSelector;
import static sonique.bango.driver.BetterWait.dally;

public class MessageBox extends SupermanContainer implements HasTitle {

    public MessageBox(SupermanWebDriver driver) {
        super(driver, cssSelector("div.x-message-box"));
    }

    public void clickOk() {
        element().findElement(By.xpath(".//span[text()='OK']")).click();
    }

    public void clickYes() {
        element().findElement(By.xpath(".//span[text()='Yes']")).click();
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));

        return titleElement.getText();
    }
}

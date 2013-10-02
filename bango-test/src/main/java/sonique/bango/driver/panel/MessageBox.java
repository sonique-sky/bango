package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;

import static org.openqa.selenium.By.cssSelector;

public class MessageBox extends SupermanContainer implements HasTitle {

    public MessageBox(SupermanWebDriver driver) {
        super(driver, cssSelector("div.x-message-box"));
    }

    public void clickOk() {
        element().findElement(By.xpath("//span[text()='OK']")).click();
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));

        return titleElement.getText();
    }
}

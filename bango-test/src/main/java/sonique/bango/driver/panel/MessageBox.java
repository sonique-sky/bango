package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;

import static org.openqa.selenium.By.cssSelector;

public class MessageBox extends SupermanContainer {
    public MessageBox(SupermanWebDriver driver) {
        super(driver, cssSelector("div.x-message-box"));
    }

    public void clickOk() {
        element().findElement(By.xpath("//span[text()='OK']")).click();
    }
}

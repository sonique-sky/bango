package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;

public class MessageBox extends SupermanElement {
    public MessageBox(SupermanWebDriver driver) {
        super(driver.waitFor(By.cssSelector("div.x-message-box")));
    }

    public void clickOk() {
        rootElement.findElement(By.xpath("//span[text()='OK']")).click();
    }
}

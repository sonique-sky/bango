package sonique.bango.driver.panel.dialog;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.HasMessage;
import sonique.bango.driver.panel.SupermanDialog;

import static org.openqa.selenium.By.cssSelector;

public class MessageBox extends SupermanDialog implements HasMessage {

    public MessageBox(SupermanWebDriver driver) {
        super(driver, cssSelector("div.x-message-box"));
    }

    public void clickOk() {
        buttonLabeled("OK").click();
    }

    public void clickYes() {
        buttonLabeled("Yes").click();
    }

    public void clickNo() {
        buttonLabeled("No").click();
    }

    @Override
    public String message() {
        return element().findElement(By.cssSelector("div.x-window-text")).getText();
    }
}
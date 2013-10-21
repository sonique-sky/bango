package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.HasMessage;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.SupermanContainer;
import sonique.bango.driver.component.form.SupermanButton;

import static org.openqa.selenium.By.cssSelector;

public class MessageBox extends SupermanContainer implements HasTitle, HasMessage {

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
        return element().findElement(By.cssSelector("div.x-form-display-field")).getText();
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));

        return titleElement.getText();
    }

    public SupermanButton buttonLabeled(String label) {
        return new SupermanButton(this, By.xpath(String.format(".//span[text()='%s']", label)));
    }
}

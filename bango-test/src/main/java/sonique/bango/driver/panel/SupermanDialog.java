package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.SupermanContainer;
import sonique.bango.driver.component.form.SupermanButton;

public abstract class SupermanDialog extends SupermanContainer implements HasTitle {

    protected SupermanDialog(SupermanWebDriver driver, By by) {
        super(driver, by);
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));

        return titleElement.getText();
    }

    protected SupermanButton buttonLabeled(String label) {
        return new SupermanButton(this, By.xpath(String.format(".//span[text()='%s']/parent::span/parent::span/parent::a", label)));
    }
}

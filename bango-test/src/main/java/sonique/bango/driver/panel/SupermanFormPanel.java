package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

public class SupermanFormPanel extends SupermanComponent {

    public SupermanFormPanel(SupermanContainer supermanContainer, By locator) {
        super (supermanContainer, locator);
    }

    protected SupermanButton button(By by) {
        return new SupermanButton(this, by);
    }

    /*
    //tr[contains(@class, 'x-form-item-input-row') and ./td/label/text() = 'Created Date:']/td/input
    //label[text() = 'Created Date:']/parent::td/parent::tr/td/input
     */
    protected SupermanTextField textField(String label) {
        return new SupermanTextField(this, By.xpath(String.format("//label[text() = '%s:']/parent::td/parent::tr/td/input", label)));
    }
}

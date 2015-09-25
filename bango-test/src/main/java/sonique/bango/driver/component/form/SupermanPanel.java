package sonique.bango.driver.component.form;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;

public abstract class SupermanPanel extends SupermanComponent {

    protected SupermanPanel(SupermanElement element, By locator) {
        super (element, locator);
    }

    protected SupermanButton button(By by) {
        return new SupermanButton(this, by);
    }

    protected SupermanTextField textField(String label) {
        return new SupermanTextField(this, By.xpath(String.format(".//label/span[text() = '%s:']/parent::label/parent::div/div/div/div/input", label)));
    }

    protected SupermanDateField dateField(String label, String dateFormat) {
        return new SupermanDateField(this, dateFormat,  By.xpath(String.format(".//label[text() = '%s:']/parent::td/parent::tr/td/table/tbody/tr/td/input", label)));
    }
}

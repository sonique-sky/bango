package sonique.bango.driver.component.form;

import org.openqa.selenium.By;
import sonique.bango.driver.component.HasLabel;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;

public class SupermanRadioGroup extends SupermanComponent {

    public SupermanRadioGroup(SupermanElement element) {
        super(element, By.cssSelector(".x-form-radio-group"));
    }

    public void select(HasLabel hasLabel) {
        new SupermanRadioButton(this, By.xpath(".//td[contains(@class, 'x-form-cb-wrap')]/label[text() = '" + hasLabel.label() + "']")).click();
    }
}

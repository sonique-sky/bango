package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.panel.HasLabel;
import sonique.bango.driver.panel.SupermanComponent;
import sonique.bango.driver.panel.SupermanElement;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class SupermanRadioGroup extends SupermanComponent {

    public SupermanRadioGroup(SupermanElement element) {
        super(element, By.cssSelector(".x-form-radio-group"));
    }

    public void select(HasLabel hasLabel) {
        new SupermanRadioButton(this, By.xpath("//td[contains(@class, 'x-form-cb-wrap')]/label[text() = '" + hasLabel.label() + "']")).click();
    }
}

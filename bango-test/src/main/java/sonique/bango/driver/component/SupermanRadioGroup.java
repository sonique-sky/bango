package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.panel.HasLabel;
import sonique.bango.driver.panel.SupermanElement;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class SupermanRadioGroup extends SupermanElement {

    private final Map<String, SupermanRadioButton> radioButtons = newHashMap();

    public SupermanRadioGroup(SupermanWebDriver driver, SupermanElement parent, By by) {
        super(driver, parent, by);

        List<WebElement> elements = element.findElements(By.cssSelector(".x-form-type-radio"));

        int index = 1;
        for (WebElement element : elements) {
            String fieldLabel = element.findElement(By.cssSelector("label.x-form-cb-label")).getText();

//            radioButtons.put(fieldLabel, new SupermanRadioButton(driver, this, By.xpath("//td[contains(@class, 'x-form-cb-wrap')][" + index++ + "]")));
            radioButtons.put(fieldLabel, new SupermanRadioButton(driver, this, By.xpath("//td[contains(@class, 'x-form-cb-wrap')]/label[text() = '" + fieldLabel + "']")));
        }
    }

    public void select(HasLabel hasLabel) {
        radioButtons.get(hasLabel.label()).click();
    }
}

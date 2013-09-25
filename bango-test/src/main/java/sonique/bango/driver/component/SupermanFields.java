package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class SupermanFields {
    private final Map<String, SupermanField> fields = newHashMap();

    public SupermanFields(WebElement parent) {
        List<WebElement> fieldElements = parent.findElements(By.cssSelector(".x-field"));
        for (WebElement fieldElement : fieldElements) {
            String fieldLabel = fieldElement.findElement(By.cssSelector("label.x-form-item-label")).getText();
            fields.put(fieldLabel, new SupermanTextField(fieldElement));
        }
    }

    public SupermanField field(String label) {
        return fields.get(label + ":");
    }

    public SupermanTextField textField(String label) {
        return (SupermanTextField) field(label);
    }
}
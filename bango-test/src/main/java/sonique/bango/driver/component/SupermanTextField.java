package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

public class SupermanTextField implements SupermanField {
    private final WebElement inputElement;

    public SupermanTextField(WebElement parent) {
        this.inputElement = parent.findElement(By.cssSelector("input.x-form-text"));
    }

    @Override
    public void enter(String enterValue) {
        inputElement.sendKeys(enterValue);
        inputElement.sendKeys(Keys.TAB);
    }

    @Override
    public String value() {
        return inputElement.getText();
    }

    @Override
    public void clear() {
        inputElement.sendKeys("");
    }
}
package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public interface SupermanElement {
    boolean isEnabled();
    boolean isDisplayed();
    WebElement find(By by);
    SupermanElement parent();
}

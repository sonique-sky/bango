package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public interface SupermanElement {
    boolean isEnabled();
    boolean isDisplayed();
    WebElement find(By by);
}

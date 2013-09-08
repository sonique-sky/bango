package sonique.bango.driver.component;

import org.openqa.selenium.WebElement;

import java.util.Arrays;
import java.util.List;

public class SupermanButton {
    private final WebElement localRootElement;

    public SupermanButton(WebElement localRootElement) {
        this.localRootElement = localRootElement;
    }

    public boolean isDisabled() {
        return classes().contains("x-btn-disabled");
    }

    private List<String> classes() {
        return Arrays.asList(localRootElement.getAttribute("class").split(" "));
    }

    public void click() {
        localRootElement.click();

    }
}

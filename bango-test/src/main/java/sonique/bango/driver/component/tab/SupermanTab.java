package sonique.bango.driver.component.tab;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.panel.AppContainer;

public class SupermanTab extends SupermanComponent {
    public SupermanTab(AppContainer appContainer, String tabTitle) {
        super(appContainer, By.xpath(String.format(".//a[contains(concat(' ', @class, ' '), ' x-tab ')]/span/span/span[text()='%s']/parent::span/parent::span/parent::a", tabTitle)));
    }

    public String tabId() {
        return element().getAttribute("id");
    }
}

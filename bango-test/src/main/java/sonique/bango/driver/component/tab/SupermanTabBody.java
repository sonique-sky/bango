package sonique.bango.driver.component.tab;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;

public abstract class SupermanTabBody extends SupermanComponent {
    public SupermanTabBody(SupermanTab tabHeader) {
        super(tabHeader.parent(), By.xpath(String.format(".//div[@id='tab-panel-body']/div[@aria-labelledby='%s']", tabHeader.tabId())));
    }
}

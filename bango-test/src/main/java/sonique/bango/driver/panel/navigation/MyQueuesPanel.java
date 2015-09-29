package sonique.bango.driver.panel.navigation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import spm.domain.QueueName;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class MyQueuesPanel extends SupermanComponent {
    public MyQueuesPanel(SupermanElement parentElement) {
        super(parentElement, By.cssSelector("div.queues-panel"));
    }

    public List<QueueName> queueNames() {
        return element().findElements(By.cssSelector("li.queue-wrap > div")).stream()
                .map(element -> new QueueName(element.getText()))
                .collect(toList());
    }
}

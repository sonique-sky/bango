package sonique.bango.driver.panel.navigation;

import com.google.common.base.Function;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import spm.domain.QueueName;

import java.util.List;

import static com.google.common.collect.Lists.transform;

public class MyQueuesPanel extends SupermanComponent {
    public MyQueuesPanel(SupermanElement parentElement) {
        super(parentElement, By.cssSelector("div.my-queues-panel"));
    }

    public List<QueueName> queueNames() {
        List<WebElement> elements = element().findElements(By.cssSelector("li.queue-wrap > div"));
        return transform(elements, new Function<WebElement, QueueName>() {
            @Override
            public QueueName apply(WebElement input) {
                return new QueueName(input.getText());
            }
        });
    }
}

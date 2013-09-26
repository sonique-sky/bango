package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

public class SearchFormPanel extends SupermanElement {

    private final SupermanTextField searchField;
    private final SupermanButton searchButton;

    public enum SearchType {
        ServiceProblemId,
        ServiceId,
        DirectoryNumber,
        MspId
    }

    public SearchFormPanel(SupermanWebDriver driver) {
        super(driver.waitFor(By.cssSelector("div.search-panel")));

        searchField = new SupermanTextField(rootElement);
        searchButton = new SupermanButton(rootElement.findElement(By.cssSelector(".x-btn")));
    }

    public void searchUsing(SearchType searchType, String searchTerm) {
        searchField.enter(searchTerm);
        // Meh
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        searchButton.click();
    }
}

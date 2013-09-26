package sonique.bango.driver.panel;

import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

import static org.openqa.selenium.By.cssSelector;

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
        super(driver, cssSelector("div.search-panel"));

        searchField = new SupermanTextField(element);
        searchButton = new SupermanButton(driver, this, cssSelector(".x-btn"));
    }

    public void searchUsing(SearchType searchType, String searchTerm) {



        searchField.enter(searchTerm);

        searchButton.click();
    }
}

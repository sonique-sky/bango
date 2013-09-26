package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanRadioGroup;
import sonique.bango.driver.component.SupermanTextField;

import static org.openqa.selenium.By.cssSelector;

public class SearchPanel extends SupermanElement {

    private final SupermanTextField searchField;
    private final SupermanButton searchButton;
    private final SupermanRadioGroup radioGroup;

    public enum SearchType implements HasLabel {
        ServiceProblemId("Service Problem ID"),
        ServiceId("Service ID"),
        DirectoryNumber("Directory Number"),
        MspId("MSP ID");

        private final String label;

        private SearchType(String label) {
            this.label = label;
        }

        @Override
        public String label() {
            return label;
        }
    }

    public SearchPanel(SupermanWebDriver driver) {
        super(driver, cssSelector("div.search-panel"));

        searchField = new SupermanTextField(element);
        searchButton = new SupermanButton(driver, this, cssSelector(".x-btn"));
        radioGroup = new SupermanRadioGroup(driver, this, By.cssSelector(".x-form-radio-group"));
    }

    public void searchUsing(SearchType searchType, String searchTerm) {
        radioGroup.select(searchType);

        searchField.enter(searchTerm);

        searchButton.click();
    }
}

package sonique.bango.driver.panel.navigation;

import org.openqa.selenium.By;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.form.SupermanRadioGroup;
import sonique.bango.driver.component.form.SupermanTextField;
import sonique.bango.driver.component.HasLabel;
import sonique.bango.driver.component.SupermanContainer;
import sonique.types.StringValue;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

import static org.openqa.selenium.By.cssSelector;

public class SearchPanel extends SupermanComponent {

    private final SupermanTextField searchField;
    private final SupermanButton searchButton;
    private final SupermanRadioGroup radioGroup;

    private enum SearchType implements HasLabel {
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

    public SearchPanel(SupermanContainer container) {
        super(container, cssSelector("div.search-panel"));

        searchField = new SupermanTextField(this, By.cssSelector("input.x-form-text"));
        searchButton = new SupermanButton(this);
        radioGroup = new SupermanRadioGroup(this);
    }

    public void searchFor(SnsServiceId snsServiceId) {
        searchUsing(SearchType.ServiceId, snsServiceId);
    }

    public void searchFor(ServiceProblemId serviceProblemId) {
        searchUsing(SearchType.ServiceProblemId, serviceProblemId);
    }

    public void searchFor(DirectoryNumber directoryNumber) {
        searchUsing(SearchType.DirectoryNumber, directoryNumber);
    }

    private void searchUsing(SearchType searchType, StringValue searchTerm) {
        radioGroup.select(searchType);

        searchField.enter(searchTerm.asString());

        searchButton.click();
    }
}

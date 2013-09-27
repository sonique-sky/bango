package sonique.bango.driver.component;

import sonique.bango.driver.panel.SupermanElement;

public interface SupermanField extends SupermanElement {
    void clear();
    void enter(String value);
    String value();
}

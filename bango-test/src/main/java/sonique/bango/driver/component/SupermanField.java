package sonique.bango.driver.component;

import sonique.bango.driver.panel.SupermanElement;

public interface SupermanField<T> extends SupermanElement {
    void clear();
    void enter(String value);
    T value();
}

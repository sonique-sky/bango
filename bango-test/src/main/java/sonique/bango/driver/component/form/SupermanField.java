package sonique.bango.driver.component.form;

import sonique.bango.driver.component.SupermanElement;

public interface SupermanField<T> extends SupermanElement {
    void clear();
    void enter(String value);
    T value();
}

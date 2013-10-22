package sonique.bango.driver.panel.dialog;

import sonique.bango.driver.SupermanWebDriver;

public class SupermanDialogs {
    private final SupermanWebDriver driver;

    public SupermanDialogs(SupermanWebDriver driver) {
        this.driver = driver;
    }

    public LoginDialog login() {
        return new LoginDialog(driver);
    }

    public MessageBox message() {
        return new MessageBox(driver);
    }

    public AddNoteDialog addNote() {
        return new AddNoteDialog(driver);
    }
}

package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import java.util.Arrays;
import java.util.List;

public abstract class SupermanComponent implements SupermanElement {

    private final SupermanElement parentElement;
    private final By by;

    protected SupermanComponent(SupermanElement parentElement, By by) {
        this.parentElement = parentElement;
        this.by = by;
    }

    protected WebElement element() {
        return parentElement.find(by);
    }

    @Override
    public boolean isEnabled() {
        return parentElement.isEnabled();
    }

    @Override
    public boolean isDisplayed() {
        try {
            return element().isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    @Override
    public WebElement find(By by) {
        return element().findElement(by);
    }

    protected boolean contains(By by) {
        try {
            find(by);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    protected List<String> classes() {
        return Arrays.asList(element().getAttribute("class").split(" "));
    }

    @Override
    public SupermanElement parent() {
        return parentElement;
    }
}
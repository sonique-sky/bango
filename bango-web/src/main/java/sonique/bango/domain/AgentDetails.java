package sonique.bango.domain;

public class AgentDetails {
    private final String firstName;
    private final String lastName;

    public AgentDetails(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String firstName() {
        return firstName;
    }

    public String lastName() {
        return lastName;
    }

    public String displayName() {
        return String.format("%s %s", firstName, lastName);
    }
}

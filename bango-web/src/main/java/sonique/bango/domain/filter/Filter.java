package sonique.bango.domain.filter;

public class Filter {
    //filter:[{"property":"queueId","value":5}]

    private String property;
    private String value;

    public Filter(String property, String value) {
        this.property = property;
        this.value = value;
    }

    public String property() {
        return property;
    }

    public String value() {
        return value;
    }
}

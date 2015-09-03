package sonique.bango.domain;

public class ResponseData<T> {
    private final T onePageOfSearchResults;
    private boolean success = true;


    public ResponseData(T onePageOfSearchResults) {
        this.onePageOfSearchResults = onePageOfSearchResults;
    }
}

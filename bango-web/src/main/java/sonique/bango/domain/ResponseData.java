package sonique.bango.domain;

public class ResponseData<T> {
    private final T data;
    private boolean success = true;

    public ResponseData(T data) {
        this.data = data;
    }

}

package sonique.bango.servlet;

public class GTFOException extends RuntimeException {
    private final int status;
    private final String message;

    public GTFOException(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int status() {
        return status;
    }

    public String message() {
        return message;
    }

}

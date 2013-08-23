package sonique.bango.domain;

public class Agent {
    private static final String AVAILABLE = "Available";
    private String availability = AVAILABLE;

    public void toggleAvailability() {
        if(AVAILABLE.equals(availability)) {
            availability = "Unavailable";
        }
        else availability = AVAILABLE;
    }

    public String dataAsJason() {
        return "{\n" +
                "\t'agent': {\n" +
                "\t\t'code': 'CAPTAIN.SCARLET',\n" +
                "\t\t'details': {\n" +
                "\t\t\t'firstName': 'Captain',\n" +
                "\t\t\t'lastName': 'Scarlet'\n" +
                "\t\t},\n" +
                "\t\t'availability': '" + availability + "',\n" +
                "\t\t'activeCount' : 5,\n" +
                "\t\t'heldCount' : 22,\n" +
                "\t\t'queues' : [\n" +
                "\t\t\t{ 'id': 1, 'name': 'Queue 1' },\n" +
                "\t\t\t{ 'id': 2, 'name': 'Queue 2' },\n" +
                "\t\t\t{ 'id': 3, 'name': 'Queue 3' },\n" +
                "\t\t\t{ 'id': 4, 'name': 'Queue 4' },\n" +
                "\t\t\t{ 'id': 5, 'name': 'Queue 5' }\n" +
                "\t\t]\n" +
                "\t}\n" +
                "}";
    }
}

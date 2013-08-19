package sonique.bango;

import com.googlecode.utterlyidle.ApplicationBuilder;
import com.googlecode.utterlyidle.Binding;

import java.net.URL;

import static com.googlecode.totallylazy.URLs.url;
import static com.googlecode.utterlyidle.dsl.StaticBindingBuilder.in;
import static com.googlecode.utterlyidle.modules.Modules.bindingsModule;

public class Bingo {

    public static void main(String[] args) throws Exception {
        ApplicationBuilder application = ApplicationBuilder.application();
        URL url = url("file:///Users/tim/trunk/bingo/target/build");

        Binding[] bindings = in((url)).path("/superman").call();
        application.add(bindingsModule(bindings));
        application.start(8080);
    }
}

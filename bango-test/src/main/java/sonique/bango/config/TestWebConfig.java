package sonique.bango.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import sonique.bango.springconfig.WebConfig;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class TestWebConfig extends WebConfig {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String resourcePath = resolveResourceDir();
        System.out.println("resourcePath = " + resourcePath);
        registry.addResourceHandler("/**").addResourceLocations(resourcePath);
    }

    private String resolveResourceDir() {
        Path userDir = Paths.get(System.getProperty("user.dir"));
        return (userDir.endsWith("bango-test"))
                ? "file:" + userDir.getParent().toString() + "/bango-js/src/main/javascript/"
                : "file:" + userDir.toString() + "/bango-js/src/main/javascript/";
    }
}

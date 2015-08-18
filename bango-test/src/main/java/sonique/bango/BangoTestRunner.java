package sonique.bango;

import com.google.common.collect.ImmutableSet;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleState;
import org.apache.catalina.startup.Tomcat;
import org.springframework.web.SpringServletContainerInitializer;
import org.springframework.web.context.support.WebApplicationContextUtils;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.config.TestContextInitializer;
import sonique.bango.springconfig.SecurityConfigInitializer;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static com.google.common.util.concurrent.Uninterruptibles.awaitUninterruptibly;

public final class BangoTestRunner {
    private Tomcat tomcat;
    private Context context;
    private Future<?> handlerFuture;

    public BangoTestRunner(int port) {
        tomcat = new Tomcat();
        tomcat.setPort(port);

        String userDir = System.getProperty("user.dir");
        tomcat.setBaseDir(userDir + "/target/tomcat");
        context = tomcat.addContext("/superman", userDir);
        context.addServletContainerInitializer(
                new SpringServletContainerInitializer(),
                ImmutableSet.of(TestContextInitializer.class, SecurityConfigInitializer.class)
        );
        context.addMimeMapping("css", "text/css");
        context.addMimeMapping("js", "application/javascript");
        context.addMimeMapping("map", "application/json");
        context.addMimeMapping("png", "image/png");
        context.addMimeMapping("jpg", "image/jpeg");
    }

    public synchronized void start() {
        if (!isRunning()) {
            ExecutorService executorService = Executors.newSingleThreadExecutor();
            CountDownLatch latch = new CountDownLatch(1);
            handlerFuture = executorService.submit(() -> {
                try {
                    tomcat.start();
                    latch.countDown();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            awaitUninterruptibly(latch);
        }
    }

    private boolean isRunning() {
        LifecycleState state = tomcat.getServer().getState();
        return state == LifecycleState.STARTED || state == LifecycleState.STARTING;
    }

    public synchronized void stop() {
        try {
            tomcat.stop();
            tomcat.destroy();
            handlerFuture.cancel(true);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ScenarioDriver scenarioDriver() {
        return get(ScenarioDriver.class, "scenarioDriver");
    }

    private <T> T get(Class<T> clazz, String beanName) {
        return WebApplicationContextUtils.getWebApplicationContext(context.getServletContext()).getBean(beanName, clazz);
    }
}
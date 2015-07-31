package sonique.bango.app;

import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

public class AppPool {

    private final Deque<SupermanApp> appPool = new LinkedBlockingDeque<>();
    private final int port;

    public AppPool(int port) {
        this.port = port;
    }

    public SupermanApp borrow() {
        synchronized (appPool) {
            SupermanApp supermanApp = appPool.poll();
            if (supermanApp == null ){
                supermanApp = new SupermanApp(port);
            }
            return supermanApp;
        }
    }

    public void release(SupermanApp supermanApp) {
        synchronized (appPool) {
            appPool.addLast(supermanApp);
        }
    }

    public void shutdown() {
        synchronized (appPool) {
            for (SupermanApp pooledApp : appPool) {
                pooledApp.quit();
                appPool.remove(pooledApp);
            }
        }
    }
}

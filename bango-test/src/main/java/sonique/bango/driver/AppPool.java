package sonique.bango.driver;

import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

public class AppPool {

    private final Deque<SupermanApp> appPool = new LinkedBlockingDeque<SupermanApp>();

    public AppPool(int port, int poolSize) {
        for (int i = 0; i < poolSize; i++) {
             appPool.add(new SupermanApp(port));
        }
    }

    public SupermanApp borrow() {
        synchronized (appPool) {
            return appPool.poll();
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
                pooledApp.close();
                appPool.remove(pooledApp);
            }
        }
    }
}

package sonique.bango.driver;

import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

public class AppPool {

    private final Deque<SupermanApp> appPool = new LinkedBlockingDeque<SupermanApp>();
    private int borrowed = 0;

    public AppPool(int port, int poolSize) {
        for (int i = 0; i < poolSize; i++) {
             appPool.add(new SupermanApp(port));
        }
    }

    public SupermanApp borrow() {
        synchronized (appPool) {
            borrowed++;
            return appPool.poll();
        }
    }

    public void release(SupermanApp supermanApp) {
        synchronized (appPool) {
            borrowed--;
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

    public int getBorrowed() {
        synchronized(appPool) {
            return borrowed;
        }
    }
}

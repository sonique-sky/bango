package sonique.bango.driver;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;

import static java.util.concurrent.Executors.newScheduledThreadPool;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.SECONDS;

public class BetterWait {

    public static final ScheduledExecutorService SCHEDULED_EXECUTOR_SERVICE = newScheduledThreadPool(Integer.parseInt(System.getProperty("bango.app.pool.size", "2")));
    public static final int DEFAULT_TIMEOUT_IN_SECONDS = 5;
    public static final int DEFAULT_INTERVAL_IN_MILLISECONDS = 500;

    public static BetterWait dally() {
        return new BetterWait();
    }

    private BetterWait() {
    }

    public void until(SupermanElement element, Predicate<SupermanElement> predicate) {
        TimeOutRunnable timeOutRunnable = new TimeOutRunnable();
        ScheduledFuture<?> future = SCHEDULED_EXECUTOR_SERVICE.schedule(timeOutRunnable, DEFAULT_TIMEOUT_IN_SECONDS, SECONDS);

        boolean result;

        do {
            result = predicate.apply(element);

            try {
                MILLISECONDS.sleep(DEFAULT_INTERVAL_IN_MILLISECONDS);
            } catch (InterruptedException e) {
                // Ignored
            }

        } while (!timeOutRunnable.timedOut() && !result);
        future.cancel(true);

        if(!result) {
            throw new RuntimeException("Timed out waiting for condition");
        }

    }

    private static class TimeOutRunnable implements Runnable {

        private boolean timedOut = false;

        @Override
        public void run() {
            timedOut = true;
        }

        public boolean timedOut() {
            return timedOut;
        }
    }
}

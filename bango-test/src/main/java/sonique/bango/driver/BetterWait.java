package sonique.bango.driver;

import com.google.common.base.Function;
import com.google.common.base.Predicate;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.Executors.newScheduledThreadPool;
import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class BetterWait {

    private static final ScheduledExecutorService SCHEDULED_EXECUTOR_SERVICE = newScheduledThreadPool(Integer.parseInt(System.getProperty("bango.app.pool.size", "2")));

    private long timeout = 500;
    private long interval = 100;
    private TimeUnit timeoutUnit = MILLISECONDS;
    private TimeUnit intervalUnit = MILLISECONDS;

    public static BetterWait dally() {
        return new BetterWait();
    }

    private BetterWait() {
    }

    public <T, R> R until(T target, Function<T, R> function) {
        TimeOutRunnable timeOutRunnable = new TimeOutRunnable();
        ScheduledFuture<?> future = SCHEDULED_EXECUTOR_SERVICE.schedule(timeOutRunnable, timeout, timeoutUnit);

        R result;

        do {
            result = function.apply(target);

            if (result == null) {
                sleep();
            }

        } while (!timeOutRunnable.timedOut() && result == null);

        future.cancel(true);

        if (result == null) {
            throw new RuntimeException("Timed out waiting for condition");
        }

        return result;
    }

    public <T> void until(T target, Predicate<T> predicate) {
        TimeOutRunnable timeOutRunnable = new TimeOutRunnable();
        ScheduledFuture<?> future = SCHEDULED_EXECUTOR_SERVICE.schedule(timeOutRunnable, timeout, timeoutUnit);

        boolean result;

        do {
            result = predicate.apply(target);

            if (!result) {
                sleep();
            }

        } while (!timeOutRunnable.timedOut() && !result);

        future.cancel(true);

        if (!result) {
            throw new RuntimeException("Timed out waiting for condition");
        }
    }

    private void sleep() {
        try {
            intervalUnit.sleep(interval);
        } catch (InterruptedException e) {
            // Ignored
        }
    }

    public BetterWait withInterval(long interval, TimeUnit intervalUnit) {
        this.interval = interval;
        this.intervalUnit = intervalUnit;

        return this;
    }

    public BetterWait withTimeout(long timeout, TimeUnit timeoutUnit) {
        this.timeout = timeout;
        this.timeoutUnit = timeoutUnit;

        return this;
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

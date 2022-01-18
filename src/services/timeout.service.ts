// Use AbortController to create a timeout function for fetch

// Use like dis
// fetch(url, {signal: TimeoutService.timeoutFetch(3000)});

class TimeoutServiceController {
  // if IE, then AbortController is not supported. Just return undefined.
  // undefined can be passed into the "signal" parameter of fetch and it basically acts like it was never mentioned
  // this provides a "degradation" for IE users. You may just spin forever, too bad, so sad, grow up and get a real browser.

  /** Create an AbortController signal to be passed into the fetch 'signal' parameter. This signal will abort after the passed number of milliseconds. */
  timeoutFetch(ms: number) {
    // If IE, return nothing. So un-support, much fail, wow.
    if (typeof AbortController !== 'function') {
      return;
    }
    const controller = new AbortController();
    setTimeout(() => controller.abort, ms);
    return controller.signal;
  }
}

export const TimeoutService = new TimeoutServiceController();

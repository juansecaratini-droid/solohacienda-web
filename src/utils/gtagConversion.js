// Fires the Google Ads conversion event for the WhatsApp contact buttons.
// Safe to call even if gtag.js didn't load (e.g. blocked by an ad blocker),
// since it should never break the button it's attached to.
export function gtagReportConversion(url) {
  if (typeof window.gtag !== 'function') return false;

  const callback = function () {
    if (typeof url !== 'undefined') {
      window.location = url;
    }
  };

  window.gtag('event', 'conversion', {
    send_to: 'AW-18408493020/ASUhCIiNo-ccENyf7clE',
    event_callback: callback,
  });
  return false;
}

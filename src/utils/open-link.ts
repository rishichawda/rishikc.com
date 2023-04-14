// context: I didn't want google to rank my page lower
// because of bad external to internal link ratio.
// hence, this demon child.
export const trackExternalUrlClick = (url: string) => {
  if (typeof window !== 'undefined' && url) {
    if (window.gtag) {
      window.gtag('event', url, { url })
    }
    window.open(url, '_newtab')
  }
}
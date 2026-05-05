/**
 * A sample SIMID ad that shows an overlay
 */
class SimidOverlay extends BaseSimidCreative {
  constructor() {
    super();

    this.addButtonClickActions_();
  }

  /** @override */
  onTimeUpdate(data) {
    super.onTimeUpdate(data);
  }

  /**
   * Adds actions to different buttons available on the overlay.
   */
  addButtonClickActions_() {
    // this.sendMessageOnButtonClick_('request_play', CreativeMessage.REQUEST_PLAY);
    // this.sendMessageOnButtonClick_('request_pause', CreativeMessage.REQUEST_PAUSE);
    // this.sendMessageOnButtonClick_('request_full_screen', CreativeMessage.REQUEST_FULL_SCREEN);
    // this.sendMessageOnButtonClick_('fatal_error', CreativeMessage.FATAL_ERROR);
    // this.sendMessageOnButtonClick_('request_skip', CreativeMessage.REQUEST_SKIP);
    // this.sendMessageOnButtonClick_('request_stop', CreativeMessage.REQUEST_STOP);
    // this.sendMessageOnLog_();
    // this.sendMessageOnChangeDurationClick_();
  }
}


// The creative should first call ready
const simidOverlay = new SimidOverlay();
// This implementation is immediately ready but other creatives
// may wish to wait for assets to load before calling ready.
simidOverlay.ready();
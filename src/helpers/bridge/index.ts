/**
 * Must be used by UI/React side only
 */

/**
 * Dialog API
 */
const dialog = {
  /**
   * Opens dialog for search and open a file
   */
  showOpenDialog: window.api.showOpenDialog,

  /**
   * Handler on open file
   */
  onOpenFile: window.api.onOpenFile,
};

export { dialog };

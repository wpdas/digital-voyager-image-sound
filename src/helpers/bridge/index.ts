/**
 * Must be used by UI/React side only
 *
 * This is a way of using Node side resources
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

/**
 * Save file API
 */
const saveFile = {
  /**
   * Decode file buffer and open dialog to save file
   */
  decodeAndSaveFile: window.api.decodeAndSaveFile,

  /**
   * On decoded file saved handler
   */
  onDecodeAndSaveFileCompleted: window.api.onDecodeAndSaveFileCompleted,
};

export { dialog, saveFile };

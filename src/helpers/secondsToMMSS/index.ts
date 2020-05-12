/**
 * Converts seconds to MM:SS format
 * @param secondsValue
 */
const secondsToMMSS = (secondsValue: number) => {
  const hours = Math.floor(secondsValue / 60 / 60);
  const minutes = Math.floor(secondsValue / 60) - hours * 60;
  const seconds = secondsValue % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export default secondsToMMSS;

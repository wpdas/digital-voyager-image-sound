const uint8ArrayToArray = (uint8: Uint8Array) => {
  const output: Array<number> = [];
  uint8.forEach((byte) => {
    output.push(byte);
  });
  return output;
};

export default uint8ArrayToArray;

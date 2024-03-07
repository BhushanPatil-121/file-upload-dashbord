export const calculateFileSizeInMb = (size: number) : string => {
    let fileSizeInBytes = size * 0.000001; // bytes to MB
    let fileSizeInMb = fileSizeInBytes.toFixed(1); // allowed decimal values up to 1
    return fileSizeInMb;
  }
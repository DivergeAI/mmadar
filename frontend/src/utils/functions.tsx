export function formatFileSize(fileSize:any) {
    if (fileSize < 1024) {
        return `${fileSize} Bytes`;
    } else if (fileSize < 1024 * 1024) {
        const sizeInKB = (fileSize / 1024).toFixed(2);
        return `${sizeInKB} KB`;
    } else {
        const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
        return `${sizeInMB} MB`;
    }
  }
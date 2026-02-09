export {};

declare global {
  interface Window {
    electronAPI: {
      sendTemp: (url: string, file_extension: string, filename: string) => void;
    };
  }
}

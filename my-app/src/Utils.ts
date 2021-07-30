class Utils {
  static ReadFile(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e.target?.result) {
          res(e.target?.result);
        }
      };

      reader.addEventListener("error", rej);
      reader.readAsArrayBuffer(file);
    });
  }
}
export default Utils;

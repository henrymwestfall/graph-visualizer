"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterface = void 0;
class FileInterface extends EventTarget {
    constructor() {
        super();
        this.form = document.getElementById("upload");
        this.file = document.getElementById("file");
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
    handleSubmit(event) {
        // stop the form from reloading the page
        event.preventDefault();
        // if there is no file, do nothing
        if (!this.file.value.length)
            return;
        // create reader and read the text of the upload JSON file
        let reader = new FileReader();
        reader.onload = (event) => this.loadFile(event); // create a callback for when the file has been read
        reader.readAsText(this.file.files[0]);
    }
    loadFile(event) {
        let str = event.target.result;
        this.data = JSON.parse(str);
        this.dispatchEvent(new CustomEvent("file_loaded", { detail: { graphdata: this.data["data"] } }));
        console.log("Loaded File");
    }
    get_data() {
        return this.data;
    }
}
exports.FileInterface = FileInterface;
exports.default = FileInterface;
//# sourceMappingURL=file_interface.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInterface {
    constructor() {
        this.form = document.getElementById("upload");
        this.file = document.getElementById("file");
        this.form.addEventListener('submit', this.handleSubmit);
    }
    handleSubmit(event) {
        // stop the form from reloading the page
        event.preventDefault();
        // if there is no file, do nothing
        if (!this.file.value.length)
            return;
        // create reader and read the text of the upload JSON file
        let reader = new FileReader();
        reader.onload = this.loadFile; // create a callback for when the file has been read
        reader.readAsText(this.file.files[0]);
    }
    loadFile(event) {
        let str = event.target.result;
        this.data = JSON.parse(str);
    }
    get_data() {
        return this.data;
    }
}
exports.default = FileInterface;
//# sourceMappingURL=file_interface.js.map
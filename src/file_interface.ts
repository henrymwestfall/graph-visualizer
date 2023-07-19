class FileInterface {
    private form: HTMLFormElement;
    private file: HTMLInputElement;
    private data: Object;

    constructor() {
        this.form = document.getElementById("upload") as HTMLFormElement;
        this.file = document.getElementById("file") as HTMLInputElement;

        this.form.addEventListener('submit', this.handleSubmit)
    }

    handleSubmit(event: Event) {
        // stop the form from reloading the page
        event.preventDefault();

        // if there is no file, do nothing
        if (!this.file.value.length) return;

        // create reader and read the text of the upload JSON file
        let reader = new FileReader();
        reader.onload = this.loadFile // create a callback for when the file has been read
        reader.readAsText(this.file.files[0])
    }

    loadFile(event: ProgressEvent<FileReader>) {
        let str = event.target.result as string;
        this.data = JSON.parse(str);
    }

    get_data() {
        return this.data;
    }
}

export default FileInterface;
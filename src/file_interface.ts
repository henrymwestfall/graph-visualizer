export class FileInterface extends EventTarget {
    private form: HTMLFormElement;
    private file: HTMLInputElement;
    private data: Object;

    private name: string;

    constructor() {
        super()

        this.form = document.getElementById("upload") as HTMLFormElement;
        this.file = document.getElementById("file") as HTMLInputElement;

        this.form.addEventListener('submit', (event) => this.handleSubmit(event))
    }

    handleSubmit(event: Event) {
        // stop the form from reloading the page
        event.preventDefault();

        // if there is no file, do nothing
        if (!this.file.value.length) return;

        // create reader and read the text of the upload JSON file
        let reader = new FileReader();
        reader.onload = (event) => this.loadFile(event); // create a callback for when the file has been read
        reader.readAsText(this.file.files[0])
    }

    loadFile(event: ProgressEvent<FileReader>) {
        let str = event.target.result as string;
        this.data = JSON.parse(str);
        this.dispatchEvent(new CustomEvent("file_loaded", {detail: {graphdata: this.data["data"]}}));
        console.log("Loaded File")
    }

    get_data() {
        return this.data;
    }
}

export default FileInterface;
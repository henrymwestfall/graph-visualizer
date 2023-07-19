export class SettingInterface {
    private secondsPerFrame: HTMLInputElement; // text input
    private attributeForColorPartition: HTMLSelectElement; // dropdown menu
    private sizeNodesByDegree: HTMLInputElement; // checkbox
    private runAnimation: HTMLInputElement; // checkbox

    constructor() {
        // query HTML elements for each setting
        this.secondsPerFrame = document.getElementById("secondsPerFrame") as HTMLInputElement;
        this.attributeForColorPartition = document.getElementById("attributeForColorPartition") as HTMLSelectElement;
        this.sizeNodesByDegree = document.getElementById("sizeNodesByDegree") as HTMLInputElement;
        this.runAnimation = document.getElementById("runAnimation") as HTMLInputElement;

        // set initial values
        this.secondsPerFrame.valueAsNumber = 1.0;
        this.sizeNodesByDegree.checked = false;
        this.runAnimation.checked = true;
    }

    getSecondsPerFrame() {
        return parseFloat(this.secondsPerFrame.value);
    }

    getAttributeForColorPartition() {
        return this.attributeForColorPartition;
    }

    shouldSizeNodesByDegree() {
        return this.sizeNodesByDegree;
    }

    shouldRunAnimation() {
        return this.runAnimation;
    }
}

export default SettingInterface;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingInterface = void 0;
class SettingInterface {
    constructor() {
        // query HTML elements for each setting
        this.secondsPerFrame = document.getElementById("secondsPerFrame");
        this.attributeForColorPartition = document.getElementById("attributeForColorPartition");
        this.sizeNodesByDegree = document.getElementById("sizeNodesByDegree");
        this.runAnimation = document.getElementById("runAnimation");
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
exports.SettingInterface = SettingInterface;
exports.default = SettingInterface;
//# sourceMappingURL=setting_interface.js.map
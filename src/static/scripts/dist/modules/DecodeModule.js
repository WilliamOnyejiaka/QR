var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Helpers } from "./modules.js";
export default class DecodeModule {
    constructor(selectors) {
        this.dropArea = selectors.dropArea;
        this.imagePreview = selectors.imagePreview;
        this.browseBtn = selectors.browseBtn;
        this.dropAreaTitle = selectors.dropAreaTitle;
        this.OR = selectors.OR;
    }
    toggleDropAreaElements(activate = true) {
        if (activate) {
            this.dropAreaTitle.classList.add("active");
            this.OR.classList.add("active");
            this.browseBtn.classList.add("active");
            this.imagePreview.classList.remove("active");
            this.dropArea.classList.remove("active");
        }
        else {
            this.dropAreaTitle.classList.remove("active");
            this.OR.classList.remove("active");
            this.browseBtn.classList.remove("active");
            this.imagePreview.classList.add("active");
            this.dropArea.classList.add("active");
        }
    }
    saveFileAndSetPreview(file) {
        const imageIsValid = Helpers.validImage(file.type);
        if (imageIsValid) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => __awaiter(this, void 0, void 0, function* () {
                const result = reader.result;
                localStorage.setItem("imageFile", result);
                this.displayImage(result);
            }));
            return true;
        }
        return false;
    }
    displayImage(imageURL) {
        this.imagePreview.setAttribute("src", imageURL);
        this.toggleDropAreaElements(false);
    }
}

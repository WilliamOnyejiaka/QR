var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Helpers, DecodeModule, Modal } from "./modules/modules.js";
import Services from "./Services/Services.js";
const imageFile = document.querySelector("#image-file");
const decodeBtn = document.querySelector("#decode-btn");
const browseBtn = document.querySelector("#browse-btn");
const resetBtn = document.querySelector("#reset-btn");
const services = new Services();
const dropArea = document.querySelector(".drop-area");
const dropAreaTitle = document.querySelector(".drop-area-title");
const OR = document.querySelector("#OR");
const imagePreview = document.querySelector("#image-preview");
const module = new DecodeModule({
    dropArea,
    imagePreview,
    browseBtn,
    dropAreaTitle,
    OR
});
const footerButton = document.querySelector(".footer-btn");
const headerCloseButton = document.querySelectorAll(".header-close-btn");
const overlay = document.querySelector(".overlay");
const modal = new Modal(overlay);
document.addEventListener("DOMContentLoaded", e => {
    const imageURL = localStorage.getItem("imageFile");
    imageURL && module.displayImage(imageURL);
});
footerButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const modalElement = footerButton.closest(".modal");
    if (footerButton.dataset.btnType == "close") {
        modal.closeModal(modalElement);
    }
    else {
        const modalBody = document.querySelector(".modal-body");
        const copied = yield Helpers.copyToClipBoard(modalBody.textContent);
        if (!copied) {
            modal.closeModal(modalElement);
            modal.openModal("Error", "Text Was Not Copied", "error");
        }
    }
}));
headerCloseButton.forEach(button => {
    button.addEventListener('click', e => {
        const modalElement = button.closest(".modal");
        modal.closeModal(modalElement);
    });
});
overlay.addEventListener('click', e => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modalElement) => modal.closeModal(modalElement));
});
dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropAreaTitle.textContent = "Release Here";
    dropArea.classList.add("active");
});
dropArea.addEventListener("dragleave", (e) => {
    dropAreaTitle.textContent = "Drag & Drop QRCode Here";
    dropArea.classList.remove("active");
});
dropArea.addEventListener("drop", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!module.saveFileAndSetPreview(file)) {
        dropAreaTitle.textContent = "Drag & Drop QRCode Here";
        modal.openModal("Error", "image is not valid");
    }
}));
browseBtn.addEventListener("click", e => imageFile.click());
imageFile.addEventListener("change", e => {
    const file = imageFile.files[0];
    (!module.saveFileAndSetPreview(file) && modal.openModal("Error", "image is not valid"));
});
decodeBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrl = localStorage.getItem("imageFile");
    if (imageUrl) {
        const file = yield Helpers.convertURLToFile(imageUrl);
        const decodedData = yield Helpers.decodeQRCode(file);
        const result = (yield decodedData).message;
        modal.openModal("Decoded Result", result, "normal");
    }
    else {
        modal.openModal("Decoded Result", "No file selected");
    }
}));
resetBtn.addEventListener("click", e => {
    dropAreaTitle.textContent = "Drag & Drop QRCode Here";
    module.toggleDropAreaElements();
    imageFile.value = "";
    localStorage.removeItem("imageFile");
});

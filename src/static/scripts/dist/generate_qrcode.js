var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Services from "./Services/Services.js";
import { Helpers, GenerateQRCodeModule, Modal } from "./modules/modules.js";
const showInput = document.querySelector("#show-input");
const resetBtn = document.querySelector("#reset-btn");
const imagePreview = document.querySelector("#image-preview");
const downloadBtn = document.querySelector("#download-btn");
const defaultText = document.querySelector("#default-text");
const services = new Services();
const module = new GenerateQRCodeModule({
    imagePreview: imagePreview,
    defaultText: defaultText
});
const footerButton = document.querySelector(".footer-btn");
const headerCloseButton = document.querySelectorAll(".header-close-btn");
const overlay = document.querySelector(".overlay");
const modal = new Modal(overlay);
document.addEventListener("DOMContentLoaded", e => {
    const imageURL = localStorage.getItem("qrcode-image");
    (imageURL && module.displayImage(imageURL));
});
showInput.addEventListener("click", e => {
    modal.openModal("Enter Data", "", "generate-qrcode");
});
footerButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const modalElement = footerButton.closest(".modal");
    if (footerButton.dataset.btnType == "close") {
        modal.closeModal(modalElement);
    }
    else {
        const modalBody = document.querySelector(".modal-body");
        const grCodeData = modalBody.textContent;
        if (grCodeData !== "") {
            yield Helpers.generateQRCode(grCodeData, module);
            modal.closeModal(modalElement);
        }
        else {
            modal.closeModal(modalElement);
            modal.openModal("Error", "Enter a value", "error");
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
downloadBtn.addEventListener("click", e => {
    const imageURL = localStorage.getItem("qrcode-image");
    if (imageURL) {
        Helpers.downloadImage(imageURL);
    }
    else {
        modal.openModal("Error", "Generate QR Code First", "error");
    }
});
resetBtn.addEventListener("click", e => {
    module.toggleSomething(false);
    localStorage.removeItem("qrcode-image");
});

import { Helpers, DecodeModule, Modal } from "./modules/modules.js";
import Services from "./Services/Services.js";

const imageFile = document.querySelector("#image-file") as HTMLInputElement;
const decodeBtn = document.querySelector("#decode-btn") as HTMLButtonElement;
const browseBtn = document.querySelector("#browse-btn") as HTMLButtonElement;
const resetBtn = document.querySelector("#reset-btn") as HTMLButtonElement;
const services:Services = new Services();
const dropArea = document.querySelector(".drop-area") as HTMLDivElement;
const dropAreaTitle = document.querySelector(".drop-area-title") as HTMLHeadingElement;
const OR = document.querySelector("#OR") as HTMLSpanElement;
const imagePreview = document.querySelector("#image-preview") as HTMLImageElement;
const module = new DecodeModule({
    dropArea,
    imagePreview,
    browseBtn,
    dropAreaTitle,
    OR
});
const footerButton = document.querySelector(".footer-btn") as HTMLButtonElement;
const headerCloseButton:NodeListOf<HTMLButtonElement> = document.querySelectorAll(".header-close-btn");
const overlay = document.querySelector(".overlay") as HTMLDivElement;
const modal:Modal = new Modal(overlay);

document.addEventListener("DOMContentLoaded",e => {
    const imageURL = localStorage.getItem("imageFile");
    imageURL && module.displayImage(imageURL);   
});

footerButton.addEventListener('click',async e => {
    const modalElement = footerButton.closest(".modal") as HTMLDivElement;
    if(footerButton.dataset.btnType == "close"){
        modal.closeModal(modalElement);
    }else {
        const modalBody = document.querySelector(".modal-body") as HTMLDivElement;
        const copied = await Helpers.copyToClipBoard(modalBody.textContent as string);
        if(!copied){
            modal.closeModal(modalElement);
            modal.openModal("Error","Text Was Not Copied","error")
        }
    }  
});

headerCloseButton.forEach(button => {
    button.addEventListener('click',e => {
        const modalElement = button.closest(".modal") as HTMLDivElement;
        modal.closeModal(modalElement);
    });
});

overlay.addEventListener('click',e => {
    const modals: NodeListOf<HTMLDivElement> = document.querySelectorAll(".modal.active");
    modals.forEach((modalElement) => modal.closeModal(modalElement));
});

dropArea.addEventListener("dragover",e => {
    e.preventDefault();
    dropAreaTitle.textContent = "Release Here";
    dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", (e) => {
    dropAreaTitle.textContent = "Drag & Drop QRCode Here";
    dropArea.classList.remove("active");
});

dropArea.addEventListener("drop",async (e) => {
    e.preventDefault();
    const file: File = e.dataTransfer!.files[0];
    if(!module.saveFileAndSetPreview(file)){
        dropAreaTitle.textContent = "Drag & Drop QRCode Here";
        modal.openModal("Error", "image is not valid");
    }
});

browseBtn.addEventListener("click", e => imageFile.click());

imageFile.addEventListener("change",e => {
    const file: File = imageFile.files![0];
    (!module.saveFileAndSetPreview(file) && modal.openModal("Error", "image is not valid"));
});

decodeBtn.addEventListener("click", async e => {
    const imageUrl = localStorage.getItem("imageFile")!;
    if(imageUrl){
        const file = await Helpers.convertURLToFile(imageUrl);        
        const decodedData = await Helpers.decodeQRCode(file);
        const result = (await decodedData).message;
        modal.openModal("Decoded Result", result,"normal");
    }else {
        modal.openModal("Decoded Result", "No file selected");
    }
});

resetBtn.addEventListener("click",e => {
    dropAreaTitle.textContent = "Drag & Drop QRCode Here";
    module.toggleDropAreaElements();
    imageFile.value = "";
    localStorage.removeItem("imageFile");
});
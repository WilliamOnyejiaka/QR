import Services from "./Services/Services.js";
import { Helpers, GenerateQRCodeModule,Modal } from "./modules/modules.js";

const showInput = document.querySelector("#show-input") as HTMLButtonElement;
const resetBtn = document.querySelector("#reset-btn") as HTMLButtonElement;
const imagePreview = document.querySelector("#image-preview") as HTMLImageElement;
const downloadBtn = document.querySelector("#download-btn") as HTMLButtonElement;
const defaultText = document.querySelector("#default-text") as HTMLHeadingElement;
const services:Services = new Services();
const module: GenerateQRCodeModule = new GenerateQRCodeModule({
    imagePreview:imagePreview,
    defaultText:defaultText
});

const footerButton = document.querySelector(".footer-btn") as HTMLButtonElement;
const headerCloseButton:NodeListOf<HTMLButtonElement> = document.querySelectorAll(".header-close-btn");
const overlay = document.querySelector(".overlay") as HTMLDivElement;
const modal:Modal = new Modal(overlay);


document.addEventListener("DOMContentLoaded",e => {
    const imageURL = localStorage.getItem("qrcode-image");
    (imageURL && module.displayImage(imageURL));
});

showInput.addEventListener("click",e => {
    modal.openModal("Enter Data", "", "generate-qrcode");
})

footerButton.addEventListener('click',async e => {
    const modalElement = footerButton.closest(".modal") as HTMLDivElement;
    if(footerButton.dataset.btnType == "close"){
        modal.closeModal(modalElement);
    }else {
        const modalBody = document.querySelector(".modal-body")! as HTMLDivElement;
        const grCodeData = modalBody.textContent;
        if(grCodeData !== ""){
            await Helpers.generateQRCode(grCodeData as string,module);
            modal.closeModal(modalElement);
        }else {
            modal.closeModal(modalElement);
            modal.openModal("Error","Enter a value","error");
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

downloadBtn.addEventListener("click", e => {
    const imageURL = localStorage.getItem("qrcode-image")!;
    if(imageURL){
        Helpers.downloadImage(imageURL);
    }else {
        modal.openModal("Error", "Generate QR Code First","error");
    }
});


resetBtn.addEventListener("click",e => {
    module.toggleSomething(false);
    localStorage.removeItem("qrcode-image");
});
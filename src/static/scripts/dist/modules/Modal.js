export default class Modal {
    constructor(overlay) {
        this.overlay = overlay;
    }
    openModal(title, bodyContent, type = "error") {
        const modal = document.querySelector("#modal");
        const modalBody = modal.querySelector(".modal-body");
        const footerButton = modal.querySelector(".footer-btn");
        if (type === "normal") {
            modal.style.background = "#5256ad";
            modalBody.setAttribute("contenteditable", false);
            footerButton.setAttribute("data-btn-type", "copy");
            footerButton.textContent = "Copy";
        }
        else if (type === "error") {
            modal.style.background = "red";
            modalBody.setAttribute("contenteditable", false);
            footerButton.setAttribute("data-btn-type", "close");
            footerButton.textContent = "Close";
        }
        else if (type === "generate-qrcode") {
            modal.style.background = "#5256ad";
            modalBody.setAttribute("contenteditable", "true");
            footerButton.setAttribute("data-btn-type", "generate-qrcode");
            footerButton.textContent = "Generate QRcode";
        }
        else {
            console.error("error in modal type");
        }
        modal.querySelector(".modal-title").textContent = title;
        modalBody.textContent = bodyContent;
        modal.classList.add("active");
        this.overlay.classList.add("active");
    }
    closeModal(modal) {
        if (!modal)
            return;
        modal.classList.remove("active");
        this.overlay.classList.remove("active");
    }
}

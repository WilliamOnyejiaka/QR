

export default class Modal {

    private overlay:HTMLDivElement;

    public constructor(overlay:HTMLDivElement){
        this.overlay = overlay;
    }

    public openModal(title:string,bodyContent:string,type:string="error"){
        const modal = document.querySelector("#modal") as HTMLDivElement;
        const modalBody = modal.querySelector(".modal-body") as HTMLDivElement;
        const footerButton = modal.querySelector(".footer-btn") as HTMLDivElement;
        if(type === "normal"){
            modal.style.background = "#5256ad";
            modalBody.setAttribute("contenteditable", false as any);
            footerButton.setAttribute("data-btn-type","copy");
            footerButton.textContent = "Copy";
        }else if(type === "error"){
            modal.style.background = "red";
            modalBody.setAttribute("contenteditable", false as any);
            footerButton.setAttribute("data-btn-type", "close");
            footerButton.textContent = "Close";
        }else if(type === "generate-qrcode"){
            modal.style.background = "#5256ad";
            modalBody.setAttribute("contenteditable", "true");
            footerButton.setAttribute("data-btn-type", "generate-qrcode");
            footerButton.textContent = "Generate QRcode";
        }else {
            console.error("error in modal type");
        }
        modal.querySelector(".modal-title")!.textContent = title;
        modalBody.textContent = bodyContent;
        modal.classList.add("active");
        this.overlay.classList.add("active");       
    }

    public closeModal(modal:HTMLDivElement):void{
        if(!modal) return;
        modal.classList.remove("active");
        this.overlay.classList.remove("active");
    }
}   
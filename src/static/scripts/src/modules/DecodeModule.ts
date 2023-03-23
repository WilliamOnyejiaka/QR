import {Helpers} from "./modules.js"



interface Selectors {
    dropArea:HTMLDivElement,
    imagePreview:HTMLImageElement,
    browseBtn:HTMLButtonElement,
    dropAreaTitle:HTMLHeadingElement,
    OR:HTMLSpanElement,
}

export default class DecodeModule {

    private dropArea:HTMLDivElement;
    private imagePreview:HTMLImageElement;
    private browseBtn:HTMLButtonElement;
    private dropAreaTitle:HTMLHeadingElement;
    private OR:HTMLSpanElement;

    public constructor(selectors:Selectors){
        this.dropArea = selectors.dropArea;
        this.imagePreview = selectors.imagePreview;
        this.browseBtn = selectors.browseBtn;
        this.dropAreaTitle = selectors.dropAreaTitle;
        this.OR = selectors.OR;
    }

    public toggleDropAreaElements(activate:boolean=true){
        if(activate){
            this.dropAreaTitle.classList.add("active");
            this.OR.classList.add("active");
            this.browseBtn.classList.add("active");
            this.imagePreview.classList.remove("active");
            this.dropArea.classList.remove("active");
        }else {
            this.dropAreaTitle.classList.remove("active");
            this.OR.classList.remove("active");
            this.browseBtn.classList.remove("active");
            this.imagePreview.classList.add("active");
            this.dropArea.classList.add("active");
        }
    }

    public saveFileAndSetPreview(file:File){
        const imageIsValid = Helpers.validImage(file.type);
        if(imageIsValid){
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener("load",async () => {
                const result = reader.result;
                localStorage.setItem("imageFile", result  as string);
                this.displayImage(result);

            });
            return true;
        }
        return false;
    }

    public displayImage(imageURL:any):void{
        this.imagePreview.setAttribute("src", imageURL);
        this.toggleDropAreaElements(false);
    }
}


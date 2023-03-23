
interface Selectors {
    imagePreview:HTMLImageElement,
    defaultText:HTMLHeadingElement
}

export default class GenerateQRCodeModule {

    private imagePreview:HTMLImageElement;
    private defaultText:HTMLHeadingElement;

    public constructor(selectors:Selectors){
        this.imagePreview = selectors.imagePreview;
        this.defaultText = selectors.defaultText;
    }

    public saveFileAndSetPreview(blob:Blob){
        const file = new File([blob],'image',{type:blob.type});
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.addEventListener("load", () =>{
            const result = reader.result;        
            localStorage.setItem("qrcode-image",result as string);
            this.displayImage(result as string);
        });
    }

    public displayImage(imageURL:string){
        this.imagePreview.setAttribute("src", imageURL);
        this.toggleSomething(true);
    }

    public toggleSomething(active:boolean=true){
        if(active){
            this.defaultText.classList.add("active");
            this.imagePreview.classList.add("active");
        }else {
            this.defaultText.classList.remove("active");
            this.imagePreview.classList.remove("active");
        }
    }


}
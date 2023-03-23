import Services from "./../Services/Services.js";
import GenerateQRCodeModule from "./GenerateQRCodeModule.js";

export default class Helpers {

    public static async convertURLToFile(url:string){
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], "image", { type: blob.type });
    }

    public static validImage(fileType:string){
        const validImageTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];
        return validImageTypes.includes(fileType) ? true : false;
    }

    public static async decodeQRCode(file:File){
        const formData: FormData = new FormData();
        formData.append("image_file", file);
        return await (new Services()).decode(formData);
    }

    public static downloadImage(URL:string){
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = URL;
        anchor.download = "qrcode";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    public static async generateQRCode(qrCodeData: string,module:GenerateQRCodeModule){
        const services = new Services();
        const data: any = await services.generateQRCode(qrCodeData);
        const imageName: string = data.image_name;
        const imageBlob = await services.getImageBlob(imageName);
        module.saveFileAndSetPreview(imageBlob);
        await services.deleteImage(imageName);
    }
    public static async copyToClipBoard(text:string){
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
    }
}
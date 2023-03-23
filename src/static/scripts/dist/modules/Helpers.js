var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Services from "./../Services/Services.js";
export default class Helpers {
    static convertURLToFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url);
            const blob = yield response.blob();
            return new File([blob], "image", { type: blob.type });
        });
    }
    static validImage(fileType) {
        const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];
        return validImageTypes.includes(fileType) ? true : false;
    }
    static decodeQRCode(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append("image_file", file);
            return yield (new Services()).decode(formData);
        });
    }
    static downloadImage(URL) {
        const anchor = document.createElement("a");
        anchor.href = URL;
        anchor.download = "qrcode";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }
    static generateQRCode(qrCodeData, module) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = new Services();
            const data = yield services.generateQRCode(qrCodeData);
            const imageName = data.image_name;
            const imageBlob = yield services.getImageBlob(imageName);
            module.saveFileAndSetPreview(imageBlob);
            yield services.deleteImage(imageName);
        });
    }
    static copyToClipBoard(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield navigator.clipboard.writeText(text);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}

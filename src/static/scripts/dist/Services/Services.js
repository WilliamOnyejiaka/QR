var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Services {
    constructor() {
        this.baseURL = window.location.origin;
    }
    generateQRCode(qrCodeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseURL}/api/v1/image/generate-qrcode`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    data: qrCodeData
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
            return yield response.json();
        });
    }
    getImageBlob(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseURL}/api/v1/image/get-image/${imageName}`);
            return yield response.blob();
        });
    }
    deleteImage(imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseURL}/api/v1/image/delete-qr/${imageName}`, { method: "DELETE" });
            return yield response.json();
        });
    }
    decode(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseURL}/api/v1/image/decode`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            return yield response.json();
        });
    }
}

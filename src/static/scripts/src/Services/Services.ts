
export default class Services {

    private baseURL:string = window.location.origin;

    public async generateQRCode(qrCodeData:string){
        const response = await fetch(`${this.baseURL}/api/v1/image/generate-qrcode`,{
            method:"POST",
            credentials:"include",
            body:JSON.stringify({
                data:qrCodeData
            }),
            headers: {
                "content-type": "application/json",
            },
        });

        return await response.json();
    }

    public async getImageBlob(imageName:string){
        const response = await fetch(`${this.baseURL}/api/v1/image/get-image/${imageName}`);
        return await response.blob();
    }

    public async deleteImage(imageName:string){
        const response = await fetch(`${this.baseURL}/api/v1/image/delete-qr/${imageName}`,{ method:"DELETE"});
        return await response.json();
    }

    public async decode(formData:FormData){
        const response = await fetch(`${this.baseURL}/api/v1/image/decode`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return await response.json();
    }
}
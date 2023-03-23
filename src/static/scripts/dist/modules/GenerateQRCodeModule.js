export default class GenerateQRCodeModule {
    constructor(selectors) {
        this.imagePreview = selectors.imagePreview;
        this.defaultText = selectors.defaultText;
    }
    saveFileAndSetPreview(blob) {
        const file = new File([blob], 'image', { type: blob.type });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            const result = reader.result;
            localStorage.setItem("qrcode-image", result);
            this.displayImage(result);
        });
    }
    displayImage(imageURL) {
        this.imagePreview.setAttribute("src", imageURL);
        this.toggleSomething(true);
    }
    toggleSomething(active = true) {
        if (active) {
            this.defaultText.classList.add("active");
            this.imagePreview.classList.add("active");
        }
        else {
            this.defaultText.classList.remove("active");
            this.imagePreview.classList.remove("active");
        }
    }
}

class Popup{
    constructor(){
        // load elements
        this.addBtn = document.getElementById("add-expense");
        this.closeBtn = document.getElementById("close-popup-btn");
        this.popup = document.querySelector(".add-item-popup");

        // make listeners
        this.addBtn.addEventListener("click", () => this.openPopup());
        this.closeBtn.addEventListener("click", () => this.closePopup());
    }

    // open popup
    openPopup() {
        this.popup.style.display = "block";
    }

    // close popup
    closePopup() {
        this.popup.style.display = "none";
    }
}

export default Popup;
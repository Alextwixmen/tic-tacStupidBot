class Draw {
  constructor(typeOfPicture, src, width, height) {
    this.typeOfPicture = typeOfPicture;
    this.src = src;
    this.width = width;
    this.height = height;
  }
  drawMethod() {
    this.typeOfPicture = document.createElement("img");
    this.typeOfPicture.src = this.src;
    this.typeOfPicture.style.height = this.height;
    this.typeOfPicture.style.width = this.width;
    return this.typeOfPicture;
  }
}
export default Draw;

const ua = window.navigator.userAgent.toLowerCase();
if (ua.indexOf("chrome") === -1) {
	window.alert("google chrome以外のブラウザをご利用のようです。一部の機能がご利用できない場合がございますのでご注意ください。")
}

const uploadFile = document.getElementById('uploadFile');
const canvasPreview = document.getElementById('canvasPreview');
const toPng = document.getElementById('toPng');
const toJpeg = document.getElementById('toJpeg');
const toWebp = document.getElementById('toWebp');
const toGif = document.getElementById('toGif');
let convertBtn = document.getElementsByClassName("convertBtn");

uploadFile.addEventListener('change', function () {
	console.log("変わったよ");

	for (let i = 0; i < convertBtn.length; i++) {
		convertBtn[i].classList.remove("disable");
	}
	let file = this.files[0];
	if (!file.type.match(/^image\/(png|jpeg|jpg|gif|webp)$/)) {
		window.alert("入力できるファイルタイプはpng, jpeg, gif, webpのみです")
		return;
	} else {
		switch (file.type) {
			case "image/png":
				toPng.classList.add("disable");
				break;
			case "image/jpg":
			case "image/jpeg":
				toJpeg.classList.add("disable");
				break;
			case "image/gif":
				toGif.classList.add("disable");
				break;
			case "image/webp":
				toWebp.classList.add("disable");
				break;
		}
	}
	let image = new Image(),
		reader = new FileReader();

	reader.onload = function (evt) {
		image.onload = function () {
			canvasPreview.width = image.width;
			canvasPreview.height = image.height;

			let ctx = canvasPreview.getContext("2d");
			ctx.drawImage(image, 0, 0);
		}

		let result = evt.target.result
		image.src = result.toString();
	}
	reader.readAsDataURL(file);
});

const convertToImg = function(e) {
	let dataFormat = "image/" + this.imageType;
	let convertedResult = canvasPreview.toDataURL(dataFormat, 1.0);

	let link = document.createElement('a');
	link.download = "download."+this.imageType;
	link.href = convertedResult;
	link.click();
}

toPng.addEventListener('click', {imageType:"png", handleEvent:convertToImg});
toJpeg.addEventListener('click', {imageType:"jpg", handleEvent:convertToImg});
toWebp.addEventListener('click', {imageType:"webp", handleEvent:convertToImg});
toGif.addEventListener('click', {imageType:"gif", handleEvent:convertToImg});

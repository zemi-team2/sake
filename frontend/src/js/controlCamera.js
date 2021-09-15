/**
 * クライアントのカメラで撮影する関数
 * shutter_buttonを押すと撮影し、up_load_buttonで決定
 * @param  {String} videoId           カメラが映し出す映像を表示する<video>タグのid
 * @param  {String} canvasId          撮影した結果を表示する<canvas>タグのid
 * @param  {String} shutterButtonId   撮影を開始するボタンのid
 * @return {void}
 */
function controlCamera(videoId, canvasId, shutterButtonId) {
  window.onload = () => {
    const video = document.getElementById(videoId);
    const canvas = document.getElementById(canvasId);

    // カメラの設定
    const constraints = {
      audio: false,
      video: {
        width: { min: 800, max: 1920 }, // カメラの解像度を設定
        height: { min: 600, max: 1080 },
        facingMode: "user", // フロントカメラを利用
        // facingMode: {exact: "environment"}, //リアカメラを利用
      },
    };

    // カメラを<video>と同期
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });

    // 撮影ボタンが押されたときのイベント処理（<video>の1フレームを<canvas>に表示）
    document
      .getElementById(shutterButtonId)
      .addEventListener("click", () => {
        video.style.display = ""; // <video>タグを表示
        const canvasContext = canvas.getContext("2d");
        const w = video.offsetWidth;
        const h = video.offsetHeight;
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        canvasContext.drawImage(video, 0, 0, w, h);
      });
  };
}

/**
 * カメラで撮影した画像をサーバーに送信する関数
 * uploadボタンを押すとサーバー画像を送信する
 * @param  {String} videoId           カメラが映し出す映像を表示する<video>タグのid
 * @param  {String} canvasId          撮影した結果を表示する<canvas>タグのid
 * @param  {String} uploadButtonId    撮影した画像を送信するボタンのid
 * @return {void}
 */

function uploadImageToServer(videoId, canvasId, uploadButtonId) {
  // 送信ボタンが押されたときのイベント処理（<canvasの画像を送信できる形式に変換して、画像処理サーバーに送信>）
  const uploadButton = document.getElementById(uploadButtonId)
  const video = document.getElementById(videoId);
  const canvas = document.getElementById(canvasId);

  uploadButton.addEventListener("click", () => {
    // 画像をbase64に変換
    const video = document.querySelector(`#${videoId}`);
    const canvas = document.querySelector(`#${canvasId}`);
    const imageBase64 = canvas.toDataURL("image/png");
    video.style.display = "none"; // <video>タグを非表示
    const formData = new FormData();
    formData.append("img", imageBase64);
    // console.log(`image: ${imageBase64}`);

    // 画像をPOST方式で送信 url：http://127.0.0.1:8000/imageProcessing
    axios
      .post("http://127.0.0.1:8000/imageProcessing", formData)
      .then((res) => {
        // 通信成功時の処理
        console.log(`Success ${res.data.out1}`);
        console.log(`Success ${res.data.out2}`);
      })
      .catch((err) => {
        // 通信失敗時の処理
        console.error(`Error: ${err}`);
      });
  });
}

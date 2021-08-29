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
    const video = document.querySelector(`#${videoId}`);
    const canvas = document.getElementById(canvasId);

    /* カメラの設定 */
    const constraints = {
      audio: false,
      video: {
        width: { min: 800, max: 1920 }, // カメラの解像度を設定
        height: { min: 600, max: 1080 },
        facingMode: "user", // フロントカメラを利用
        // facingMode: {exact: "environment"}, //リアカメラを利用
      },
    };

    /**
     *  カメラを<video>と同期
     */
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

    /**
     *  撮影ボタン(ボタンが押された時の<video>の1フレームを<canvas>に表示)
     */
    document
      .querySelector(`#${shutterButtonId}`)
      .addEventListener("click", () => {
        video.style.display = ""; // <video>タグを表示
        const ctx = canvas.getContext("2d");
        const w = video.offsetWidth;
        const h = video.offsetHeight;
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        ctx.drawImage(video, 0, 0, w, h);
      });
  };
}

/**
 * カメラで撮影した画像をサーバーに送信する関数
 * uploadボタンを押すとサーバー画像を送信する
 * @param  {String} videoId           カメラが映し出す映像を表示する<video>タグのid
 * @param  {String} canvasId          撮影した結果を表示する<canvas>タグのid
 * @param  {String} shutterButtonId   撮影を開始するボタンのid
 * @param  {String} uploadButton      撮影した画像を送信するボタンのid
 * @return {any}                      画像の処理結果を出力(予定)
 */

function upLoadImageServer(videoId, canvasId, uploadButtonId) {
  /**
   *  送信ボタンが押された時<canvas>の画像をbase64に変換
   */
  let imageBase64;
  document.querySelector(`#${uploadButtonId}`).addEventListener("click", () => {
    const video = document.querySelector(`#${videoId}`);
    const canvas = document.querySelector(`${canvasId}`);
    imageBase64 = canvas.toDataURL("image/png");
    video.style.display = "none"; // <video>タグを非表示
  });

  // これ以降にアップロードする処理を書いていく
  console.log("image uploded.");
}

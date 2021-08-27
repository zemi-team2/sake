/**
 * クライアントのカメラで撮影する関数
 * shutter_buttonを押すと撮影し、up_load_buttonで決定
 * @param  {String} video_id            カメラが映し出す映像を表示する<video>タグのid
 * @param  {String} canvas_id           撮影した結果を表示する<canvas>タグのid
 * @param  {String} shutter_button_id   撮影を開始するボタンのid
 * @param  {String} up_load_button      撮影した画像を決定するボタンのid
 * @return {String}                     base64形式の画像（これは、2021年8月28日時点では変更の可能性あり）
 */
function control_camera(video_id, canvas_id, shutter_button_id, up_load_button) {

    window.onload = () => {
        const video = document.querySelector("#" + video_id);

        /* カメラの設定 */
        const constraints = {
            audio: false,
            video: {
                width: { min: 800, max: 1920 }, //カメラの解像度を設定
                height: { min: 600, max: 1080 },
                facingMode: "user" //フロントカメラを利用
                // facingMode: {exact: "enviroment"}, //リアカメラを利用
            }
        };

        /**
         *  カメラを<video>と同期 
         */
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                video.srcObject = stream;
                video.onloadedmetadata = (e) => {
                    video.play();
                };
            })
            .catch((err) => {
                console.err(err.name + ": " + err.message);
            });

        /**
         *  撮影ボタン
         */
        document.querySelector("#" + shutter_button_id).addEventListener("click", () => {

            video.style.display = ''
            var canvas = document.getElementById(canvas_id);
            var ctx = canvas.getContext('2d');
            var w = video.offsetWidth;
            var h = video.offsetHeight;
            canvas.setAttribute('width', w);
            canvas.setAttribute('height', h);
            ctx.drawImage(video, 0, 0, w, h);

        });

        /**
         *  決定ボタン
         */
        document.querySelector("#" + up_load_button).addEventListener("click", () => {

            var image_base64 = canvas.toDataURL('image/png');
            alert("撮影が完了したよ！！")
            video.style.display = 'none'
            return image_base64;
        });
    };

    return 0;
}

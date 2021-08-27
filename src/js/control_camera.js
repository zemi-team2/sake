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
         * シャッターボタン
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

        document.querySelector("#" + up_load_button).addEventListener("click", () => {

            var image_base64 = canvas.toDataURL('image/png');
            alert("撮影が完了したよ！！")
            video.style.display = 'none'
            return image_base64;
        });
    };

    return 0;
}
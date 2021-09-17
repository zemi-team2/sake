from flask import Flask, request, render_template
import base64
from PIL import Image
from io import BytesIO
import numpy as np

# Flaskの設定
template_dir = "/sake/frontend/src/html"
static_dir = "/sake/frontend/src"
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

IMAGE = None  # 撮影した画像を格納する変数


# トップページ
@app.route("/")
def index():
    return render_template("index.html")


# 撮影した画像を変数に格納してプレビュー画面を表示
@app.route("/previewImage", methods=["POST"])
def image_preview():

    # 撮影した画像をデコード
    global IMAGE
    enc_img = request.form["image"]
    IMAGE = base64.b64decode(enc_img.split(",")[1])

    return render_template("preview.html", shotImage=enc_img)


# 撮影した画像を基に画像処理を行って結果画面を表示
@app.route("/result")
def result():
    # デコードした画像を読み込んでnumpyに変換
    img_pil = Image.open(BytesIO(IMAGE))
    image_np = np.array(img_pil)
    print(image_np)
    # これ以降に画像の処理を書いていく...

    return "result"


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True,
    )

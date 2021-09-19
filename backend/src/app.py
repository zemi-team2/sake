from flask import Flask, request, render_template
import base64
from PIL import Image
from io import BytesIO
import numpy as np

# Flaskの設定
template_dir = "/sake/frontend/src/html"
static_dir = "/sake/frontend/src"
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)


# トップページ
@app.route("/")
def index():
    return render_template("index.html")


# 撮影した画像を変数に格納してプレビュー画面を表示
@app.route("/previewImage", methods=["POST"])
def image_preview():

    # 撮影した画像をデコード

    return render_template("preview.html", shotImage=request.form["image"])


# 撮影した画像を基に画像処理を行って結果画面を表示
@app.route("/result", methods=["POST"])
def result():
    # デコードした画像を読み込んでnumpyに変換
    print(request.form["image"])
    img_base64 = request.form["image"]  # 画像（base64）
    image_binary = base64.b64decode(img_base64.split(",")[1])  # 画像（バイナリデータ）
    img_pil = Image.open(BytesIO(image_binary))  # 画像（pillow）
    image_np = np.array(img_pil)  # 画像（numpy）
    print(image_np)
    # これ以降に画像の処理を書いていく...

    onclick_elem = "location.href='/'"
    img_tag = '<img src="{0}" width="{1}"/>'.format(img_base64, "50%")
    btn_tag = '<button type="button" onclick="{0}">戻る</button>'.format(
        onclick_elem)
    return img_tag + btn_tag


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

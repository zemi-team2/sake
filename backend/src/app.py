from flask import Flask, request, jsonify, after_this_request, render_template
import base64
from PIL import Image
from io import BytesIO
import numpy as np

template_dir = "/sake/frontend/src/html"
static_dir = "/sake/frontend/src/js"
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/imageProcessing", methods=["POST"])
def image_detection():
    @after_this_request
    def add_header(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    enc_data = request.form["img"]
    dec_data = base64.b64decode(enc_data.split(",")[1])
    img_pil = Image.open(BytesIO(dec_data))
    img_np = np.array(img_pil)

    print(img_np)
    # img_pil.save("image.png", quality=95)

    # これ以降に画像処理を書いていく

    return jsonify(out1=1, out2="text")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

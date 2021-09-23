from google.cloud import vision
import os
import io


def detect_text(content):
    os.environ[
        "GOOGLE_APPLICATION_CREDENTIALS"
    ] = "backend/src/steel-beanbag-325001-9c2e34ccd8b7.json"

    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()

    # with io.open(path, "rb") as image_file:
    #     content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    # 結果を保存するtestを用意する
    OCR_result = ""

    for text in texts:
        print('\n"{}"'.format(text.description))
        OCR_result += text.description

        # 画像内の文字の位置情報を出力
        # vertices = (['({},{})'.format(vertex.x, vertex.y)
        #             for vertex in text.bounding_poly.vertices])
        # print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(
                response.error.message)
        )

    # 全部小文字に変換し、結果を返す type:str
    label = find_keyword(OCR_result.lower())
    if label == -1:
        label = detect_labels(content)
    print("label: {0}".format(label))

    return label


def find_keyword(OCR_result):

    # 分類リスト 識別が出来てない:-1 ウィスキー:0 ビール:1 ジン:2 ウォッカ:3 ワイン:4
    whiskey_k = ["ウィスキー", "whiskey", "whisky"]
    beer_k = ["ビール", "beer", "発泡酒", "発泡性", "発泡", "生ビー"]
    gin_k = ["gin", "ジン"]
    vodka_k = ["vodka", "ウォッカ"]

    sake_keywords = [whiskey_k, beer_k, gin_k, vodka_k]

    for id, keyword_list in enumerate(sake_keywords):
        for keyword in keyword_list:
            if OCR_result.find(keyword) != -1:
                return id

    # for k in whiskey_k:
    #     if OCR_result.find(k) != -1:
    #         return 0

    # for k in beer_k:
    #     if OCR_result.find(k) != -1:
    #         return 1

    # for k in gin_k:
    #     if OCR_result.find(k) != -1:
    #         return 2

    # for k in vodka_k:
    #     if OCR_result.find(k) != -1:
    #         return 3

    return -1


# ワインのラベルの識別
def detect_labels(content):
    """Detects labels in the file."""
    client = vision.ImageAnnotatorClient()

    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print("Labels:")

    text = ""
    for label in labels:
        print(label.description)
        text += label.description

    if response.error.message:

        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(
                response.error.message)
        )

    if text.find("Wine") != -1:
        return 4
    elif text.find("Beer") != -1:
        return 1
    else:
        return -1


if __name__ == "__main__":
    path = "backend/src/images/japanese-whiskey.jpg"
    file_list = []
    labels = []

    dir_path = "backend/src/images"
    for dir in os.listdir(dir_path):
        file_list.append(os.path.join(dir))

    print("###########################################")
    for file in file_list:
        print("image: {0}".format(file))
        with io.open(path, "rb") as image_file:
            content = image_file.read()
        labels.append(detect_text(content))
        print("###########################################")

    for file, label in zip(file_list, labels):
        print("image: {0} label: {1}".format(file, label))

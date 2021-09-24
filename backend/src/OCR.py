from google.cloud import vision
import os
import io


# visionAIで酒の種類を推定する関数
def detect_sake(content):

    """
    バイナリ形式の画像を入力して酒を検出してラベルを出力

    Parameters
    ----------
    content : <class 'bytes'>
        画像のバイナリデータ

    Returns
    -------
    label : int
        酒のラベル（-1 ～ 4）

    Notes
    -----
    分類リスト:
        識別が出来てない:-1
        ウィスキー:0
        ビール:1
        ジン:2
        ウォッカ:3
        ワイン:4
    """

    os.environ[
        "GOOGLE_APPLICATION_CREDENTIALS"
    ] = "backend/src/steel-beanbag-325001-9c2e34ccd8b7.json"

    image = vision.Image(content=content)
    label = detect_text(image)

    if label != -1:
        print("label: {0}".format(label))
        return label
    elif label == -1:
        label = detect_labels(image)
        print("label: {0}".format(label))
        return label


# OCRで推定する関数（ワイン以外に対応）
def detect_text(image):

    """
    OCRで酒のラベルを検出して出力

    Parameters
    ----------
    image :  <class 'google.cloud.vision_v1.types.image_annotator.Image'>
        visionAIのサーバに送信する画像フォーマット

    Returns
    -------
    label : int
        酒のラベル（-1 ～ 4）

    Notes
    -----
    分類リスト:
        識別が出来てない:-1
        ウィスキー:0
        ビール:1
        ジン:2
        ウォッカ:3
        ワイン:4
    """

    client = vision.ImageAnnotatorClient()
    print("type: {0}".format(type(image)))
    response = client.text_detection(image=image)
    texts = response.text_annotations

    # 結果を保存するtestを用意する
    OCR_result = ""  # 結果を格納する変数:w

    for text in texts:
        print('\n"{}"'.format(text.description))
        OCR_result += text.description

    if response.error.message:
        raise Exception(
            "{0}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(
                response.error.message,
            )
        )

    # 全部小文字に変換して、ラベルを返す type:str
    label = find_keyword(OCR_result.lower())
    return label


# OCRで取得したテキストからキーワードを検出してラベルを決定する関数
def find_keyword(OCR_result):

    """
    OCRで取得したテキストからキーワードを検出してラベルを決定する関数

    Parameters
    ----------
    OCR_result : list(str)
        OCRで検出した文字列のリスト

    Returns
    -------
    label : int
        酒のラベル（-1 ～ 4）

    Notes
    -----
    分類リスト:
        識別が出来てない:-1
        ウィスキー:0
        ビール:1
        ジン:2
        ウォッカ:3
        ワイン:4
    """

    # 分類リスト 識別が出来てない:-1 ウィスキー:0 ビール:1 ジン:2 ウォッカ:3 ワイン:4
    # 各ラベルのキーワードリスト
    whiskey_k = ["ウィスキー", "whiskey", "whisky"]
    beer_k = ["ビール", "beer", "発泡酒", "発泡性", "発泡", "生ビー"]
    gin_k = ["gin", "ジン"]
    vodka_k = ["vodka", "ウォッカ"]

    sake_keywords = [whiskey_k, beer_k, gin_k, vodka_k]

    for sake_id, keyword_list in enumerate(sake_keywords):
        for keyword in keyword_list:
            if OCR_result.find(keyword) != -1:
                return sake_id

    return -1


# visionAIの画像を検出を使ってラベルを検出する関数(ワイン、ビールに対応)
def detect_labels(image):
    """
    visionAIの「画像ラベル検出」を使ってラベルを検出する関数(ワイン、ビールに対応)

    Parameters
    ----------
    image :  <class 'google.cloud.vision_v1.types.image_annotator.Image'>
        visionAIのサーバに送信する画像フォーマット

    Returns
    -------
    label : int
        酒のラベル（-1 ～ 4）

    Notes
    -----
    分類リスト:
        識別が出来てない:-1
        ウィスキー:0
        ビール:1
        ジン:2
        ウォッカ:3
        ワイン:4
    """

    print("execute  detect image label ...")
    client = vision.ImageAnnotatorClient()

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print("Labels:")

    text = ""
    for label in labels:
        print(label.description)
        text += label.description

    if response.error.message:

        raise Exception(
            "{0}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(
                response.error.message,
            )
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
    predict_labels = []
    labels = ["whiskey", "beer", "gin", "vodka", "wine"]

    dir_path = "backend/src/images"
    for dir in os.listdir(dir_path):
        file_list.append(os.path.join(dir_path, dir))
    print(file_list)

    print("###########################################")
    for file in file_list:
        print("image: {0}".format(file))
        with io.open(file, "rb") as image_file:
            content = image_file.read()
        predict_labels.append(detect_sake(content))
        print("###########################################")

    for file, predict_label in zip(file_list, predict_labels):
        if predict_label != -1:
            print(
                "image: {0} label: {1} ({2})".format(
                    file, predict_label, labels[predict_label]
                )
            )
        else:
            print(
                "image: {0} label: {1} (none)".format(
                    file,
                    predict_label,
                )
            )

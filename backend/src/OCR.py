from google.cloud import vision
import os
import io
# 認証情報ファイルの操作-必須!
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '共通ゼミ/xxx.json'
# 検出したいファイルパス
path = "実践ゼミ/019058b_210901.jpg"

# 分類リスト 識別が出来てない:-1 ウィスキー:0 ビール:1 ジン:2 ウォッカ:3 ワイン:4
whiskey_k = ["ウィスキー", "whiskey"]
beer_k = ["ビール", "beer", "発泡酒", "発泡性", "発泡"]
gin_k = ["gin", "ジン"]
vodka_k = ["vodka", "ウォッカ"]


def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    # 結果を保存するtestを用意する
    OCR_result = ''

    for text in texts:
        print('\n"{}"'.format(text.description))
        OCR_result += text.description

        # 画像内の文字の位置情報を出力
        # vertices = (['({},{})'.format(vertex.x, vertex.y)
        #             for vertex in text.bounding_poly.vertices])
        # print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    # 全部小文字に変換し、結果を返す type:str
    label = find_keyword(OCR_result.lower())
    if label == -1:
        label = detect_labels(path)
    print(label)

    return label


def find_keyword(OCR_result):
    for k in whiskey_k:
        if OCR_result.find(k) != -1:
            print(f'[{k}]が見つかりました: {OCR_result.find(k)}')
            return 0

    for k in beer_k:
        if OCR_result.find(k) != -1:
            print(f'[{k}]が見つかりました: {OCR_result.find(k)}')
            return 1

    for k in gin_k:
        if OCR_result.find(k) != -1:
            print(f'[{k}]が見つかりました: {OCR_result.find(k)}')
            return 2

    for k in vodka_k:
        if OCR_result.find(k) != -1:
            print(f'[{k}]が見つかりました: {OCR_result.find(k)}')
            return 3

    return -1


# ワインのラベルの識別
def detect_labels(path):
    """Detects labels in the file."""
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    text = ''
    for label in labels:
        print(label.description)
        text += label.description

    if response.error.message:

        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    if text.find("Wine") != -1:
        return 4
    else:
        return -1


detect_text(path)
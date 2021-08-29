# Docker の動作確認用プログラムです

import requests
from bs4 import BeautifulSoup

load_url = "https://zuma-lab.com"
data = requests.get(load_url)
html = BeautifulSoup(data.content, "html.parser")

for element in html.find_all("h1"):
    print(element.text)

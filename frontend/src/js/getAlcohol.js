const alcohols = [
  {
    name: "ウイスキー",
    drinks: [
      {
        name: "ウイスキーサワー",
        ingredients: "ウイスキー:レモンジュース:砂糖",
        ratio: "45ml:20ml:1tsp",
      },
      {
        name: "ハイボール",
        ingredients: "ウイスキー:ソーダ水",
        ratio: "1:3",
      },
      {
        name: "ウイスキーフロート",
        ingredients: "ウイスキー:ミネラルウォーター",
        ratio: "40ml:適量",
      },
      {
        name: "ゴッドファーザー",
        ingredients: "バランタイン:アマレット",
        ratio: "3:1",
      },
      {
        name: "マミーテイラー",
        ingredients: "ウイスキー:レモンジュース:ジンジャエール",
        ratio: "45ml:20ml:適量",
      },
      {
        name: "バーボンハック",
        ingredients: "メーカーズマーク:ジンジャエール",
        ratio: "30ml:適量",
      },
    ],
    snack: {
      name: "アスパラのチーズ生ハム巻き",
      ingredients: ["アスパラ", "生ハム", "チーズ", "塩"],
      quantity: ["1本", "1枚", "1適量", "適量"],
    },
    storageLocation: "冷蔵庫",
  },
  {
    name: "ビール",
    drinks: [
      {
        name: "レッドアイ",
        ingredients: "ビール:トマトジュース",
        ratio: "1:1",
      },
      {
        name: "シャンディガフ",
        ingredients: "ビール:ジンジャエール",
        ratio: "1:1",
      },
      {
        name: "パナシェ",
        ingredients: "ビール:CCレモン",
        ratio: "1:1",
      },
      {
        name: "ブラックベルベット",
        ingredients: "ビール:シャンパン",
        ratio: "1:1",
      },
    ],
    snack: {
      name: "アスパラのチーズ生ハム巻き",
      ingredients: "アスパラ:生ハム:チーズ:塩",
      quantity: "1本:1枚:1適量:適量",
    },
    storageLocation: "冷蔵庫",
  },
  {
    name: "ジン",
    drinks: [
      {
        name: "オレンジブロッサム",
        ingredients: "ジン:オレンジジュース]",
        ratio: "45ml:適量",
      },
      {
        name: "ギムレット",
        ingredients: "ドライジン:ライムジュース:砂糖",
        ratio: "3:1:1tsp",
      },
      {
        name: "ジントニック",
        ingredients: "ジン:トニックウォーター",
        ratio: "45ml:適量",
      },
      {
        name: "ジンソーダ",
        ingredients: "ジン:ソーダ水",
        ratio: "45ml:適量",
      },
      {
        name: "ドッグスノーズ",
        ingredients: "ジン:ビール",
        ratio: "45ml:適量",
      },
    ],
    snack: {
      name: "生ハムチーズクラッカー",
      ingredients: ["生ハム", "チーズ", "クラッカー"],
      quantity: "それぞれ適量",
    },
    storageLocation: "冷蔵庫",
  },
  {
    name: "ウォッカ",
    drinks: [
      {
        name: "ソルティドッグ",
        ingredients: "ウォッカ:グレープフルーツジュース:塩",
        ratio: "45ml:適量:適量",
      },
      {
        name: "ギムレット",
        ingredients: "ウォッカ:ライムジュース:ジンジャエール",
        ratio: "45ml:15ml:適量",
      },
      {
        name: "ウォッカトニック",
        ingredients: "ウォッカ:トニックウォーター",
        ratio: "1:4",
      },
      {
        name: "ビッグアップル",
        ingredients: "ウォッカ:アップルジュース",
        ratio: "45ml:適量",
      },
      {
        name: "ドッグスノーズ",
        ingredients: "ウォッカ:トマトジュース:ビール",
        ratio: "45ml:60ml:適量",
      },
    ],
    snack: {
      name: "たらこクリームチーズのカナッペ",
      ingredients: ["たらこ", "クリームチーズ", "クラッカー"],
      quantity: ["1本", "50g", "適量"],
    },
    storageLocation: "冷蔵庫",
  },
  {
    name: "ワイン",
    drinks: [
      {
        name: "アップルプラン",
        ingredients: "ルジェグリーンアップル:白ワイン",
        ratio: "4:1",
      },
      {
        name: "カーディナル",
        ingredients: "ルジェクレームドカシス:赤ワイン",
        ratio: "1:4",
      },
      {
        name: "キール",
        ingredients: "ルジェクレームドカシス:白ワイン",
        ratio: "1:4",
      },
      {
        name: "スプリッツァー",
        ingredients: "ソーダ水:白ワイン",
        ratio: "2:3",
      },
      {
        name: "ルジェブルーベリースプリッツァー",
        ingredients: "ルジェクレームドブルーベリー:赤ワイン:ソーダ水",
        ratio: "30ml:45ml:適量",
      },
      {
        name: "ワインクーラー",
        ingredients:
          "赤ワイン:オレンジジュース:グレナデンシロップ:ホワイトキュラソー",
        ratio: "90ml:30ml:15ml:10ml",
      },
    ],
    snack: {
      name: "アスパラのチーズ生ハム巻き",
      ingredients: ["アスパラ", "生ハム", "チーズ", "塩"],
      quantity: ["1本", "1枚", "1適量", "適量"],
    },
    storageLocation: "冷蔵庫",
  },
];

/**
 * ラベルを基にお酒の情報を返す関数
 * @param  {Number} label       ラベル
 * @return {Object} alcoholInfo お酒の情報が入ったオブジェクト
 */
function getAlcohol(label) {
  const alcoholInfo = {
    name: alcohols[label].name,
    drinks: alcohols[label].drinks,
    snack: alcohols[label].snack,
    storageLocation: alcohols[label].storageLocation,
  };

  const alcoholNameElement = document.getElementById("alcohol_name");
  alcoholNameElement.innerHTML = alcoholInfo.name;

  // 割り物に関する処理
  const drinksContainer = document.getElementById("drinks");

  for (let i = 0; i < alcoholInfo.drinks.length; i += 1) {
    const drinkElement = document.createElement("div");
    const drinkNameElement = document.createElement("h3");

    const drinkRatioElement = document.createElement("p");

    drinkNameElement.innerHTML = alcoholInfo.drinks[i].name;
    drinkRatioElement.innerHTML = `${alcoholInfo.drinks[i].ingredients} = ${alcoholInfo.drinks[i].ratio}`;

    drinkElement.appendChild(drinkNameElement);
    drinkElement.appendChild(drinkRatioElement);
    drinksContainer.appendChild(drinkElement);
  }

  // おつまみに関する処理
  const snackNameElement = document.getElementById("snack_name");
  snackNameElement.innerHTML = alcoholInfo.snack.name;

  const snackIngredientsContainer =
    document.getElementById("snack_ingredients");

  for (let i = 0; i < alcoholInfo.snack.ingredients.length; i += 1) {
    const snackIngredientElement = document.createElement("div");
    const snackIngredientNameElement = document.createElement("p");
    const snackIngredientQuantityElement = document.createElement("p");

    snackIngredientNameElement.innerHTML = alcoholInfo.snack.ingredients[i];
    snackIngredientQuantityElement.innerHTML = alcoholInfo.snack.quantity[i];

    snackIngredientElement.appendChild(snackIngredientNameElement);
    snackIngredientElement.appendChild(snackIngredientQuantityElement);
    snackIngredientsContainer.appendChild(snackIngredientElement);
  }

  // 保存方法に関する処理
  const storageLocationElement = document.getElementById("storage_location");
  storageLocationElement.innerHTML = alcoholInfo.storageLocation;
}

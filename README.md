# 胺基酸默寫室 · Amino Lab

專為課堂 Quiz 設計的繁體中文靜態練習網站。無需安裝套件、沒有後端或外部字型，所有資源採相對路徑，可用於 GitHub Pages 專案網站。

## 考試範圍

- 20 種標準胺基酸的英文全名、three-letter code、one-letter code。
- Glycine：完整結構。其餘 19 種：R group 結構。
- 配分：結構 2 分，英文全名、三字母、單字母各 1 分，每題共 5 分。
- Selenocysteine / Sec / U：可選加分練習，另列 0–5 分，老師未提供實際 bonus 配分。

## 功能

- **默寫練習**：以中文名稱提示，填寫英文與代碼，在畫布或紙上作答。
- **結構圖鑑**：依講義分類、搜尋、結構圖與記憶線索；可直接挑題練習。
- **模擬小考**：隨機 20 題，全部交卷後才揭曉答案，逐題自評結構，再計算總分。
- **錯題複習**：最近一次低於 5 分者自動加入；再次滿分後移出。
- **熟記進度**：連續兩次滿分視為熟記。進度只存於目前瀏覽器 localStorage，可匯出 JSON 紀錄。

英文比對忽略大小寫、頭尾與重複空白，但不接受錯字或替代名稱；Aspartic acid、Glutamic acid 依講義全名作答。結構由使用者自行給 0、1、2 分，**沒有筆跡辨識或自動化學結構判分**。

小考中的答案只保留於當次頁面，重新整理會遺失。已批改並確認的分數立即儲存。瀏覽器清除資料或換裝置不會同步；JSON 為匯出備份，目前未提供匯入功能。

## 本機使用

直接開啟 `index.html` 即可練習。建議透過固定網址的本機靜態伺服器使用，以保持瀏覽器進度儲存來源一致，例如：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

開啟 `http://127.0.0.1:4173`。

## 部署至 GitHub Pages

1. 將專案檔案上傳到 GitHub repository 的 `main` 分支。
2. 在 repository **Settings → Pages → Build and deployment**，將 Source 設為 **GitHub Actions**。
3. 到 **Actions → Publish Amino Lab → Run workflow** 執行；後續推送 `main` 會自動部署。
4. 成功後，網址為 `https://<帳號>.github.io/<repository>/`。

工作流程只發布 `index.html`、`styles.css`、`data.js`、`app.js`、`.nojekyll` 與 `assets/`，不發布測試、暫存檔或原始講義。

## 內容來源與表示法

資料與 PNG 結構圖擷取自使用者提供的課堂講義 `20_amino_acids.pdf`，限本學習用途，未聲稱原圖著作權。Sec 側鏈 SVG 依講義整理；記憶線索由本專案編寫。

- Glycine 採講義兩性離子式 H₃N⁺—CH₂—C(=O)—O⁻。
- Proline 圖保留主鏈，顯示三個 CH₂ 如何接回主鏈 N；考點為閉環關係。
- Histidine 採講義帶正電形式。實際質子化狀態隨 pH 改變，並非永遠 +1。
- R group 下端連接 α 碳；PNG 原圖可能保留與主鏈連結的短鍵線。

## 專案檔案

`data.js`：21 種胺基酸與提示。`app.js`：練習、小考、畫布與進度。`styles.css`：手機與桌面版型。`assets/structures/`：參考結構。`.github/workflows/pages.yml`：靜態部署。


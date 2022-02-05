# next-p5

## about

Next.js を用いて開発環境を構築するため、以下のメリットがあります

- TypeScript/JavaScript のどちらでもコーディングが可能。
- eslint によるコードチェック・支援
- 開発環境構築や開発中のビルドの自動化

## 使い方

git clone 後、以下のコマンドを実行することで開発環境が立ち上がります。

```shell
$ npm install
$ npm run dev
```

## 注意点

- Next.js/React を用いる都合上、p5.js のインスタンスモードでコーディングする必要があります。インスタンスモードについてはこちらを参照してください。

## refs

- [react-p5 - npm](https://www.npmjs.com/package/react-p5) (p5:1.1.9 以上のバージョンでは、react-p5 の型の互換性がないため、自分で修正する必要がある。)
- [gonzarascon/p5-next: P5.js + Next.js with Typescript](https://github.com/gonzarascon/p5-next)
- [fal-works/p5js-templates: Create p5.js sketches with typical JavaScript development tools. Unofficial.](https://github.com/fal-works/p5js-templates)
  - Next.js/React によらず、単体ビルドしたい場合はこちらを使うと便利です。

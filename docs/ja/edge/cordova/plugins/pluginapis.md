---
license: Licensed to the Apache Software Foundation (ASF) under one
         or more contributor license agreements.  See the NOTICE file
         distributed with this work for additional information
         regarding copyright ownership.  The ASF licenses this file
         to you under the Apache License, Version 2.0 (the
         "License"); you may not use this file except in compliance
         with the License.  You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

         Unless required by applicable law or agreed to in writing,
         software distributed under the License is distributed on an
         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
         KIND, either express or implied.  See the License for the
         specific language governing permissions and limitations
         under the License.
---

# プラグイン Api

コルドバの Api は、最小限のセットが付属し、プロジェクトのプラグインを必要とするどのような余分な Api を追加します。

[プラグイン レジストリ][1]を使用してすべての既存のプラグイン （などのサード パーティのプラグイン) を検索することができます。.

 [1]: http://plugins.cordova.io/

コアプラグイン コルドバの伝統的なセット次のとおりです。

*   [バッテリの状態][2]
    
    > デバイスのバッテリのステータスを監視します。

*   [カメラ][3]
    
    > デバイスのカメラを使用して写真をキャプチャします。

*   [コンソール][4]
    
    > Console.log() に追加機能を追加します。

*   [連絡先][5]
    
    > デバイスの連絡先データベースで動作します。

*   [デバイス][6]
    
    > デバイス固有の情報を収集します。

*   [デバイスの動き （加速度）][7]
    
    > デバイスのモーション センサーをタップします。

*   [デバイスの向き （コンパス）][8]
    
    > デバイスが指している方向を取得します。

*   [ダイアログ ボックス][9]
    
    > 視覚デバイス通知。

*   [ファイル ・ システム][10]
    
    > Java スクリプトの設定をネイティブのファイル システムにフックします。

*   [ファイルの転送][11]
    
    > Java スクリプトの設定をネイティブのファイル システムにフックします。

*   [地理位置情報][12]
    
    > アプリケーションの場所を認識させます。

*   [グローバリゼーション][13]
    
    > ロケールに固有のオブジェクトの表現を有効にします。

*   [InAppBrowser][14]
    
    > 別のアプリ内ブラウザー インスタンスで Url を起動します。

*   [メディア][15]
    
    > 記録し、オーディオ ファイルを再生します。

*   [メディアをキャプチャします。][16]
    
    > デバイスのメディア ・ キャプチャ ・ アプリケーションを使用してメディア ファイルをキャプチャします。

*   [ネットワーク情報 (接続)][17]
    
    > ネットワークの状態、および携帯電話のネットワーク情報をすばやく確認します。

*   [スプラッシュ スクリーン][18]
    
    > アプリケーションのスプラッシュ スクリーンを非表示。

*   [振動][19]
    
    > デバイスを振動する API です。

*   [ステータスバー][20]
    
    > 表示、非表示、ステータス バーの背景を構成するための API。

 [2]: http://plugins.cordova.io/#/package/org.apache.cordova.battery-status
 [3]: http://plugins.cordova.io/#/package/org.apache.cordova.camera
 [4]: http://plugins.cordova.io/#/package/org.apache.cordova.console
 [5]: http://plugins.cordova.io/#/package/org.apache.cordova.contacts
 [6]: http://plugins.cordova.io/#/package/org.apache.cordova.device
 [7]: http://plugins.cordova.io/#/package/org.apache.cordova.device-motion
 [8]: http://plugins.cordova.io/#/package/org.apache.cordova.device-orientation
 [9]: http://plugins.cordova.io/#/package/org.apache.cordova.dialogs
 [10]: http://plugins.cordova.io/#/package/org.apache.cordova.file
 [11]: http://plugins.cordova.io/#/package/org.apache.cordova.file-transfer
 [12]: http://plugins.cordova.io/#/package/org.apache.cordova.geolocation
 [13]: http://plugins.cordova.io/#/package/org.apache.cordova.globalization
 [14]: http://plugins.cordova.io/#/package/org.apache.cordova.inappbrowser
 [15]: http://plugins.cordova.io/#/package/org.apache.cordova.media
 [16]: http://plugins.cordova.io/#/package/org.apache.cordova.media-capture
 [17]: http://plugins.cordova.io/#/package/org.apache.cordova.network-information
 [18]: http://plugins.cordova.io/#/package/org.apache.cordova.splashscreen
 [19]: http://plugins.cordova.io/#/package/org.apache.cordova.vibration
 [20]: https://github.com/apache/cordova-plugin-statusbar/blob/master/doc/index.md

これらのプラグインのドキュメントの翻訳を英語以外の言語コルドバ ドキュメントの古いバージョンを見て発見することができます。非常に右上のこのサイトでバージョンを切り替えるには、ドロップ ダウン メニューを使用します。
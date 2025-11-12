//電情なのにJS書けないからgeminiに全部任せてごめんなさいの気持ち
//AI最高！電情なんていらないんだよバーカ！

// HTML文書がすべて読み込まれて準備OKになったら実行
document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------
    // ★ 基準となる「最初の」日時 ★
    // ------------------------------------
    const baseTime = new Date('2025-11-11T11:45:55');

    // ------------------------------------
    // ★★★ 変更点 ★★★
    // 
    // 「最後に計算した時刻」を保持する変数を用意します。
    // まずは基準時刻(baseTime)のコピーからスタートします。
    // (baseTime を直接変更しないよう、.getTime() でコピーします)
    let currentTime = new Date(baseTime.getTime());
    //
    // ------------------------------------


    // 1. ページ内の "resu" クlasスをすべて取得
    const resuElements = document.querySelectorAll('.resu');

    // 2. 取得した "resu" 要素を1つずつ処理
    resuElements.forEach((resuNode, index) => {
        
        // (A) num クラスの数字を1増やす (変更なし)
        const numElement = resuNode.querySelector('.num');
        if (numElement) {
            numElement.textContent = index + 1;
        }

        // (B) day, time, id を自動計算して入れる
        const dayElement = resuNode.querySelector('.day');
        const timeElement = resuNode.querySelector('.time');
        const idElement = resuNode.querySelector('.id');

        if (timeElement) {
            // time要素の中身（"2" や "5"）を取得し、数値に変換
            const offsetSeconds = parseInt(timeElement.textContent, 10);

            // 取得した秒数が正しい数値の場合のみ処理
            if (!isNaN(offsetSeconds)) {
                
                // ------------------------------------
                // ★★★ 変更点 ★★★
                // 
                // baseTime から計算するのをやめ、
                // 保持している 'currentTime' に時差（秒）を加算します。
                // これで、前のレスからの時差になります。
                currentTime.setSeconds(currentTime.getSeconds() + offsetSeconds);
                // 
                // ------------------------------------


                // (ここから下は、計算結果(newTime)の代わりに 'currentTime' を使います)

                // B-1. day を自動設定
                if (dayElement) {
                    const year = currentTime.getFullYear();
                    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
                    const date = String(currentTime.getDate()).padStart(2, '0');
                    const week = ['日', '月', '火', '水', '木', '金', '土'];
                    const dayIndex = currentTime.getDay();
                    const formattedWeek = `(${week[dayIndex]})`;
                    dayElement.textContent = `${year}/${month}/${date}${formattedWeek}`;
                }

                // B-2. time を自動設定 (ミリ秒ランダム化)
                const hours = String(currentTime.getHours()).padStart(2, '0');
                const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                const milliseconds = String(Math.floor(Math.random() * 100)).padStart(2, '0'); 
                
                const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
                
                // HTMLの time 要素を上書き
                timeElement.textContent = formattedTime;

                // B-3. ID を条件付きで生成 (変更なし)
                if (idElement && idElement.textContent.trim() === 'rand') {
                    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                    let generatedId = '';
                    for (let i = 0; i < 8; i++) {
                        generatedId += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    idElement.textContent = generatedId;
                }
            }
        }
    });
});
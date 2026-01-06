// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved, update }
    from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFnmrWfPrFyW-NEj7SITL1T_00hww-B0g",
    authDomain: "dev30-f18-23c94.firebaseapp.com",
    projectId: "dev30-f18-23c94",
    storageBucket: "dev30-f18-23c94.firebasestorage.app",
    messagingSenderId: "867812372908",
    appId: "1:867812372908:web:98218493ec3170451b0a09"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "data"); //RealtimeDB内の"data"を使う


//データ登録(Click)
//送信

let individualData = Array(3);

$('.message_send_btn').on('click', function () {



    //疑問 Local Storageのデータは送れないのかなあ
    let ppl = Number($('#num_of_people').val());
    let textdata = '';

    for (i = 0; i < 3; i++) {
        individualData[i] = {
            checked : false,
            name: $(`#people_name_${i}`).val(),
            pay: Number($(`#people_exp_${i}`).val())
        }
        //最初以下のようにやったが、中身が以下のようになって不適切
        //[object Object],[object Object]
        // textdata += `${individualData[i]},`
    }

    console.log("データベース準備中");
    console.log(individualData);
    // console.log(textdata);


    let msg = {
        date: $('#date_and_year').val(),
        account: $('#account_info').val(),
        message: $('#thank_you_message').val(),
        date: $('#date_and_year').val(),
        ppl: $('#num_of_people').val(),
        //Firebaseはjsonをそのまま保存できる
        person: individualData

    }

    const newPostRef = push(dbRef)
    set(newPostRef, msg)

});

//この下は消さない


//データ表示(Enter)
onChildAdded(dbRef, function (data) {

    const msg = data.val()
    const key = data.key //keyの部分は課題またはごじしんで使用いただくための



    //削除していいはず
    // const dbRef_d = ref(db, "data"); //RealtimeDB内の"data"を使う

    //     //疑問 Local Storageのデータは送れないのかなあ
    //     let ppl = Number($('#num_of_people').val());
    //     let individualData = Array(3);
    //     let textdata = '';

    //     for (i = 0; i < 3; i++) {
    //         individualData[i] = {
    //             name: $(`#people_name_${i}`).val(),
    //             pay: Number($(`#people_exp_${i}`).val())
    //         }
    //         //最初以下のようにやったが、中身が以下のようになって不適切
    //         //[object Object],[object Object]
    //         // textdata += `${individualData[i]},`
    //     }


    // console.log("データベース準備中");
    // console.log(individualData);
    // // console.log(textdata);


    // let msg_d = {
    //     date: $('#date_and_year').val(),
    //     ppl: $('#num_of_people').val(),
    //     //Firebaseはjsonをそのまま保存できる
    //     person: individualData

    // }

    // const newPostRef_d = push(dbRef_d)
    // set(newPostRef_d, msg_d)


    //onChildAddedとは
    //「すでにある子 + 新しく追加された子」を1件ずつ受け取るリスナーなので
    //基本表示専用である

//条件式？ 式1：式2--> 条件式がTrueなら式1を実行、Falseなら式2を実行
    let peopleHtml = "";


    msg.person.forEach(function (p, i) {
        peopleHtml += `<p class="stored_data" id="stored_data_${i}">
    名前 : ${p.name}, 金額 : ${p.pay}円
    </p>`

    })

    const html = `
                <div>
                <p class="msg"> -------------------------- </p>
                <p class="msg"> ID : ${key} </p>  
                <p class="msg"> DATE :${msg.date} </p>  
                <p class="msg"> MESSAGE </p>  
                <p class="msg"> ${msg.message} </p>
                <p class="msg"> ${peopleHtml} </p>
                <p class="msg"> ${msg.account} </p>
                <p class="msg"> -------------------------- </p>
                <p class="msg"> -------------------------- </p>
                </div>
            `




let html_table_data = "";
msg.person.forEach(function (p, i) {

    //なんでこっちは動かないのか後でかくにんする
    // const checkedAttr = ''
    // if (p.checked === true){checkedAttr ='checked';}
const checkedAttr= p.checked ? 'checked' : '';
 

html_table_data += `
 <tr class="table_contents">
            <th class="datacell">
                <input id="checkbox_${key}_${i}" class="checkbox" type="checkbox" ${checkedAttr}>
            </th>
            <th class="datacell">${p.name}</th>
            <th class="datacell">${p.pay}</th>
</tr>
`
})

const html_table = `
<div class="table_div>
<table class="table">
    <thead class="table_thread">
        <tr class="table_header">
            <th class="dataheader">完了したらチェック</th>
            <th class="dataheader">名前</th>
            <th class="dataheader">金額</th>
        </tr>
    </thead>
    <tbody class="table_tboday">
 ${html_table_data}

    </tbody>


</table>
</div>
`


$('.store').append(html_table)
$('.store').append(html)
    })
;


//以下のファイルは別フォルダだと動かず、もう一回importとかおまじないをやらないといけなかった
//ES Modules（import を使っているJS）では、
//変数は「そのファイルの中だけ」に閉じ込められる
//動的に追加されたアイテムのonclickには注意！！！！！
$(document).on('change', '.checkbox',function(){
////////////////この辺りは若干自信がないので後でかくにんする///////////////////////

//thisでDOM要素をとってきて、その中のidをとってくる
const id = $(this).attr('id');

//_は慣習的に使わない変数を示したい時
//_でidを分割する
const [_, firebaseKey, index] = id.split('_')

//.prop(attr)ではattrの属性値が取得できる
const checked = $(this).prop('checked');

console.log(firebaseKey, index,checked);

const dbRef_update= ref(db, `data/${firebaseKey}/person/${index}`)

update (dbRef_update,{checked : checked})

});

onChildChanged(dbRef, function(data){
const msg = data.val();
const key = data.key();

msg.person.forEach(function(p,i){

    //どのIDのDOM操作をするのかを確認する
const targetID = `checkbox_${key}_${i}`;

//checkedの状態をDOMに反映する
$(targetID).prop('checked', !!p,checked);

})

})

//Firebaseに変化が起きた時に、フロントエンド側を変えるにはonAddedChildではできない
//onChildAddedは初期表示（既存データの表示）、onChildChangedはchecked変更の反映
//Firebase側のイベントリス名を使う必要がある
//Firebaseは状態管理ライブラリではないので、自動では反映されないし、勝手にDOMも更新されない


//この下は消さない
;

//この下は消さない

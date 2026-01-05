//jsを記述する際はここに記載していく

//変数の定義　https://magazine.techacademy.jp/magazine/14872


let real_name = Array();
let input = Array();
let input_num = Array();
let ratio = Array();
let person_payment = Array();
let exp=Array();
let total_value;
let num_ppl;


//inputでとった数値は文字列なので、数値に変換する

/////以下なんで動かないかは別途
// for (i=0; i<input_num.length; i++){
// $(`#people${i+1}_exp`).on('change', function () {
// input[i] = $(`#people${i+1}_exp`).val();
// console.log('change event後のinput1の値：'+input[i]);
// input_num[i] = Number(input[i]);
// console.log('change event後のinput1の数値：'+input_num[i]);
// });

// }




//Local Storageから各種情報を読み込んできて、削除ボタンを押さない限りは削除をしないようにする関数
/**関数 : Local Storage上のKey名と該当する入力欄のclassかIDを入力すると
 *Local Storageに保存されているデータを持ってきて、入力欄に常に表示するようにする関数
 * @param {key_for_ls,name} LocalStorage上のKey名と該当する入力欄のclassかID
 * @returns {} なし 
 */
function KeepValue(key_for_ls, name) {
    if (localStorage.getItem(key_for_ls)) {
        let saved_info = localStorage.getItem(key_for_ls);
        $(name).val(saved_info);
    }
}

/**関数 : LocalStorageの数値をクリアする関数
 *Local Storage上のKeyを入力すると、LocalStorageがクリアされる関数
 *クリアしたLocalStorageに対応する入力欄のIDかclass名を指定するとそこの数値もからになる
 * @param {key_for_ls, name} LocalStorage上のKey名と該当する入力欄のclassかID
 * @returns {} なし * 
 
 */
function removeLocalStorage(key_for_ls, name) {
    localStorage.removeItem(key_for_ls)
    $(name).val("")
}


//入力したアカウント情報をvalで撮ってきて、それをLocal Storageに保存する
$('.save_account_btn').on('click', function () {
    let account_info_val = $('#account_info').val();
    localStorage.setItem("account_information", account_info_val);
});

//+++入力した情報をLocal Storageから持ってきて削除しない限りは表示するようにする
//関数化けるしたので削除してOK
// if (localStorage.getItem('account_information')) {
//     const saved_account_info = localStorage.getItem("account_information");
//     $('#account_info').val(saved_account_info);
// }

KeepValue('account_information', '#account_info')


$('.rm_account_btn').on('click', function () {
    removeLocalStorage('account_information','#account_info')
});



//テンプレメッセージ情報をvalで撮ってきて、それをLocal Storageに保存する
$('.save_btn').on('click', function () {
    let thx_message_val = $('#thank_you_message').val();
    localStorage.setItem("message_template", thx_message_val);
});


KeepValue('message_template', '#thank_you_message')
//+++情報をLocal Storageから持ってきて削除しない限りは表示するようにする
//関数化けるしたので削除してOK
// if (localStorage.getItem('message_template')) {
//     const saved_thx_info = localStorage.getItem("message_template");
//     $('#thank_you_message').val(saved_thx_info);
// }

// $('.rm_template_message').on('click', function () {
//     localStorage.removeItem('message_template')
//     $('#thank_you_message').val("")
// });


/**$('.rm_template_message').on(
  'click', 
  removeLocalStorage('message_template','#thank_you_message')
);
のようにすると、Click時ではなくページ読み込み時に記載した関数が発動されてしまう

なんで？
*/

$('.rm_template_message').on('click', function(){
removeLocalStorage('message_template','#thank_you_message')
} ); 


//参加人数をとってきてLocal Storageに格納する
function Getppl() {
    const value_ppl = $('#num_of_people').val();
    const num_ppl = Number(value_ppl);
    return num_ppl;
}

function SavePpl() {
    localStorage.setItem("ppl", $('#num_of_people').val());
}

//参加人数をとってきて、人数分のFormを作る。
$('#btn_ppl').on('click', function () {
    let num_ppl = Getppl()
    CreateForms(num_ppl)
    UpdateArray(num_ppl)
    SavePpl()
});

//+++入力した情報をLocal Storageから持ってきて削除しない限りは表示するようにする
KeepValue('ppl', '#num_of_people')
//Numberをつけなくても動いちゃったが、エラーの元なのでNumberをつける
let keeped_num_ppl = Number(localStorage.getItem('ppl'));
CreateForms(keeped_num_ppl)
UpdateArray(keeped_num_ppl)
console.log("input_numの値ココア" + input_num)




function CreateForms(data) {

    //何回も押すとどんどん追加されていってしますので追記する
    // $('.exp').empty();

    for (let i = 0; i < data; i++) {


        const html = `
<div class="member">
    <div class="name">
      <h2 class="people">参加者${i + 1}の名前</h2>
      <input type="text" class="people_name" id="people_name_${i}">
    </div>

    <div class="expected_amount">
      <h2 class="people_amount">参加者${i + 1}の負担イメージ額</h2>
      <input type="number" name="roles" class="people_exp" id="people_exp_${i}">
    </div>
  </div>
`
        $('.exp').append(html);
    }
}

function ShowResult(data) {

    for (let i = 0; i < data; i++) {


        const html_result = `
  <div class="cal_result">
    <h2 class="people1_cal">参加者${i}の支払い金額</h2>
    <h2 class="people_cal_val" id="people_cal_val_${i}">計算結果</h2>
  </div>
`
        $('.start').append(html_result);
    }
}

function UpdateArray(data) {
    real_name = Array(data);
    input = Array(data);
    input_num = Array(data);
    ratio = Array(data);
    person_payment = Array(data);
    exp=Array(data);
    console.log("input_numの更新した値は")
    console.log(input_num)
}


// //参加者の名前を取ってくる

///なんでこれ動かないのかな
// for(i=0; i<3; i++){
// $(`.people${i+1}_name`).on('change', function(){
// const name_1 = $(`.people${i+1}_name`).val();
// console.log(name_1);
// });
// }

//参加者の名前をとってくる
//関数化した
function peopleName() {

    let num_ppl = Getppl()

    for (let i = 0; i < num_ppl; i++) {
        real_name[i] = $(`#people_name_${i}`).val();
    }

    console.log(real_name)
    return real_name;
};


//////以下削除ーーーー
// $(`.people_name`).on('change', function () {
//     real_name[1] = $(`.people2_name`).val();
// });

// $(`.people_name`).on('change', function () {
//     real_name[2] = $(`.people3_name`).val();
// });
//////ここまで削除ーーーー



//みんながどれくらいの負担をするかを記載
//関数化した
function guessExpense() {

    let num_ppl = Getppl()

    for (let i = 0; i < num_ppl; i++) {
        input[i] = $(`#people_exp_${i}`).val();
        // console.log(`change event後のinput${i}の値：` + input[i]);
        input_num[i] = Number(input[i]);
        // console.log(`change event後のinput${i}の数値：` + input_num[i]);
    }

    console.log(input_num);
    return input_num;
};

//////以下削除ーーーー
// $(`#people1_exp`).on('change', function () {
//     input[0] = $(`#people1_exp`).val();
//     console.log('change event後のinput1の値：' + input[0]);
//     input_num[0] = Number(input[0]);
//     console.log('change event後のinput1の数値：' + input_num[0]);
// });


// $(`#people2_exp`).on('change', function () {
//     input[1] = $(`#people2_exp`).val();
//     console.log('change event後のinput2の値：' + input[1]);
//     input_num[1] = Number(input[1]);

// });

// $(`#people3_exp`).on('change', function () {
//     input[2] = $(`#people3_exp`).val();
//     console.log('change event後のinput3の値：' + input[2]);
//     input_num[2] = Number(input[2]);
// });
//////ここまで削除ーーーー

//ここはOnclickに変更した
//何故なら、総額が変わらなくても負担割合を変えたい場合があるから
$('#start_btn').on('click', function () {
real_name=peopleName()
input_num=guessExpense()

let date_and_year=$('#date_and_year').val();
localStorage.setItem('DATE',date_and_year)

    // console.log('valueを変えた時のinput_1:'+input_1);
    total_value = $('#value').val();
    // console.log('change event後のtotal_valueの値：'+total_value);
    //数値に変換
    let total_value_num = Number(total_value);

    localStorage.setItem('Total_Pay', total_value_num)
    console.log('total_value_Numの数値：' + total_value_num);

    if (localStorage.getItem('Total_Pay')) {
        const total_amount = localStorage.getItem('Total_Pay');
        console.log('~~~' + total_amount);
    }

    let sum = 0;

    for (i = 0; i < input_num.length; i++) {
        sum = sum + input_num[i];
    }
    console.log('sumの数値：' + sum);

    for (i = 0; i < input_num.length; i++) {
        ratio[i] = input_num[i] / sum
        console.log('ratio：' + i + "の値：" + ratio[i]);
        exp[i] = ratio[i]*sum;
    }

   

    let num_ppl = Getppl()
    let total_value_num_ls = Number(localStorage.getItem('Total_Pay'));
    ShowResult(num_ppl)

    //計算を開始する

    alert("ugoitemasu")
    console.log("person_paymentの値　ここ：" + ratio)
    console.log("total_valueの値 ここ：" + total_value_num_ls)
    for (i = 0; i < input_num.length; i++) {
        person_payment[i] = ratio[i] * total_value_num_ls
        console.log('Person' + i + "の支払額：" + person_payment[i]);
        $(`#people_cal_val_${i}`).html(person_payment[i]);

        let obj = {
            name: real_name[i],
            jpy: person_payment[i],
            exp: exp[i],
        }
        console.log(obj);


        let json_str_fmt = JSON.stringify(obj);
        let x = i + 1
        let key = 'person' + x;
        localStorage.setItem(key, json_str_fmt);
    }




    //名前と金額を保存んする
    // let obj={
    //     name : real_name[0],
    //     jpy : person_payment[0]
    // }
    // console.log(obj);

})

//合計金額を削除しない限りは保存する
KeepValue('Total_Pay', '#value')

//参加者の名前を削除しない限りは保持する

if (localStorage.getItem('Total_Pay')) {
    let ppl = Number(localStorage.getItem('ppl'));
    let jsonObj = Array(ppl)
    let js_pars_obj = Array(ppl)

    for (i = 0; i < ppl; i++) {
        //str json形式になったものを一行つづ指定して取り出したい場合も
        jsonObj[i] = localStorage.getItem(`person${i + 1}`);
        if (jsonObj[i]) {
            js_pars_obj[i] = JSON.parse(jsonObj[i]);
        }
        console.log("jsonObjの値XXX")
        console.log(jsonObj)
        $(`#people_name_${i}`).val(js_pars_obj[i].name);
        $(`#people_exp_${i}`).val(js_pars_obj[i].exp);

    }
} else { console.log("まだTotal_Playの値がないです"); }

//日時を削除しない限りは保持する
KeepValue('DATE','#date_and_year')

//案件データを削除する
$('.rm_contents_btn').on('click', function () {
let ppl = Number(localStorage.getItem('ppl'));
localStorage.removeItem('ppl');
$('#num_of_people').val("");
localStorage.removeItem('Total_Pay');
$('#value').val("");
localStorage.removeItem('DATE');
$('#date_and_year').val("");

 for(let i=0; i<ppl;i++){
$(`#people_name_${i}`).val("");
$(`#people_exp_${i}`).val("");
localStorage.removeItem(`people${i+1}_name`);
localStorage.removeItem(`people${i+1}_exp_storage`);
localStorage.removeItem(`person${i+1}`);
}
 }
);

// let message = localStorage.message_template +"======" +\n+ localStorage.account_information;
// console.log('message中身:'+ message)

$('.create_msg_btn').on('click', function () {

    let num_ppl = Getppl()

    let jsonObj = Array(num_ppl)
    let js_pars_obj = Array(num_ppl)

    for (i = 0; i < num_ppl; i++) {
        jsonObj[i] = localStorage.getItem(`person${i + 1}`);
        js_pars_obj[i] = JSON.parse(jsonObj[i]);
        console.log('Parseご' + i);
        console.log(js_pars_obj);
        console.log(js_pars_obj[i].name);
    }
    // let jsonObj = localStorage.getItem('person1');
    // let js_pars_obj = JSON.parse(jsonObj);
    // console.log('Parseご');
    // console.log(js_pars_obj.name);

    //paymentLineは初期化してあげること
let paymentLine = '';
for (let i=0; i< num_ppl; i++){
paymentLine += `${js_pars_obj[i].name}さん:${js_pars_obj[i].jpy}JPY\n`
}

    let html = `
${localStorage.message_template}

支払い総額:${localStorage.Total_Pay}JPY 

負担額:
${paymentLine}
===========お支払い情報============
${localStorage.account_information}
`
    console.log(html);



    $('#draft_message').html(html)
});


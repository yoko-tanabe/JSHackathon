//jsを記述する際はここに記載していく

//変数の定義　https://magazine.techacademy.jp/magazine/14872


let real_name = Array(2);
let input = Array(2);
let input_num = Array(2);
let ratio = Array(2);
let person_payment = Array(2);
let total_value = 0;
let num_ppl = 0;


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

//アカウント情報をvalで撮ってきて、それをLocal Storageに保存する
$('.save_account_btn').on('click', function () {
    let account_info_val = $('#account_info').val();
    localStorage.setItem("account_information", account_info_val);
});

if (localStorage.getItem('account_information')) {
    const saved_account_info = localStorage.getItem("account_information");
    $('#account_info').val(saved_account_info);
}

$('.rm_account_btn').on('click', function () {
    localStorage.removeItem('account_information')
    $('#account_info').val("")
});

//テンプレメッセージ情報をvalで撮ってきて、それをLocal Storageに保存する
$('.save_btn').on('click', function () {
    let thx_message_val = $('#thank_you_message').val();
    localStorage.setItem("message_template", thx_message_val);
});

if (localStorage.getItem('message_template')) {
    const saved_thx_info = localStorage.getItem("message_template");
    $('#thank_you_message').val(saved_thx_info);
}

$('.rm_template_message').on('click', function () {
    localStorage.removeItem('message_template')
    $('#thank_you_message').val("")
});

//参加人数をとってくる
function Getppl() {
    const value_ppl = $('#num_of_people').val();
    const num_ppl = Number(value_ppl);
    return num_ppl;
}

//参加人数をとってくる
$('#btn_ppl').on('click', function () {
    let num_ppl = Getppl()
    CreateForms(num_ppl)
    UpdateArray(num_ppl)
});


//削除 $('.expected_amount3').append(html);



function CreateForms(data) {

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

function UpdateArray (data){
let real_name = Array(data);
let input = Array(data);
let input_num = Array(data);
let ratio = Array(data);
let person_payment = Array(data);
}

console.log("num_pplの値は：", num_ppl)
// //参加者の名前を取ってくる

///なんでこれ動かないのかな
// for(i=0; i<3; i++){
// $(`.people${i+1}_name`).on('change', function(){
// const name_1 = $(`.people${i+1}_name`).val();
// console.log(name_1);
// });
// }

$(document).on('change', '.people_name', function () {

 let num_ppl = Getppl()

    for (let i = 0; i < num_ppl; i++) {
        real_name[i] = $(`#people_name_${i}`).val();
    }

    console.log(real_name)
});


//////以下削除ーーーー
// $(`.people_name`).on('change', function () {
//     real_name[1] = $(`.people2_name`).val();
// });

// $(`.people_name`).on('change', function () {
//     real_name[2] = $(`.people3_name`).val();
// });
//////ここまで削除ーーーー



//みんながどれくらいの負担をするかを記載
$(document).on('change', '.people_exp', function () {

        let num_ppl = Getppl()

    for (let i = 0; i < num_ppl; i++) {
        input[i] = $(`#people_exp_${i}`).val();
        console.log(`change event後のinput${i}の値：` + input[i]);
        input_num[i] = Number(input[i]);
        console.log(`change event後のinput${i}の数値：` + input_num[i]);
    }

    console.log(input_num);
});

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

$('#value').on('change', function () {
    // console.log('valueを変えた時のinput_1:'+input_1);
    total_value = $('#value').val();
    // console.log('change event後のtotal_valueの値：'+total_value);
    //数値に変換
    total_value_num = Number(total_value);

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
    }


});



$('.start_btn').on('click', function () {
let num_ppl = Getppl()
    ShowResult(num_ppl)
    //計算を開始する

alert("ugoitemasu")
console.log("person_paymentの値　ここ：" + ratio)
console.log("total_valueの値 ここ：" + total_value)
    for (i = 0; i < input_num.length; i++) {
        person_payment[i] = ratio[i] * total_value_num
        console.log('Person' + i + "の支払額：" + person_payment[i]);
        $(`#people_cal_val_${i}`).html(person_payment[i]);

        let obj = {
            name: real_name[i],
            jpy: person_payment[i]
        }
        console.log(obj);


        let json_fmt = JSON.stringify(obj);
        let x = i + 1
        let key = 'person' + x;
        localStorage.setItem(key, json_fmt);
    }




    //名前と金額を保存んする
    // let obj={
    //     name : real_name[0],
    //     jpy : person_payment[0]
    // }
    // console.log(obj);

})

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


let html = `
${localStorage.message_template}

支払い総額:${localStorage.Total_Pay}JPY 

負担額:
${js_pars_obj[0].name}さん:${js_pars_obj[0].jpy}JPY
${js_pars_obj[1].name}さん:${js_pars_obj[1].jpy}JPY
${js_pars_obj[2].name}さん:${js_pars_obj[2].jpy}JPY
===========お支払い情報============
${localStorage.account_information}
`
console.log(html);



    $('#draft_message').html(html)
});


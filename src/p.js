<script>
// script to put referral code in cookie
let plan = 'plan_01';
document.querySelector('#form').style.display = "none";
document.querySelector('.plan_01').addEventListener('click', () => selectPlan('plan_01'), false);
document.querySelector('.plan_02').addEventListener('click', () => selectPlan('plan_02'), false);
document.querySelector('.plan_03').addEventListener('click', () => selectPlan('plan_03'), false);
document.querySelector('.plan_04').addEventListener('click', () => selectPlan('plan_04'), false);

document.querySelector('.plan_01_mobile').addEventListener('click', () => selectPlan('plan_01'), false);
document.querySelector('.plan_02_mobile').addEventListener('click', () => selectPlan('plan_02'), false);
document.querySelector('.plan_03_mobile').addEventListener('click', () => selectPlan('plan_03'), false);
document.querySelector('.plan_04_mobile').addEventListener('click', () => selectPlan('plan_04'), false);

document.querySelector('#gform_submit_button_3').addEventListener('click', (e) => {
  e.preventDefault();
  registerUser();

}, false);
googleSignupHrefUpdate();

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
//console.log("this:",getCookie("referrer"));

function selectPlan(selectedPlan) {
  document.querySelector('#form').style.display = "block";
  plan = selectedPlan;
  console.log(plan);
  googleSignupHrefUpdate();

}

function registerUser() {
  console.log('Sending registration information');
  document.querySelector('#gform_submit_button_3').value = "Registering...";
  const params = {
    email: document.querySelector('.register_email input').value,
    referrer: getReferrer(),
    plan: plan,
  };
  console.log(params);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.adbot.co.za/adbud/register', true);
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(params))
  xhr.onload = function () {

    const response = JSON.parse(this.responseText);
    if (response['code'] == 422) {
      if (document.querySelector('#form .span_12')) {
        document.querySelector('#form .instructions-text').innerHTML += `<small style="color:red">${response.data.email[0]}</small>`;
        document.querySelector('#gform_submit_button_3').value = "Register with email";
      }
    } else {
      document.querySelector('#form .span_12').innerHTML = "<img src='https://adbot.wpengine.com/wp-content/uploads/2020/02/check-your-email.jpg' style='max-width: 100%; width: 100%;' />";
    }
    console.log(response);

  };
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function getReferrer() {
  const referrer = getUrlVars()["referrer"] && getUrlVars()["referrer"].indexOf('#') > 0 ? getUrlVars()["referrer"].substring(0, getUrlVars()["referrer"].indexOf('#')) : getUrlVars()["referrer"];
  return referrer || getCookie("referrer") ||"";
}

function googleSignupHrefUpdate() {
  const href = `https://adbot.co.za/account/google/auth?state=adbud_registration&referrer=${getReferrer()}&plan=${plan}`;
  document.querySelector('.google-signup-button').href = href;
}

</script>

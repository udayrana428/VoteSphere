// const fs=require('fs')
// const voters=JSON.parse(fs.readFileSync('./data/data.json','utf8'))
// const voters=require('/data/data.json')

// For Password validation
const confirmPassword = document.getElementById('confirm-password');
const password = document.getElementById('password');

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value !== password.value) {
        confirmPassword.style.border = "2px solid red"; // Passwords do not match
    } else {
        confirmPassword.style.border = "2px solid green"; // Passwords match
        password.style.border = "2px solid green";
    }
});

// For Email validation PENDING
const emailInput=document.getElementById('email')
emailInput.addEventListener('blur',()=>{
    let emailExist=voters.find(user=> user.email===emailInput.value)
    if(emailExist){
        email.style.border="2px solid red";
    }else{
        email.style.border="2px solid green";
    }
})




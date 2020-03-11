function timer(){
  setTimeout(function(){
    console.log(1);
  },1000);
}

async function f1(){
  var time = await timer()
  console.log(2);
}
f1()
console.log(3);

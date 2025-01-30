const orderFoodBtn = document.querySelector("#order-food");
let OrderStatus = document.getElementById("status-text");
const imageDiv = document.querySelector(".image-div");
let orderId = document.getElementById("order-id");
// console.log(orderFoodBtn);

function randomOrderId(){
    return Math.floor(Math.random()*100000);
}

function randomTime(){
    return Math.floor(Math.random()*(10000-5000+1));
}

function prepareFood(eachItem){
    return new Promise((resolve, reject)=>{
        let foodStatus = true;
        setTimeout(()=>{
            if(foodStatus) resolve();
            else reject(`${eachItem} is Not Prepared !`)
        }, randomTime())
    });
}
orderFoodBtn.addEventListener('click',function(){
    const selectedItems = [];
    let idx = 0;
    document.querySelectorAll('input').forEach((eachInput)=>{
        if(eachInput.checked===true) selectedItems[idx++]=eachInput.name;
    })
    if(selectedItems.length!=0){
        orderId.innerText = randomOrderId();
        OrderStatus.innerText = "Your Food is being Prepared ⌛"
        orderFoodBtn.disabled = true;
        orderFoodBtn.style.backgroundColor = "#91beee"
        console.log(selectedItems);
        const foodPromises = selectedItems.map((eachItem) =>
            prepareFood(eachItem).then(() => {
                OrderStatus.innerText = `${eachItem} is Ready 😀!`;
                imageDiv.innerHTML += `
                    <img src="./assets/${eachItem}.png" alt="Ordered Items Images">
                `;
            })
        );

        setTimeout(()=>{
            Promise.all(foodPromises)
            .then(() => {
                OrderStatus.innerText = "Enjoy Your Delicious Food 😋";
            })
            .catch((error) => {
                OrderStatus.innerText = error; 
                orderFoodBtn.disabled = false; 
                orderFoodBtn.style.backgroundColor = "";
            });
        },6000);
        setTimeout(() => {
            location.reload();
        }, 15000); 
    }else{
        OrderStatus.innerText="You Have Not Selected Any Food☹️";
    }
    
})

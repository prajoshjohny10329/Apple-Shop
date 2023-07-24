

function addToCart(proId) {
  $.ajax({
    url: "/add-to-cart/" + proId,
    method: "get",
    success: (response) => {
      // alert(response);
      Swal.fire(
        'Good job!',
        'You Add this product to Cart!',
        'success'
      )
    },
  });
}


function changeQuantity(cartId, proId, userId, count) {
  let quantity = parseInt(document.getElementById(proId).innerHTML);
  count = parseInt(count);
  console.log("thi sis ajax");
  console.log(userId);

  $.ajax({
    url: "/change-product-quantity",
    data: {
      user: userId,
      cart: cartId,
      product: proId,
      count: count,
      quantity: quantity,
    },
    method: "post",
    success: (response) => {
      if(response.stockNot){
        document.getElementById(proId).innerHTML = quantity + count;
        document.getElementById("total").innerHTML = response.total;
        document.getElementById("totalProducts").innerHTML = response.totalPro;
        Swal.fire({
          title: 'stock is Not available!',
          text: 'You clicked the button!',
          icon: 'error'
        }).then(() => {
          location.reload("/cart"); // Reload the page after the user clicks "OK"
        });
      }
      if (response.removeProduct) {
        Swal.fire({
          title: 'Product Remove From Cart!',
          text: 'You clicked the button!',
          icon: 'error'
        }).then(() => {
          location.reload("/cart"); // Reload the page after the user clicks "OK"
        });
      } else {
        console.log(response);
        document.getElementById(proId).innerHTML = quantity + count;
        document.getElementById("total").innerHTML = response.total;
        document.getElementById("totalProducts").innerHTML = response.totalPro;
      }
    },
  });
}
function removeCartProduct(cartId, proId) {
  $.ajax({
    url: "/remove-cart-product",
    data: {
      cart: cartId,
      product: proId,
    },
    method: "post",
    success:  (response) => {
      Swal.fire({
        title: 'Product Remove From Cart!',
        text: 'You clicked the button!',
        icon: 'error'
      }).then(() => {
        location.reload("/cart"); // Reload the page after the user clicks "OK"
      });
    },
  });
}


// placeorder
$("#checkout-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "/place-order",
    method: "post",
    data: $("#checkout-form").serialize(),
    success: (response) => {
      if (response.status) {
        console.log('success');
        location.href = "/order-success";
        
      } else {
        generateRazorpay(response);
      }
    },
  });
});


function verifyPayment(payment,order){
  console.log('verify');
  $.ajax({
    url:'/verify-payment',
    data:{
      payment,
      order
    },
    method:'post',
    success: (response) => {
      if(response.status){
        console.log('success');
        location.href = "/order-success";
      }
      else{
        console.log('not success');
      }
    }
  })

}

////coupon

$("#coupon-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "/post-coupon",
    method: "post",
    data: $("#coupon-form").serialize(),
    success: (response) => {
      if (response.status) {
        console.log(response.couponData);
        const total = document.getElementById("total").value;
        document.getElementById("discount").innerHTML = response.discount;
        document.getElementById("total").innerHTML = response.finalPrice;
        document.getElementById('couponBannerId').src = response.couponData.couponBanner
        document.getElementById('couponResponseId').innerHTML = response.couponData.couponName+' Activated'
        document.getElementById('couponOffer').innerHTML = ' "Congratulations! You have unlocked a fantastic discount of '+response.discountPrice +' rupees!"' 
        const elements = document.getElementsByClassName('couponActivated');
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = 'none';
        }
      } else {
        document.getElementById("errorMessage").innerHTML = response.errorMessage;
      }
    },
  });
});

// view on product



///admin

//blockBanner

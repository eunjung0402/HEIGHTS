$(function(){

  // 플레이리스트 엑스버튼 모션
  $('.group_playlist .close_btn').click(function(){
    $('.group_playlist').slideUp();
  })

  // 스크롤시 lnb 메뉴 슬라이드
  $("body").on('mousewheel',function(e){ 
    var wheel = e.originalEvent.wheelDelta; 
    if(wheel>0){
      let innerWidth = $(document).innerWidth();
      if(innerWidth > 767) {
        $('header .lnb_area').stop().slideDown()
      }
    } else {
      $('header .lnb_area').stop().slideUp()
    }
  })

  // 브랜드 스와이퍼 1
  var brandSwiper1 = new Swiper(".brandSwiper1", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    mousewheel: true,
    });

  // 브랜드 스와이퍼 2
  var brandSwiper2 = new Swiper(".brandSwiper2", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    mousewheel: true,
    });

    // 랭킹 스와이퍼
    var rangkingSwiper = new Swiper(".rangkin_slide", {
      pagination: {
        el: ".pagination",
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });

    // 모바일 사이즈로 변경시 메인 스와이퍼
    var visualSwiper = new Swiper(".mobile_slide1", {
      slidesPerView: 1.2,
      centeredSlides: true,
      loop:true,
      spaceBetween: 8,
    });

    // 모바일 사이즈로 변경시 큐레이션 스와이퍼
    var curationSwiper = new Swiper(".mobile_slide2", {
      slidesPerView: 1.2,
      loop:true,
    });

    // 모바일 사이즈로 변경시 신상품 스와이퍼
    var newProductSwiper = new Swiper(".mobile_slide3", {
      slidesPerView: 1.3,
      spaceBetween: 15,
      loop:true,
    });

    // 모바일 사이즈로 변경시 매거진 스와이퍼
    var magazineSwiper = new Swiper(".mobile_slide4", {
      slidesPerView: 1.2,
      spaceBetween: 15,
      loop:true,
    });

    // 가격 천단위로 끊는 함수
    function numFormat(num){
      return num.toLocaleString('ko-KR');
    }

    // 푸터 셀렉트 모션
    $('.select').click(function(){
      $('.select_wrap').toggleClass('on');
      // if($(this).parent().hasClass('on')) {
      //   $('.select_wrap').removeClass('on');
      // }
    })


    // 데이터 바인딩
    fetch("./assets/data/menu.json")
        .then(res=>res.json())
        .then(json=>{
          data=json.items;
            //console.log(json)
            let html =``;

            data.forEach(el => {
              //console.log(el)

              //console.log(el.menu);
              const subArr = el.menu;
              let subHtml = ``;

              subArr.forEach(el2=>{

                const subArr2 = el2.sub;
                let subHtml2 = ``;
                subArr2.forEach(el3 => {
                  subHtml2 += `<li class="category_item">
                                <a href="#">${el3.name}</a>
                              </li>`
                })

                subHtml += `<div class="category_box">
                            <em class="title">${el2.subTitle}</em>
                            <ul class="category_list">${subHtml2}</ul>
                          </div>`
              })

              recommArr = el.recommend;
              let recommHtml =``;
              recommArr.forEach(el3 => {
                //console.log(el3)
                recommHtml += `<li class="img_item">
                            <a href="#">
                                <img src="${el3.thumb}" alt>
                                <div class="bg_opacity">
                                    ${el3.title}
                                </div>
                            </a>
                        </li>`

              });


              html+=`<div class="group_category">
              <div class="inner inner_flex">
                  <div class="category_area">
                      <h3 class="small_title">${el.title} <span class="count">전체 ${numFormat(el.total)}개</span></h3>
                      ${subHtml}
                  </div>
                  <div class="img_area">
                    <ul class="img_list">
                      ${recommHtml}
                    </ul>
                  </div>
                </div>
              </div>`;


              
            });

            $("#cateMenu").html(html)
        })
})
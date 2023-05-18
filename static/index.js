// $(document).ready(function(){ })와 같음.
$(function () {
  listing();
});

// READ
const listing = () => {
  fetch("/showComment")
      .then((res) => res.json())
      .then((data) => {
          let rows = data["result"];
          $("#inputList").empty();
          rows.forEach((a) => {
              let comment = a["comment"];
              let like = a["like"];
              let id = a["_id"];
              let temp_html = `<div class="divcomment">
                        <p>${comment}&nbsp; <i id=${id} onclick='commentdelete(event)' class="fa-regular fa-square-minus"></i></p>
                        <p>
                        <span class="like-num">${like}</span>                             
                        <span type="button" value=${like} id=${id} onclick='clickLike(event)' class="like-logo">🖤</span>
                        </p>
                      </div>`;
              $("#inputList").append(temp_html);
          });
      });
};

// 댓글작성
const posting = () => {
  let comment = $("#commentInput").val();

  let formData = new FormData();
  formData.append("comment_give", comment);

  fetch("/introPosting", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
          alert(data["msg"]);
          // 새로고침
          window.location.reload();
      });
};

// 댓글삭제
const commentdelete = (event) => {
  let id = event.target.getAttribute("id");
  let formData = new FormData();
  formData.append("id", id);
  fetch("/comment_delete", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
          alert(data["msg"]);
          //새로고침
          window.location.reload();
      });
};

// 좋아요
const clickLike = (event) => {
  console.log("clickLike")
  let id = event.target.getAttribute("id");
  let like = event.target.getAttribute("value");

  console.log(like);
  console.log(id)
  let formData = new FormData();
  formData.append("id_give", id);
  formData.append("like_give", like);
  console.log(formData)

  fetch("/fan/like", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
          // alert(data["msg"]);
          // // 새로고침
          window.location.reload();
      });
};

const btnArr = document.getElementsByTagName("button");
for (let i = 0; i < btnArr.length; i++) {
  btnArr[i].addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".box" + (i + 1)).scrollIntoView(true);
  });
}

// window.addEventListener("wheel", function (e) {
//     e.preventDefault();
// }, { passive: false });

// var mHtml = $("html");
// var page = 1;

// mHtml.animate({ scrollTop: 0 }, 10);

// $(window).on("wheel", function (e) {
//     if (mHtml.is(":animated")) return;
//     if (e.originalEvent.deltaY > 0) {
//         if (page == 10) return;
//         page++;
//     } else if (e.originalEvent.deltaY < 0) { if (page == 1) return; page--; } var posTop = (page - 1) * $(window).height();
//     mHtml.animate({ scrollTop: posTop });
// })

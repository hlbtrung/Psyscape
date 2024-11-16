<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '@/assets/main.css';
import router from "./main"
import Banner from './components/Banner.vue';

var BANNER_TITLE = ref("")
var BANNER_CONTENT = ref("")
var BANNER_OUTLINE = ref("")
var BANNER_POSTID = ref("")
var ShowBanner = ref(false)
var loaded = ref(false)
var popup = ref(1)
var IsNoData = ref(false)
var APP_DATABASE = ref({ activities: [{ imageUrl: "", content: "", link: "" }, { imageUrl: "", content: "", link: "" }, { imageUrl: "", content: "", link: "" }], storytelling: [{ title: "", src: "", des: "", postId: "" }], interviewPodcast: [{ src: "", title: "", des: "", postId: "" }], shortVideo: [{ src: "", postId: "" }], knowledge: [{ title: "", outline: "", content: "", postId: "" }] })

onMounted(() => {

  var localData = localStorage.getItem("data")
  if (localData) {
    var data = JSON.parse(localData)
    if (data.introduced) {
      popup.value = 4
    }
  } else {
    localStorage.setItem("data", JSON.stringify({ introduced: true }))
  }
  //? Event: Sharing
  var pathLocation = window.location.pathname
  var onSharePath = false
  var dataSharing = {
    type: "",
    postId: ""
  }
  // Check valid share link
  if (pathLocation.split("/")[1] == "share" && pathLocation.split("/").length >= 4) {
    if (!(pathLocation.split("/")[2] == "knowledge")) return alert("Broken sharing link");

    if (!pathLocation.split("/")[3]) return alert("Mising where post comes from");

    onSharePath = true
    dataSharing.type = "KNOWLEDGE"
    dataSharing.postId = pathLocation.split("/")[3]
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", import.meta.env.VITE_DATA_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      if (!data) return;
      APP_DATABASE.value = data
      if (onSharePath) {
        APP_DATABASE.value.knowledge.forEach((k) => {
          if (k.postId == dataSharing.postId) {
            popup.value = 5
            ShowBannerUp(k.title, k.outline, k.content, k.postId);
          }
        })
      }
      loaded.value = true
    }
  }
  xhr.send();
})

function ShowBannerUp(title: string, outline: string, content: string, postId: string) {
  BANNER_TITLE.value = title;
  BANNER_OUTLINE.value = outline;
  BANNER_CONTENT.value = content;
  BANNER_POSTID.value = postId;
  ShowBanner.value = true;
}
</script>

<template>
  <div id="container" v-if="!loaded">
    <h2>Please wait a moment... </h2>
  </div>
  <div id="container" :style="{ overflow: (popup < 4) ? 'hidden' : '' }" v-if="loaded">
    <!-- Page Introduction -->
    <div id="pages" v-if="popup < 4">
      <div id="contents">
        <div id="page01" :class="{ previous: (popup > 1), popup: (popup == 1) }" class="page">
          <div id="heading">
            <img src="@/assets/logo.png" alt="" style="height: 215px">
            <p style="font-size: 150%;">Welcome to <b>Psyscape</b></p>
            <button id="start-btn" @click="popup++" tabindex="0">Click here to start</button>
          </div>
        </div>
        <div id="page02" :class="{ previous: (popup > 2), popup: (popup == 2) }" class="page" v-if="popup == 2">
          <img src="@/assets/phase01.webp" alt="Our team">
          <div>

            <!-- Title -->
            <b>
              <p style="font-size: 20px;color:orange;display: flex;
    align-items: center;">We are
              <p style="font-size: 21px;color:purple;padding-left: 10px;">unique</p>
              </p>
            </b>
            <span>Chúng mình là nhóm 6 thành viên, tới từ lớp Kỹ năng mềm CC19 của trường đại học Bách khoa TPHCM, bao
              gồm: Thanh Bình, Phát Đạt, Thanh Khiết, Kiến Thịnh, Xuân Thành, Bảo Trung.
            </span>
          </div>
        </div>
        <div id="page03" :class="{ previous: (popup > 3), popup: (popup == 3) }" class="page" v-if="popup == 3">
          <div>
            <b>
              <p style="font-size: 20px;color: orange;display: flex;align-content: center;">What
              <p style="color: red;display: flex;align-items: center;padding-left: 10px;margin: 0;">we do ?</p>
              </p>
            </b>
            <span>Website này phục vụ cho cộng đồng, là nền tảng đăng lên những bài viết, phỏng vấn, talkshow và podcast
              với mục tiêu mang đến cho mọi người một góc nhìn khác cũng như giới thiệu kiến thức về tâm lý học, đặc
              biệt là tâm lý học học đường bằng cách tiếp cận gần gũi, vui vẻ nhưng cũng không thiếu phần trầm lắng
              trong đó. Cả nhóm cùng chung sự quyết tâm và cố gắng vì chủ đề tâm lý học, cố gắng tiến xa, hoàn thành các
              mục tiêu như giới thiệu về tâm lý học học đường và đồng thời mang tới các góc nhìn mới của những sinh viên
              đời thật - việc thật trong các câu chuyện khác nhau. Cố gắng vì đam mê tâm lý học là khát vọng, kim chỉ
              nam lớn nhất của nhóm.</span>

          </div>
          <img src="@/assets/logo.png" alt="Our Product" style="height: 155px">
        </div>
      </div>

      <div id="divide" :style="{ justifyContent: (popup > 1) ? 'space-evenly' : 'center' }">
        <button id="backward" v-if="popup > 1" @click="popup--">&larr;</button>
        <div id="slide-pos">
          <div :class="{ current: popup == 1 }" @click="popup = 1">&#x2022;</div>
          <div :class="{ current: popup == 2 }" @click="popup = 2">&#x2022;</div>
          <div :class="{ current: popup == 3 }" @click="popup = 3">&#x2022;</div>
        </div>
        <button id="next" tabindex="2" v-if="(popup > 1) && (popup < 3)" @click="popup++">&rarr;</button>
        <button id="oke" tabindex="2" @click="popup = 4" v-if="popup == 3">Oke</button>
      </div>
    </div>

    <div id="our-products" v-if="popup == 4">
      <div id="our-activites">
        <div style="height: 10%;">
          <p style="margin: 0;display: flex;justify-content: center;font-size: 120%;padding: 1.8% 0px 0px 0px;">This is our process</p>
        </div>
        <div
          style="width: 100%;padding: 10px;height: 90%;display: flex;flex-direction: column;justify-content: space-evenly;">
          <h1><b>Our Activities</b></h1>
          <div id="self">
            <div class="activity" v-for="activity in APP_DATABASE.activities">
              <img v-if="activity.imageUrl" :src="activity.imageUrl" alt=""
                style="height: 100%;width: 100%;position: fixed;top: 0;left: 0;filter: blur(4.55px);z-index: -1;">
              <p style="color: orange;">{{ activity.content }}</p>
              <a :href="activity.link" style="color: orange;" v-if="activity.link" target="_blank">More info</a>
            </div>
          </div>
          <div class="arrow">
            <a href="#storytelling">
              <img src="@/assets/arrow_down.gif" alt="arrow" height="70px">
            </a>
          </div>
        </div>
      </div>

      <div id="our-podcast">
        <!-- Storytelling -->
        <div id="storytelling">
          <div class="wave"></div>
          <div id="storytelling-container">
            <h1
              style="background:#00b4d8;color: whitesmoke;display: flex;align-items: center;padding-left: 1%;padding-bottom: 1%;">
              Storytelling Podcast</h1>
            <div id="story-container" :style="{ justifyContent: (IsNoData) ? 'center' : 'flex-start' }">
              <div id="notification_nocloud" style="display: flex;justify-content: center;align-items: center;"
                v-if="IsNoData"><img src="@/assets/no_cloud.png" alt="No Cloud" style="margin: 10px;"> Sorry , we
                don't have data</div>
              <div class="story" v-if="!IsNoData" v-for="(story, index)  in APP_DATABASE.storytelling"
                :title="story.title + '-' + story.des">
                <iframe width="87.7%" height="56%" :src="story.src" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <span>{{ story.title }}</span>
                <p style="color: black;">{{ story.des }}</p>
              </div>
            </div>
          </div>
          <div id="breaker" style="background-color: #00b4d8;height: 10px;">
            <div style="background-color: #023e8a;height: 100%;border-radius: 10px 10px 0 0;"></div>
          </div>
        </div>
        <!-- Show Room (Interview + Short Video) -->
        <div id="showroom" v-if="!IsNoData" style="background-color: #023e8a;height: fit-content;width: 100%;">
          <!-- Interview Podcast -->
          <h1 style="color: whitesmoke;margin-left: 1%;display: flex;align-items: center;">Interview Podcast</h1>
          <div id="interview-container">
            <div class="interview" v-for="item in APP_DATABASE.interviewPodcast">
              <iframe width="87.7%" height="78%" :src="item.src" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              <p>{{ item.title }}</p>
            </div>
          </div>
          <!-- Short Video -->
          <h1 style="color: whitesmoke;margin-left: 1%;display: flex;align-items: center;">Short Video</h1>
          <div id="shorts-container">
            <div class="short-video" v-for="shortVideo in APP_DATABASE.shortVideo">
              <iframe width="260" height="500" :src="shortVideo.src" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <!-- Knowledge -->
        <div id="knowledge" style="background-color: #023e8a;height: 100%;width: 100%;">
          <h1 style="color: whitesmoke;margin-left: 1%;display: flex;align-items: center;">Knowledges</h1>
          <div id="knowledge-container" v-if="APP_DATABASE.knowledge">
            <div id="lesson" v-for="self in APP_DATABASE.knowledge"
              @click="ShowBannerUp(self.title, self.outline, self.content, self.postId)">
              <span><b>{{ self.title }}</b></span>
              <br>
              <span style="padding-left: 4px;">{{ self.outline }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div id="footer">
        <div id="remark"><b>Community Project - Psyscape</b></div>

        <div id="brand" style="display: flex;
    width: 27%;
    justify-content: center;
    align-items: center;
    color: white;">
          <img src="@/assets/logo.png" alt="" height="60" width="60">
          <img src="@/assets/logo_bachkhoa.png" alt="" height="90" width="90">

        </div>
        <div id="network"
          style="display: flex;align-items: center;justify-content: space-between;width: 95%;padding: 5px;">
          <div id="contact_information"
            style="display: flex;width: 27%;justify-content: space-around;align-items: center;color: white;">
            <a href="mailto:studentpsyscape@gmail.com" style="outline: none;color: white;">E-mail</a>
            <a href="tel:866117508" style="outline: none;color: white;">Phone</a>
          </div>
          <div id="social_channel" style="display: flex;width: 32%;justify-content: space-around;align-items: center;">
            <a href="https://www.facebook.com/hcmut.psyscape/" target="_blank">
              <img src="@/assets/channel/facebook.png" alt="Facebook" style="height:24px;width:24px;border-radius:4px;">
            </a>
            <a href="https://www.youtube.com/@hcmut.psyscape" target="_blank">
              <img src="@/assets/channel/youtube.png" alt="Youtube" style="height:24px;width:24px;border-radius:4px;">
            </a>
            <a href="https://www.tiktok.com/@studentpsyscape" target="_blank">
              <img src="@/assets/channel/tiktok.png" alt="Tiktok" style="height:24px;width:24px;border-radius:4px;">
            </a>
          </div>
        </div>
        <div style="width: 100%;padding-left: 25px;">
          <br>
          Email: studentpsyscape@gmail.com
          <br>
          Tel: 866117508
          <br>
          Address: 268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
          <br>
        </div>
      </div>
    </div>
    <!-- Facebook Button -->
    <a target="_blank" href="https://www.facebook.com/hcmut.psyscape/" style="position: fixed;
    right: 1%;transition: bottom 0.6s ease-in-out;bottom: 1%;">
      <img src="@/assets/facebook.png" alt="Facebook" v-if="popup > 3" style="
    height: 65px;
    cursor: pointer;">
    </a>
    <!-- Banner -->
    <Banner :title="BANNER_TITLE" :content="BANNER_CONTENT" :outline="BANNER_OUTLINE" :post-id="BANNER_POSTID"
      :show="ShowBanner" @on-hiding="ShowBanner = false"></Banner>
  </div>


</template>

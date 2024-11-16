<style scoped>
div#banner{
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    backdrop-filter:brightness(0.3);
    z-index: 1000;
}
div#content{
    white-space: pre-wrap;
    height: fit-content;
    background: rgb(190, 187, 187);
    padding-left: 2%;
    padding-right: 1%;
    padding-bottom: 15px;
    text-wrap: pretty;
    text-align: justify;
}
div#contentBox{
    width: 0;
    height: 0;
    overflow-y: auto

}
@media only screen and (min-width: 768px) {
  /* For Desktop: */

    div#contentBox{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;

    height: 100%;
    width: 60%;
    background: rgb(190, 187, 187);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    animation: Swipe 0.5s;
    border-radius: 18px 0px 0px 0px;
}
#Close{
    top: 2%;
    right: 2%;
}
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  div#contentBox{

    position: fixed;
    bottom: 0;
    z-index: 1001;
    padding-top: 6%;
    height: 93%;
    width: 100%;
    background: rgb(190, 187, 187);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 25px 25px 0 0;
    animation: SlideUp 0.5s;    
} 
#Close{
    top: 5.5%;
    left: 50%;
    margin: -15px;
}
}
@keyframes FadeOut{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes SlideUp {
    0%{
        height: 0;
        opacity: 0.2;
    }
    100%{
        height: 93%;
        opacity: 1;
    }
}
@keyframes Swipe{
    0%{
        width: 0;
        opacity: 0.2;
    }
    100%{
        width: 60%;
        opacity: 1;
    }
}
#Close{
    position: fixed;
    background: none;
    border: none;
    z-index: 1002;
    animation: FadeOut 1.5s;

}
#Close>img{
    height: 27px;
}
</style>
<template>
  <main>
    <div id="banner" v-if="show">
        <div id="contentBox" @click="onBannerClick($event)">
            <h1 style="margin-left: 3.2%;margin-top: 1%;">{{title}}</h1>
            <h4 style="margin-left: 3.2%;">{{ outline }}</h4>
            <div id="content">
                {{content}}
                <div><br></div>
                <a @click="copyShareLink(postId)" title="sharing this post" style="color: rgb(0, 145, 255);display: flex;justify-content: center;cursor: pointer;width: fit-content;">
                    <svg fill="#0091ff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23px" height="23px" viewBox="0 0 486.46 486.46" xml:space="preserve" stroke="#0091ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M453.323,39.655l-16.564-14.656C418.729,9.021,395.521,0.22,371.405,0.22c-28.223,0-55.118,12.079-73.791,33.143 L250.207,86.86c-6.105,6.876-9.164,15.722-8.608,24.901c0.557,9.166,4.642,17.576,11.518,23.673l4.438,3.94 c6.299,5.594,14.416,8.673,22.842,8.673l2.054-0.059c9.166-0.551,17.582-4.637,23.699-11.523l47.418-53.503 c8.342-9.416,24.169-10.362,33.601-2.026l16.558,14.688c4.748,4.203,7.57,10.021,7.955,16.384 c0.386,6.358-1.722,12.465-5.937,17.208L302.042,246.198c-6.982,7.887-19.377,10.164-28.734,5.342 c-14.577-7.519-33.58-3.93-44.392,8.256l-0.813,0.926c-7.573,8.518-10.727,19.838-8.674,31.104 c2.074,11.198,9.047,20.801,19.153,26.09c13.986,7.311,29.763,11.33,45.621,11.33h0.012c28.21,0,55.117-12.238,73.8-33.308 l103.691-117.046C497.746,138.226,494.004,75.731,453.323,39.655z"></path> <path d="M228.873,347.458c-13.669-12.103-36.426-10.743-48.574,2.938l-47.396,53.487c-8.342,9.412-24.159,10.387-33.58,2.043 l-16.576-14.705c-4.747-4.207-7.57-10.025-7.955-16.383c-0.387-6.348,1.722-12.453,5.935-17.196l103.692-116.974 c6.876-7.765,19.047-10.111,28.297-5.566c15.121,7.448,34.359,3.818,46.05-9.416c7.433-8.374,10.555-19.496,8.586-30.463 c-1.956-11.031-8.747-20.389-18.618-25.666c-14.201-7.604-30.274-11.624-46.466-11.624c-28.223,0-55.118,12.084-73.791,33.151 L24.772,308.038c-36.062,40.666-32.308,103.082,8.361,139.143l16.564,14.482c18.021,15.979,41.229,24.582,65.345,24.582 c0.011,0,0,0,0.011,0c28.223,0,55.129-11.889,73.812-32.957l47.388-53.379c6.116-6.887,9.176-15.691,8.618-24.819 c-0.533-9.068-4.736-17.694-11.538-23.706L228.873,347.458z"></path> </g> </g> </g></svg>
                    sharing this post
                </a>
            </div>
        </div>
        <button id="Close" title="close" v-if="show"><img src="@/assets/close_btn.png" alt=""></button>
    </div>
  </main>
</template>

<script setup lang="ts">
import router from '@/main';

var props = defineProps(['title','outline','content','show','postId'])


var emit = defineEmits(['onHiding'])
var active = false
var pathLocation = window.location.pathname
window.onclick = ()=>{
    if(props.show && active){
        if (pathLocation.split("/")[1] == "share" && pathLocation.split("/").length >= 4) {
            if (!(pathLocation.split("/")[2] == "knowledge")) return;
            if (!pathLocation.split("/")[3]) return;
            window.location.pathname = "/"
        }else{
            router.push("/")
        }
        emit('onHiding')
        active = false
    }else{
        active = true
    }
}
function copyShareLink(postId:string){
  
    navigator.clipboard.writeText(window.location.origin+"/share/knowledge/"+postId).then(
    () => {
      alert("Copied link")
    },
    () => {
      /* clipboard write failed */
    },
  );

}
function onBannerClick(event:MouseEvent){
    event.stopPropagation();
}
</script>
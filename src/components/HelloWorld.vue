<template>
  <!-- <div class="background2-0">
    <div class="background3"></div>
  </div> -->
  <div class="background2">
    <div class="background">
      <span>Hi, I'm Fernanda</span>
      <br />
      <span>Frontend Developer</span>
    </div>
  </div>
  <br />
  <br />
  <br />
  <div>
    <ul style="list-style-type: none">
      <li @click="router.push('/about')">About me</li>
      <li @click="router.push('/projects')">Projects</li>
      <li @click="router.push('/services')">Services</li>
      <li @click="router.push('/contact')">Contact</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
a {
  color: #888;
}
a:hover {
  color: #888;
}
li {
  margin-bottom: 10px;
  font-size: 15px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #888;
  border: 0.5px solid #ffffff1a;
  border-radius: 6px;
  padding: 3px;
  box-shadow: 0 1px 1px #88888832;
  transition: all 0.2s ease-in-out;
}

li:hover {
  transform: scale(1.1);
  cursor: pointer;
  box-shadow: 0 1px 1px #744fd2;
}
/* 
li:active {
  box-shadow: 0 2px 2px #4311c0;
  transform: scale(0.9);
} */

.background {
  /* background-color: #4d4d4d; */
  color: #ffffff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  z-index: 2;
}
.background2 {
  background-color: #242424ff;
  border-radius: 100%;
  border: 2px solid #744fd2;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  box-shadow: 0 0 40px #744fd2;
  animation: pulse 2s infinite;
}


.background2:hover {
  box-shadow: 0 0 40px #4311c0;
}
/* .background2-0 {
  color: #ffffff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  z-index: -1;
  position: absolute;
  top: 10%;
  left: -40px;
}

.background3 {
  z-index: -2;
  border-radius: 20px 150px 10px 100px;
  border: 2px solid #997fda;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: end;
  align-items: end;
  box-shadow: 0 0 40px #977dd7;
  animation: pulse2 2s infinite;
} */

@keyframes pulse {
  0% {
    box-shadow: 0 0 50px #744fd2;
  }
  50% {
    box-shadow: 0 0 50px #4311c0;
  }
  100% {
    box-shadow: 0 0 50px #744fd2;
  }
}
/* @keyframes pulse2 {
  0% {
    box-shadow: 0 0 50px #e1daf4;
  }
  50% {
    box-shadow: 0 0 50px #ab9fca;
  }
  100% {
    box-shadow: 0 0 50px #e1daf4;
  }
} */
</style>

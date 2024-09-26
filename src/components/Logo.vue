<template>
    <img src="@/assets/images/logo-dark.svg" class="logo-dark" alt="">
    <img src="@/assets/images/logo-light.svg" class="logo-light" alt="">
    <span class="h-header">ravo</span> <small class="h-text">in collab w/ Temaly</small>
</template>



<style lang="scss">

.nav-logo{
    position: relative;
    .logo-light{
      display: none;
    }
    span{
        margin-left: 20px;
        font-size: 1.4rem;
    }
    img{
        width: 16px;
        position: absolute;
        top: 50%; transform: translateY(-50%);
    }
    small{
        font-size: .5rem;
        position: absolute;
        bottom: -11px;
        left: 23px;
    }
}




.dark-theme{
    .nav-logo{
     .logo-light{
      display: block;
     }
     .logo-dark{
      display: none;
     }
    }
  }
</style>
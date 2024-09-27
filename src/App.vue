<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  

  <RouterView />
</template>

<style lang="scss">


.h-top{
  margin-top: 20px;
  &.xs{margin-top: 10px;}
  &.md{margin-top: 40px;}
  &.lg{margin-top: 60px;}

}

main:not(.admin-main){
  max-width: var(--sl-panel-width);
  margin: 0 auto;
  padding: 150px 10px 50px 10px;
}

.switch{
    position: fixed;
    left: 20px; bottom: 20px;
    z-index: 999;
  }

.panel-body{
    padding: 20px;
    border: 1px solid var(--sl-border-color);
    margin-top: 50px;
    .body-container{
        max-width: 600px;
        margin: 40px auto;
    }
}
.highlight{
  color: var(--sl-brand-color);
}
.underline{
  text-decoration: underline;
}

.h-container{
  max-width: var(--sl-container-width);
  margin: 0 auto;
  padding: 10px;
}

.dark-theme{
  .panel-body{
    border-color: var(--sl-dark-primary);
    background-color: var(--sl-dark-primary);

  }
}

ul{
    list-style: none;
    padding: 0px;
}
p{
  line-height: 1.4;
}
// admin styles
main.admin-main{
    max-width: 1200px;
    margin-left: 200px;
    padding: 20px;
}

.main-header{
    grid-template-columns: repeat(2, 1fr);
    .breadcrumb{
        text-align: right;
        h4{
            font-weight: 400;
            a{
                color: var(--sl-brand-color);
            }
        }
    }
}




</style>

<template>
    <div v-show="cookies && !cookies.get('userTracker') && !this.$store.state.userTracker.option"  class="user-tracker" :class="classCustom">
      <div class="user-tracker__wrapper">
        <a v-if=" privacyPolicyLink" class="user-tracker__info" :href="privacyPolicyLink">i</a>
        <h3 class="user-tracker__title">
          {{title}}
        </h3>
      </div>
      <form class="user-tracker__form" @submit.prevent="allowUserTracker">
        <select v-model="option" name="privacy-policy" :class="{'small': option === 'allow metrics'}">
          <option selected value="allow metrics"> {{ allowTitle }} </option>
          <option v-if="criticalTitle" value="only critical">{{ criticalTitle }}</option>
          <option value="no actions">{{ disallowTitle }}</option>
        </select>
        <button class="user-tracker__btn">{{ buttonTitle }}</button>
      </form>
    </div>
</template>

<script>
  import VueCookies from 'vue-cookies';
export default {
  name: "UserTrackerComponent",

  props: {
    privacyPolicyLink: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: 'Choose the way to communicate with this website:',
      required: false
    },
    buttonTitle: {
      type: String,
      default: 'Ok',
      required: false
    },
    allowTitle: {
      type: String,
      default: 'Allow metrics',
      required: false,
    },
    criticalTitle: {
      type: String,
      default: 'Only critical actions',
      required: false,
    },
    disallowTitle: {
      type: String,
      default: 'Disallow any actions',
      required: false,
    },
    classCustom: {
      type: String,
      default: '',
      required: false,
    }
  },

  data() {
    return {
      option: 'allow metrics',
      cookies: null,
    }
  },

  methods: {
    allowUserTracker () {
      switch(this.option) {
        case 'only critical':
          VueCookies.set('userTracker', this.option);
          this.$store.commit('SET_USER_TRACKER', {option: 'only critical', localStorage: true, cookies: true, metrics: false})
        break;

        case 'allow metrics':
          VueCookies.set('userTracker', this.option);
          this.$store.commit('SET_USER_TRACKER', {option: 'allow metrics', localStorage: false, cookies: true, metrics: true})

        break;

        default: 
          VueCookies.set('userTracker', this.option);
          this.$store.commit('SET_USER_TRACKER', {option: 'no actions', localStorage: false, cookies: false, metrics: false})
        }
    }, 
  },

  mounted() {
    this.$nextTick(() => {
      this.cookies = $cookies

      if($cookies.get('userTracker') === 'allow metrics') {
        this.$emit('activateTracker');
      }
    })


  }

}
</script>

<style>

  .user-tracker select {
    background: none;
    appearance: none;
  }
  .user-tracker {
    position: fixed;
    bottom: 1vh;
    right: 1vh;
    padding: 1rem 2rem;
    max-width: 550px;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #111;
    text-align: left;
    z-index: 10;
    overflow: hidden;
  }

  .user-tracker__title {
    font-size: 1rem;
    font-family: inherit;
    font-weight: 500;
    margin-bottom: 0;
    color: #fff;
    text-align: left;
  }

  .user-tracker__form, .user-tracker__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    font-family: 'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .user-tracker__form {
    padding-left: 1rem;
  }

  .user-tracker__form select {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.335' height='4.668' viewBox='0 0 8.335 4.668'%3E%3Cpath id='Path_5211' data-name='Path 5211' d='M1081.027,725.128l3.461,3.461,3.461-3.461' transform='translate(-1080.32 -724.42)' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1'/%3E%3C/svg%3E") no-repeat 95% 50%;
    background-size: 6%;
    background-color: transparent;
    padding: 0.4rem 0.8rem;
    padding-right: 1.6rem;
    margin-right: 0.5rem;
    font-size: 70%;
    font-weight: 600;
    border: 1px solid #fff;
    border-radius: 2rem;
    color: #fff;
    text-transform: capitalize;
    cursor: pointer;
  }

  .user-tracker__form select option {
    color: #2E324D;
  }

  .user-tracker__form select.small {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.335' height='4.668' viewBox='0 0 8.335 4.668'%3E%3Cpath id='Path_5211' data-name='Path 5211' d='M1081.027,725.128l3.461,3.461,3.461-3.461' transform='translate(-1080.32 -724.42)' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1'/%3E%3C/svg%3E") no-repeat 92% 55%;
    background-size: 7%;
    width: 168px;
  }

  .user-tracker__wrapper:first-of-type {
    margin-bottom: 0.5rem;
  }
  
  .user-tracker__btn {
    padding: 0.3rem 1rem; 
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    color: #111;
    background-color: #fff;
    border: 1px solid transparent;
    text-align: left;
    cursor: pointer;
    border-radius: 18px;
  }

  /* .user-tracker__btn:hover {
    background-color: transparent !important;
    border: 1px solid transparent !important;
  } */

  .user-tracker__info {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    margin-right: calc(2rem / 2);
    font-weight: 600;
    color: #111;
    background-color:#fff;
    border-radius: 100%;
  }

  @media screen and (max-width: 790px) {
    .user-tracker {
      width: 100%;
      right: -3rem;
      bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .user-tracker__info {
      flex-shrink: 0;
    }

    .user-tracker__form {
      padding-left: 0;
    }

    .user-tracker__title  {
      font-size: 0.8rem;
    }

    .user-tracker__btn {
      font-size: 1rem;
    }
  }

</style>
<template>
  <div>
    <header>
      <div class="inner">
        <div
          class="open-nav-drawer"
          @click="onNav('LNB')"></div>
        <a
          href="javascript:void(0)"
          class="logo"></a>
        <div class="search">
          <input
            v-model="searchText"
            type="text"
            placeholder="찾고 싶은 상품을 검색해 보세요!"
            @keyup.enter="search" />
          <!--BEM-->
          <div
            class="search__icon"
            @click="search"></div>
        </div>
        <div class="ranking">
          <!-- Slider main container -->
          <div
            ref="swiper"
            class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(rank, index) in rankings.rankings"
                :key="rank.name"
                class="swiper-slide">
                <a :href="rank.href">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">{{ rank.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <ul class="right-menu">
          <li class="my-menu">
            <a href="javascript:void(0)"></a>
            <ul class="my-menu__inner">
              <li>
                <a href="javascript:void(0)">나의 쿠폰</a>
              </li>
              <li>
                <a href="javascript:void(0)">주문/배송조회</a>
              </li>
              <li>
                <a href="javascript:void(0)">취소/반품/교환</a>
              </li>
              <li>
                <a href="javascript:void(0)">고객센터</a>
              </li>
              <li>
                <a href="javascript:void(0)">회원정보</a>
              </li>
            </ul>
          </li>
          <li class="my-shipment">
            <a href="javascript:void(0)"></a>
          </li>
          <li class="my-cart">
            <a href="javascript:void(0)"></a>
          </li>
          <li
            class="my-recent"
            @click="onNav('RNB')">
            <a href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </header>
    <div class="bottom-header">
      <div class="inner">
        <ul class="sub-menu">
          <li>
            <a href="javascript:void(0)">베스트</a>
          </li>
          <li>
            <a href="javascript:void(0)">쿠폰/혜택</a>
          </li>
          <li>
            <a href="javascript:void(0)">기획전</a>
          </li>
          <li>
            <a href="javascript:void(0)">오늘장보기</a>
          </li>
          <li>
            <a href="javascript:void(0)">T공식대리점</a>
          </li>
          <li>
            <a
              class="shocking"
              href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  data () {
    return {
      searchText: '',
      rankings: {

      },
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    async init () {
      this.rankings = await this.$fetch({
        requestName: 'rankings',
      });

      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          direction: 'vertical',
          speed: 1000, // ms 단위
          autoplay: {
            delay: 3000  // ms 단
          },
          loop: true,
        });
      });
    },
    onNav(name) {
      this.$store.dispatch('navigation/onNav', name);
    },
    async search() {
      if (!this.searchText.trim()) return;
      const res = await this.$search({
        searchText: this.searchText,
      });
      console.log(res);
      // location = res;
    },
  }
}
</script>

<style scoped lang="scss">
  header {
    .inner {
      display: flex;
      align-items: center;
      height: 120px;
      .open-nav-drawer {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow:
            0 2px 6px rgba(#000, .06),
            0 0 1px rgba(#000, .4);
        display: flex;
        justify-content: center;
        align-items: center;
        &::after {
          content: "";
          //display: block;
          width: 36px;
          height: 36px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -302px -203px;
          background-size: 363px;
        }
      }
      .logo {
        width: 94px;
        height: 40px;
        //display: block;
        margin: 0 24px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -162px 0;
        background-size: 363px;
        cursor: pointer;
      }
      .search {
        position: relative;
        input {
          width: 500px;
          height: 50px;
          padding: 0 27px;
          border: 1px solid #ddd;
          border-radius: 25px;
          box-sizing: border-box;
          background-color: #fafafa;
          font-size: 18px;
          outline: none;
          font-family: 'Noto Sans KR', sans-serif;
          &::placeholder {
            color: #bbb;
          }
        }
        // & ==> .search, .search__icon {}
        &__icon {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 0;
          right: 0;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -162px -45px;
          background-size: 363px;
          cursor: pointer;
        }
      }
      .ranking {
        width: 210px;
        margin: 0 30px;
        .swiper-container {
          width: 182px;
          height: 28px;
          .swiper-slide {
            a {
              display: block;
              height: 28px;
              line-height: 28px;
              text-decoration: none;
              font-size: 15px;
              color: #333;
              font-weight: 700;
              span.index {
                margin-right: 10px;
                color: #f43142;
                font-style: italic;
              }
              &:hover span.name {
                color: #f43142;
              }
            }
          }
        }
      }
      .right-menu {
        display: flex;
        > li {
          margin-right: 25px;
          padding: 7px 0;
          position: relative;
          &:last-child {
            margin-right: 0;
          }
          > a {
            display: block;
            width: 48px;
            height: 48px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-size: 363px;
          }
        }
        .my-menu {
          a {
            background-position: -106px -145px;
            &:hover {
              background-position: -53px -145px;
            }
          }
          &:hover {
            .my-menu__inner {
              display: block;
            }
          }
          .my-menu__inner {
            display: none;
            width: 170px;
            padding: 15px 0;
            position: absolute;
            top: 60px;
            left: 0;
            border: 1px solid #eee;
            border-radius: 6px;
            z-index: 2;
            background-color: #fff;
            li {
              a {
                display: block;
                padding: 7px 10px 7px 25px;
                font-size: 15px;
                &:hover {
                  color: #f43142;
                  background-color: #fafafa;
                }
              }
            }
          }
        }
        .my-shipment a {
          background-position: 0px -198px;
          &:hover {
            background-position: -159px -145px;
          }
        }
        .my-cart a {
          background-position: -53px -198px;
          &:hover {
            background-position: 0px -145px;
          }
        }
        .my-recent a {
          background-position: -94px -70px;
          &:hover {
            background-position: -106px -198px;
          }
        }
      }
    }
  }

  .bottom-header {
    border: 1px solid #f1f1f1;
    .sub-menu {
      display: flex;
      li {
        font-size: 17px;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        a {
          display: flex;
          align-items: center;
          height: 66px;
          &.hover {

          }
          &.shocking {
            width: 63px;
            background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
            background-size: 363px;
            background-position: -94px 0;
          }
        }
      }
    }
  }
</style>

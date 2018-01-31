<template>
    <div>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
           width="0" height="0" viewBox="0 0 1920 1080" xml:space="preserve" style="display: none;">
          <defs>
            <filter id="blur0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" />
            </filter>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5 0" />
            </filter>
            <filter id="blur2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12 0" />
            </filter>
            <filter id="blur3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20 0" />
            </filter>
            <filter id="blur4">
              <feGaussianBlur in="SourceGraphic" stdDeviation="35 1" />
            </filter>
            <filter id="blur5">
              <feGaussianBlur in="SourceGraphic" stdDeviation="50 1" />
            </filter>
          </defs>
        </svg>
        <div class="photo-detail">
            <div class="photo-detail__container">
                <slick ref="slick" v-on:beforeChange="beforeChange()" v-on:afterChange="afterChange()"
                       :options="slickOptions" class="photo-detail__slick">
                    <div class="photo-detail__slide" v-for="(photo, index) in photos">
                        <div class="photo-detail__wrapper">
                            <img
                                    :src="index === currentPhotoId ? 'http://lukas.markuswinkelmann.de/fotos/1920_' + photo.filename : null"
                                    :data-lazy="index !== currentPhotoId ? 'http://lukas.markuswinkelmann.de/fotos/1920_' + photo.filename : null"
                                    :srcset="index === currentPhotoId ? getSrcSet(photo) : null"
                                    :data-srcset="index !== currentPhotoId ? getSrcSet(photo) : null"
                                    sizes="100vw"
                                    data-sizes="100vw"
                                    class="photo-detail__image">

                            <div class="caption">
                                <span class="caption__title">{{photo.title}}</span>
                                <span class="caption__location"><span class="caption__dash">— </span>{{photo.location}}</span>
                                <span class="caption__year">&nbsp;({{photo.year}})</span>
                            </div>
                        </div>
                    </div>
                </slick>
            </div>
        </div>
        <router-link :to="{ name: 'Photos' }" class="close"></router-link>
    </div>
</template>

<script>
    import SrcSetService from "../services/srcset.service";
    import Slick from 'vue-slick';
    import {findIndex} from "lodash";

    export default {
        name: 'Photo',
        components: {Slick},
        data() {
            return {
                widths: [1280, 1920, 2560, 3840],
                slickOptions: {
                    lazyLoad: 'anticipated',
                    arrows: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    centerMode: false,
                    variableWidth: false,
                    touchMove: false,
                    nextArrow: '<button class="slick-arrow slick-next"></button>',
                    prevArrow: '<button class="slick-arrow slick-previous"></button>'
                },
                currentPhotoId: 0
            }
        },
        computed: {
            photos () {
                return this.$store.state.photos
            }
        },
        methods: {
            getSrcSet: function (photo) {
                return SrcSetService.calculateSrcSet(this.widths, photo);
            },
            beforeChange() {
                document.querySelector(".slick-list").classList.add('do-transition');
            },
            afterChange() {
                document.querySelector(".slick-list").classList.remove('do-transition');
            },
            setInitialSlide() {
                this.slickOptions.initialSlide = findIndex(this.photos, ['id', parseInt(this.$route.params.id, 10)]);
            }
        },
        beforeUpdate() {
            if (this.$refs.slick) {
                this.$refs.slick.destroy();
            }
        },
        updated() {
            if (this.$refs.slick) {
                this.setInitialSlide();
                this.$refs.slick.create();
            }
        },
        created: function () {
            this.setInitialSlide();
        }
    }
</script>

<style lang="scss">
    @import "../styles/shared/index";
    @import "../../node_modules/slick-carousel/slick/slick";

    .overflow {
        overflow: hidden;
    }

    .photo-detail {
        width: 100vw;
        height: 100vh;
        position: relative;
        z-index: 1;

        &__container {
            max-width: 100%;
            max-height: 100%;
        }

        &__slick {
            max-width: 100%;
            max-height: 100%;
        }

        &__slide {
            width: 100vw !important;
            height: 100vh;
            position: relative;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            padding: rem(15);

            @include respond-to('tablet') {
                padding: rem(80);
            }
        }

        &__image {
            max-width: 100%;
            max-height: 100%;
            align-self: center;
            box-shadow: 0 0 40px rgba(0, 0, 0, .75);

            &:focus {
                outline: 0;
            }
        }

        &__wrapper {
            height: 100%;
            width: 100%;
            /* margin: 0 auto; */
            padding-bottom: rem(64);
            position: relative;
            display: flex;
            justify-content: center;

            @include respond-to("medium") {
                padding-bottom: rem(28);
            }
        }

        &__close-wrapper {
            display: inline-block;
            position: relative;
        }
    }

    .caption {
        padding: rem(0 0);
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        color: rgba(255, 255, 255, .75);
        font-size: rem(15);
        height: rem(54);
        letter-spacing: rem(2);
        align-self: center;

        @include respond-to("medium") {
            height: rem(18);
        }

        &__year {
            color: rgba(255, 255, 255, .25);
        }

        &__location {
            text-transform: uppercase;
        }

        &__dash {
            display: none;

            @include respond-to("medium") {
                display: inline;
            }
        }

        &__title,
        &__location,
        &__year {
            display: block;

            @include respond-to("medium") {
                display: inline;
            }
        }
    }

    @keyframes motion-blur {
        0% {
            filter: url(#blur0);
            transform: scale(1, 1);
        }
        15% {
            filter: url(#blur1);
            transform: scale(1, 0.99);
        }
        30% {
            filter: url(#blur2);
            transform: scale(1, 0.98);
        }
        45% {
            filter: url(#blur3);
            transform: scale(1.1, 0.97);
        }
        60% {
            filter: url(#blur4);
            transform: scale(1.2, 0.96);
        }
        75%,
        100% {
            filter: url(#blur5);
            transform: scale(1.35, 0.95);
        }
    }

    .do-transition {
        animation: motion-blur 0.05s linear forwards,
        motion-blur 0.2s linear reverse forwards 0.05s;
    }

    .close {
        color: #fff;
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 100000;
        text-decoration: none;
        border-radius: 100%;
        width: rem(50);
        height: rem(50);
        background-color: rgba(#fff, 1);
        box-shadow: rem(0 2 10 2) rgba(#000, 0.5);

        &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: rem(-20);
            margin-top: rem(-20);
            width: rem(40);
            height: rem(40);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M26 14L14 26M26 26L14 14'/%3E%3C/svg%3E");
        }
    }

    .slick-arrow {
        position: absolute;
        top: 50%;
        margin-top: rem(-25);
        left: 15px;
        z-index: 100000;
        text-decoration: none;
        border-radius: 100%;
        border: 0;
        width: rem(50);
        height: rem(50);
        background-color: rgba(#fff, 1);
        box-shadow: rem(0 2 10 2) rgba(#000, 0.5);
        color: #000;
        display: none !important;

        @include respond-to("tablet") {
            display: block !important;
        }

        &:after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: rem(-20);
            margin-left: rem(-20);
            width: rem(50);
            height: rem(50);
        }
    }

    .slick-next {
        left: auto;
        right: 15px;

        &:after {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M27 20H12M28 20l-6 6M28 20l-6-6'/%3E%3C/svg%3E");
        }
    }

    .slick-previous {
        &:after {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M13 20h15M12 20l6-6M12 20l6 6'/%3E%3C/svg%3E");
        }
    }
</style>

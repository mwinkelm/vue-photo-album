<template>
    <div>
        <header class="header">
            <div class="logo">
                <a routerLink="/" class="logo__link">
                    <img src="../assets/lukas.svg" width="120" height="43" class="logo__image">
                </a>
            </div>
        </header>
        <main v-if="photos" class="home">
            <ul class="photos">
                <li v-for="photo in photos" class="photos__column">
                    <router-link :to="{ name: 'Photo', params: { id: photo.id }}" class="photo">
                        <div class="photo__link">
                            <img :srcset="getSrcSet(photo, widths)"
                                 sizes="(min-width: 1280px) 19vw, (min-width: 1024px) 21vw, (min-width: 568px) 30vw, 44vw"
                                 :alt="photo.title"
                                 :src="'http://lukas.markuswinkelmann.de/fotos/270_' + photo.filename"
                                 class="photo__image">
                        </div>
                    </router-link>
                </li>
            </ul>
            <p v-for="location in filteredItems">{{location.location}}</p>
        </main>
    </div>
</template>

<script>
    import SrcSetService from "../services/srcset.service";
    import {find} from "lodash";

    export default {
        name: 'Photos',
        data() {
            return {
                widths: [170, 270, 365, 540, 730]
            }
        },
        computed: {
            photos () {
                return this.$store.state.photos
            },
            filteredItems() {
                return this.$store.getters.locations;
            }
        },
        methods: {
            getSrcSet(photo, widths) {
                return SrcSetService.calculateSrcSet(widths, photo);
            }
        },
        watch: {
            '$route'(to, from) {
                console.log("ROUTE PHOTOS", to, from);
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/shared/index";

    .logo {
        margin: rem(20 0);

        &__image {
            vertical-align: middle;
        }

        &__text {
            color: rgba(255, 255, 255, 0.5);
            margin: rem(10 0 0);
            letter-spacing: rem(3);
        }

        &__link {
            text-decoration: none;
        }
    }

    .photos {
        @extend %reset-list;
        @extend %clearfix;

        padding: rem(0 10);

        @include respond-to("small") {
            padding: rem(0 15);
        }

        @include respond-to("large") {
            padding: rem(0 20);
        }

        @include respond-to("xlarge") {
            padding: rem(0 15);
        }

        &__column {
            float: left;
            padding: rem(0 10);
            width: 50%;

            @include respond-to("small") {
                padding: rem(0 15);
                width: 33.333333333%;
            }

            @include respond-to("large") {
                padding: rem(0 20);
                width: 25%;
            }

            @include respond-to("xlarge") {
                padding: rem(0 15);
                width: 20%;
            }
        }
    }

    .photo {
        position: relative;
        height: 0;
        padding-bottom: 100%;
        background-color: rgba(255, 255, 255, 0.05);
        margin-bottom: rem(20);
        border-radius: rem(5);
        display: block;

        &:hover,
        &:focus {
            background-color: rgba(57, 147, 153, 0.5);
        }

        @include respond-to("small") {
            margin-bottom: rem(30);
        }

        @include respond-to("large") {
            margin-bottom: rem(40);
        }

        @include respond-to("xlarge") {
            margin-bottom: rem(30);
        }

        &__image {
            position: absolute;
            max-height: 100%;
            max-width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-shadow: rem(0 0 20) rgba(0, 0, 0, .75);
        }
    }
</style>

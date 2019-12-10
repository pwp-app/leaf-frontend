<template>
    <el-avatar class="user-avatar" :size="size" :src="avatarUrl"></el-avatar>
</template>

<script>
import Encryption from '@/utils/hashutil.js'
export default {
    name: 'app.common.useravatar',
    props: ['size'],
    computed: {
        avatarUrl(){
            return this.getAvatarUrl();
        }
    },
    methods: {
        getAvatarUrl(){
            if (typeof this.$store.state.userinfo.email == 'undefined' || this.$store.state.userinfo.email == null || this.$store.state.userinfo.email.length < 1){
                return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            } else {
                let email_hash = Encryption.md5(this.$store.state.userinfo.email);
                return 'https://www.gravatar.com/avatar/'+email_hash+'?s='+this.size
            }
        }
    }
}
</script>

<template>
    <div class="column flex-center q-pa-md" style="margin: auto;">
        <div class="text-center text-h5 q-pa-md">
            Sign In Here
        </div>
        <div class="column item-center form-container q-pa-xl">
            <q-form @submit="onSubmit" @reset="onReset" class="text-center q-gutter-sm">
                <q-input filled v-model="email" label="Your email *" hint="Enter your email address" lazy-rules
                    :rules="emailRules" />

                <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Your password *"
                    lazy-rules :rules="passwordRules">
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="togglePassword" />
                    </template>
                </q-input>

                <div class="q-mb-md">
                    <q-btn type="submit" label="Submit" color="primary" @click="onSubmit" />
                    <q-btn type="reset" class="q-ml-xs" label="Reset" color="primary" flat />
                </div>
            </q-form>
            <div class="flex flex-center">
                <span class="divider-line"></span>
                <span class="bg-white q-px-md">or</span>
                <span class="divider-line"></span>
            </div>

            <div class="flex flex-center q-pa-md" style="margin: auto;">
                <q-btn class="q-pa-sm" @click="signInWithGoogle" label="Sign in with Google">
                    <template v-slot:icon>
                        <q-avatar>
                            <img :src='googleIcon' alt="google">
                        </q-avatar>
                    </template>
                </q-btn>
            </div>
            <div class="flex flex-center q-pa-xs" style="margin: auto;">
                <p>まだ登録されていない方は<a href="/register">こちら</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
// Firebase Authentication SDK の関数
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { axios } from '../boot/axios';
import { useRouter } from 'vue-router';
import googleIcon from '../assets/google.png'

const $q = useQuasar();
const email = ref('');
const password = ref('');
const router = useRouter();

const showPassword = ref(false);

const emailRules = [
    val => val && val.length > 0 || 'Please type something',
    val => /.+@.+\..+/.test(val) || 'Please enter a valid email address'
]

const passwordRules = [
    val => (val && val.length >= 8) || 'Password must be at least 8 characters',
    val => /^[a-zA-Z0-9]+$/.test(val) || 'Password must contain only alphabets and numbers'
]

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const onSubmit = async () => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        
        // test
        console.log(idToken);

        localStorage.setItem('jwt', idToken);

        const response = await axios.get('http://localhost:3000/api/protected', {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (response.status === 200) {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'リダイレクトしています'
            })
            // 同じ環境のぺージに推移
            // setTimeout(() => router.push({ name: 'main' }), 1000);
            
            // 外部のページに推移 
            setTimeout(() => {
                window.location.href = 'https://takamin.site';
            }, 1000);
        }
    } catch (error) {
        console.error(error)
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.message
        })
    }
}

const onReset = () => {
    email.value = ''
    password.value = ''
    accept.value = false
}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            setTimeout(() => router.push({ name: 'main' }), 1000);
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style>
.form-container {
    border: 1px solid #e0e0e0;
    border-radius: 5%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px;
    background: white;
}

.divider-line {
    flex-grow: 1;
    height: 1px;
    background: #e0e0e0;
}
</style>
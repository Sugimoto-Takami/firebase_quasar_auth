<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'
import { useRouter } from 'vue-router';

const $q = useQuasar();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const accept = ref(false)
const router = useRouter();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const emailRules = [
    val => val && val.length > 0 || 'Please type something',
    val => /.+@.+\..+/.test(val) || 'Please enter a valid email address'
]

const passwordRules = [
    val => (val && val.length >= 8) || 'Password must be at least 8 characters',
    val => /^[a-zA-Z0-9]+$/.test(val) || 'Password must contain only alphabets and numbers'
]

const confirmPasswordRules = [
    val => val === password.value || 'Passwords do not match'
];

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            setTimeout(() => router.push({ name: 'login' }), 1000);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
}

const onSubmit = () => {
    if (!accept.value) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
        })
        return;
    } else if (password.value !== confirmPassword.value) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Password do not match'
        });
        return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
            })
            setTimeout(() => router.push({ name: 'login' }), 1000);
        })
        .catch(error => {
            console.error(error)
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: error.message
            })
        })
}

const onReset = () => {
    email.value = ''
    password.value = ''
    accept.value = false
}
</script>

<template>
    <div class="column flex-center q-pa-md" style="margin: auto;">
        <div class="text-center text-h5 q-pa-md">
            Register Here
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


                <q-input filled v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm your password *" lazy-rules :rules="confirmPasswordRules">
                    <template v-slot:append>
                        <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="toggleConfirmPassword" />
                    </template>
                </q-input>

                <q-toggle v-model="accept" label="I accept the license and terms" />

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

            <div class="flex flex-center q-pa-sm" style="margin: auto;">
                <q-btn class="q-pa-sm" icon="event" @click="signInWithGoogle" label="Sign in with Google" />
            </div>
            <div class="flex flex-center q-pa-xs" style="margin: auto;">
                <p>すでに登録されている方は<a href="/login">こちら</a></p>
            </div>
        </div>
    </div>
</template>


<style>
.form-container {
    border: 1px solid #e0e0e0;
    border-radius: 5%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    padding: 30px;
    background: white;
  }

.divider-line {
    flex-grow: 1;
    height: 1px;
    background: #e0e0e0;
}
</style>
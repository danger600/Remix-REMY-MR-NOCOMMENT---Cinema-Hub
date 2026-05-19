<script setup lang="ts">
import { ref } from 'vue';
import { Send, Bell, CheckCircle2 } from 'lucide-react';

const email = ref('');
const isSubscribed = ref(false);

const handleSubmit = () => {
  if (!email.value) return;
  isSubscribed.value = true;
  email.value = '';
};
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-20 pb-40">
    <div class="relative glass rounded-[48px] p-12 md:p-24 overflow-hidden border border-white/5">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div class="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <div class="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 border border-primary/20">
          <Bell :size="32" class="text-primary animate-bounce" />
        </div>
        
        <h2 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
          Stay in the building <br />
          <span class="text-primary">Join the family</span>
        </h2>
        
        <p class="text-xl text-white/50 font-medium italic mb-12 max-w-xl">
          Turaheruka amakuru mashya, films nshya, hamwe n'itangazwa rya Yawed mixes mbere y'abandi bose. Stay alert!
        </p>

        <form v-if="!isSubscribed" @submit.prevent="handleSubmit" class="w-full flex flex-col sm:flex-row gap-4">
          <input 
            type="email"
            v-model="email"
            placeholder="Injiza email yawe..."
            class="flex-1 bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-primary transition-all font-bold italic"
            required
          />
          <button 
            type="submit"
            class="btn-netflix !py-5 flex items-center justify-center gap-4 group shrink-0"
          >
            Join Now 
            <Send :size="20" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
        <Transition name="scale">
          <div 
            v-if="isSubscribed"
            class="flex items-center gap-4 bg-green-500/10 text-green-500 px-12 py-6 rounded-[32px] border border-green-500/20"
          >
            <CheckCircle2 :size="32" />
            <span class="text-xl font-black uppercase italic tracking-tighter">Murakoze Kwiyandikisha!</span>
          </div>
        </Transition>
        
        <div class="mt-12 flex items-center gap-8 text-white/20">
          <div class="flex flex-col items-center">
            <span class="text-2xl font-black text-white/40 italic">25k+</span>
            <span class="mono-label !text-[8px]">Members</span>
          </div>
          <div class="w-px h-8 bg-white/10" />
          <div class="flex flex-col items-center">
            <span class="text-2xl font-black text-white/40 italic">Daily</span>
            <span class="mono-label !text-[8px]">Updates</span>
          </div>
          <div class="w-px h-8 bg-white/10" />
          <div class="flex flex-col items-center">
            <span class="text-2xl font-black text-white/40 italic">Exclusive</span>
            <span class="mono-label !text-[8px]">Content</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scale-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>

<script setup lang="ts">
import { Play, TrendingUp, MessageSquare } from 'lucide-react';

defineProps<{
  onSuggestionClick: () => void;
}>();
</script>

<template>
  <section id="home" class="relative h-[95vh] flex items-center justify-center overflow-hidden">
    <!-- Dynamic Background -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-[url('/src/assets/images/shaka_flime_poster_1779178669774.png')] bg-cover bg-center brightness-[0.3]" />
      <div class="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/60" />
      <div class="absolute inset-0 bg-gradient-to-r from-secondary/80 via-transparent to-transparent" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <div class="max-w-2xl animate-fade-in-left">
        <div class="flex items-center gap-3 mb-8">
           <div class="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-lg border border-primary/30">
             <TrendingUp :size="12" class="text-primary" />
             <span class="mono-label !text-primary !tracking-widest">#1 in Rwanda today</span>
           </div>
           <span class="mono-label">Tiger Nsanzi Official</span>
        </div>

        <h1 class="text-[clamp(4rem,15vw,12rem)] font-black uppercase italic tracking-tighter mb-8 leading-[0.75] select-none">
          SHAKA <br /> <span class="text-primary">FLIME</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-white/50 mb-12 leading-tight font-medium max-w-xl group">
           Iyi ni filime yubuturo bwumwami Shaka Zulu. <span class="text-white">DANGER IN THE BUILDING!</span>
        </p>

        <div class="flex flex-wrap gap-6">
          <button class="btn-netflix flex items-center gap-4 px-12 group">
            <Play :size="20" fill="currentColor" class="group-hover:scale-125 transition-transform" />
            Reba Noneho
          </button>
          <button 
            @click="onSuggestionClick"
            class="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white font-black py-4 px-10 rounded-2xl transition-all duration-300 flex items-center gap-4 border border-white/10 italic uppercase tracking-tighter cursor-pointer"
          >
            <MessageSquare :size="20" />
            Tanga Igitekerezo
          </button>
        </div>
        
        <div class="mt-12 flex items-center gap-8 text-white/40">
          <div class="flex flex-col">
            <span class="text-2xl font-black text-white italic">2026</span>
            <span class="text-[10px] uppercase font-bold tracking-widest">Released</span>
          </div>
          <div class="w-px h-10 bg-white/10" />
          <div class="flex flex-col">
            <span class="text-2xl font-black text-white italic">9.2</span>
            <span class="text-[10px] uppercase font-bold tracking-widest">Rating</span>
          </div>
          <div class="w-px h-10 bg-white/10" />
          <div class="flex flex-col">
            <span class="text-2xl font-black text-white italic">4K</span>
            <span class="text-[10px] uppercase font-bold tracking-widest">Quality</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Side Visual Element -->
    <div class="absolute right-0 bottom-0 opacity-20 pointer-events-none hidden lg:block">
      <div class="text-[300px] font-black leading-none text-white overflow-hidden whitespace-nowrap -mb-20 italic">
        DANGER
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}
</style>

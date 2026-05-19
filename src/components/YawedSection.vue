<script setup lang="ts">
import { Music, Disc, Radio, Play } from 'lucide-react';

const mixes = [
  { title: 'DANGER BUILDING MIX', duration: '45:20', bpm: '128', cover: '/src/assets/images/killer_dj_mix_poster_1779178312166.png' },
  { title: 'PREDICTOR BEAT VOL 1', duration: '32:15', bpm: '140', cover: '/src/assets/images/predictor_beat_poster_1779178294613.png' },
  { title: 'KILLER DJ ATTACK', duration: '58:40', bpm: '125', cover: '/src/assets/images/killer_dj_attack_poster_1779178330805.png' },
];
</script>

<template>
  <section class="relative py-40 overflow-hidden bg-black">
    <!-- Slanted Background -->
    <div class="absolute inset-0 bg-primary/5 -skew-y-3 origin-left scale-110" />
    
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row gap-20 items-center">
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 bg-primary/20 p-2 pr-6 rounded-full border border-primary/30 mb-8 overflow-hidden">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-spin">
              <Disc :size="20" class="text-white" />
            </div>
            <span class="mono-label !text-primary">Yawed Official Mixes</span>
          </div>
          
          <h2 class="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] mb-10">
            AUDIO <br /> <span class="text-primary">UBURYOHE</span>
          </h2>
          
          <p class="text-xl text-white/50 font-medium italic mb-12 max-w-lg">
            Umva imiziki n’imvune byo mu rwego rwo hejuru. Yawed official mixes zose zirahari, ziteguwe na Killer DJ. 
            Danger! Predictor!
          </p>
          
          <div class="flex flex-wrap gap-8">
            <div class="flex flex-col">
              <span class="text-4xl font-black italic tracking-tighter">150+</span>
              <span class="mono-label !text-[8px]">Mixes Available</span>
            </div>
            <div class="w-px h-12 bg-white/10" />
            <div class="flex flex-col">
              <span class="text-4xl font-black italic tracking-tighter">24/7</span>
              <span class="mono-label !text-[8px]">Radio Stream</span>
            </div>
          </div>
        </div>

        <div class="flex-1 w-full space-y-6">
          <div 
            v-for="(mix, i) in mixes" 
            :key="i"
            class="group relative bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center gap-6 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer"
          >
            <div class="h-24 w-24 rounded-2xl overflow-hidden shrink-0 relative">
              <img :src="mix.cover" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              <div class="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play :size="24" fill="currentColor" />
              </div>
            </div>
            
            <div class="flex-1">
              <h4 class="text-xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{{ mix.title }}</h4>
              <div class="flex items-center gap-4 text-white/40">
                <div class="flex items-center gap-1">
                  <Radio :size="12" />
                  <span class="text-[10px] font-bold uppercase tracking-widest">{{ mix.duration }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Music :size="12" />
                  <span class="text-[10px] font-bold uppercase tracking-widest">{{ mix.bpm }} BPM</span>
                </div>
              </div>
            </div>
            
            <button class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
              <Play :size="16" :class="['text-white', 'group-hover:fill-current']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

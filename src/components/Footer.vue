<script setup lang="ts">
import { Film } from 'lucide-react';
</script>

<template>
  <footer class="bg-black py-20 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-primary flex items-center justify-center rounded-xl rotate-12">
              <Film class="text-white" :size="24" />
            </div>
            <span class="text-2xl font-black tracking-tighter uppercase italic">
              REMY <span class="text-primary">MR</span> NOCOMMENT
            </span>
          </div>
          <p class="text-white/40 max-w-sm mb-8">
             Uburozi bw'ikinema mu Rwanda. Experience the most dangerous entertainment platform curated by Tiger Nsanzi.
          </p>
        </div>
        
        <div>
          <h4 class="text-xs font-black uppercase tracking-[0.3em] mb-6 italic text-white/50">Iby'ingenzi</h4>
          <ul class="space-y-4">
            <li><a href="#home" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Ahabanza</a></li>
            <li><a href="#movies" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Films</a></li>
            <li><a href="#analytics" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Uburozi</a></li>
            <li><a href="#contact" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-xs font-black uppercase tracking-[0.3em] mb-6 italic text-white/50">Yawed Commercial</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Danger in Building</a></li>
            <li><a href="#" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Predictor Beat</a></li>
            <li><a href="#" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Killer DJ Mix</a></li>
            <li><a href="#" class="text-sm font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-widest">Rocky Ent 84</a></li>
          </ul>
        </div>
      </div>
      
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
          © 2026 REMY MR NOCOMMENT - All Rights Reserved
        </div>
        <div class="flex items-center gap-6">
          <span class="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/30">AI Powered</span>
          <span class="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/30">Tiger Nsanzi Certified</span>
        </div>
      </div>
    </div>
  </footer>
</template>

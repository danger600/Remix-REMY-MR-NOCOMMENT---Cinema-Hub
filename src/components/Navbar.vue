<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Film, MessageSquare, Menu, X } from 'lucide-react';

defineProps<{
  onAIChatClick: () => void;
}>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navLinks = [
  { href: '#home', label: 'Ahabanza' },
  { href: '#movies', label: 'Films' },
  { href: '#analytics', label: 'Uburozi' },
  { href: '#contact', label: 'Contact' },
];
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-50 transition-all duration-500',
    isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
  ]">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
      <a href="#home" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-primary flex items-center justify-center rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300">
          <Film class="text-white" :size="24" />
        </div>
        <span class="text-2xl font-black tracking-tighter uppercase italic">
          REMY <span class="text-primary">MR</span> NOCOMMENT
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-10">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" class="nav-link text-sm font-bold uppercase tracking-widest">
          {{ link.label }}
        </a>
        <button 
          @click="onAIChatClick"
          class="flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-5 py-2 border border-primary/20 rounded-full transition-all text-sm font-bold uppercase tracking-widest"
        >
          <MessageSquare :size="16" />
          AI Chat
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="md:hidden text-white"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <X v-if="isMobileMenuOpen" />
        <Menu v-else />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-black border-b border-white/10 overflow-hidden"
      >
        <div class="flex flex-col p-6 gap-6">
          <a 
            v-for="link in navLinks"
            :key="link.href" 
            :href="link.href" 
            @click="isMobileMenuOpen = false"
            class="text-xl font-black uppercase italic"
          >
            {{ link.label }}
          </a>
          <button 
            @click="() => {
              onAIChatClick();
              isMobileMenuOpen = false;
            }"
            class="w-full btn-netflix text-center"
          >
            AI CHAT
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease-out;
  max-height: 400px;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>

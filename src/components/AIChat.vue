<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import VueMarkdown from 'vue-markdown-render';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const messages = ref<Message[]>([
  { role: 'model', text: 'DANGER IN THE BUILDING! 🐯 Ndi AI ya Remy Mr Nocomment. Predictor on the beat, Killer DJ on the mix. Ni film ki ushaka kureba uyu munsi?' }
]);
const input = ref('');
const isLoading = ref(false);
const scrollRef = ref<HTMLDivElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (scrollRef.value) {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
  }
};

watch(messages, scrollToBottom, { deep: true });
watch(() => props.isOpen, (newVal) => {
  if (newVal) scrollToBottom();
});

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return;

  const userMessage = input.value.trim();
  input.value = '';
  messages.value.push({ role: 'user', text: userMessage });
  isLoading.value = true;

  try {
    const history = messages.value.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const apiBaseUrl = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${apiBaseUrl || '/api'}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history })
    });

    const data = await res.json();
    if (data.text) {
      messages.value.push({ role: 'model', text: data.text });
    }
  } catch (error) {
    messages.value.push({ role: 'model', text: 'Ihangane, habonetse ikibazo mu itumanaho... DANGER EXIT!' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="contents">
    <Transition name="fade">
      <div
        v-if="isOpen"
        @click="emit('close')"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      />
    </Transition>
    <Transition name="scale">
      <div
        v-if="isOpen"
        class="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] glass rounded-[32px] z-[101] flex flex-col shadow-2xl overflow-hidden"
      >
        <!-- Header -->
        <div class="p-6 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-spin-slow" />
              <Bot :size="24" class="text-primary relative z-10" />
            </div>
            <div>
              <h3 class="font-black italic uppercase tracking-tighter text-white">AI YOZWE</h3>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span class="text-[10px] font-bold uppercase tracking-widest text-white/60">DANGER ONLINE</span>
              </div>
            </div>
          </div>
          <button 
            @click="emit('close')"
            class="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="scrollRef" class="flex-1 overflow-y-auto p-6 space-y-6">
          <div v-for="(msg, i) in messages" :key="i" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="[
              'max-w-[85%] p-4 rounded-2xl flex gap-3',
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20' 
                : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10'
            ]">
              <Bot v-if="msg.role === 'model'" :size="16" class="mt-1 text-primary shrink-0" />
              <div class="text-sm leading-relaxed prose prose-invert max-w-none prose-sm">
                <VueMarkdown :source="msg.text" />
              </div>
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-start italic text-white/30 text-xs text-secondary-content">
            <Sparkles :size="12" class="mr-2 animate-spin" />
            AI y’uburozi irimo gutekereza...
          </div>
        </div>

        <!-- Input -->
        <div class="p-6 border-t border-white/5">
          <div class="relative">
            <input
              type="text"
              v-model="input"
              @keydown.enter="handleSend"
              placeholder="Andika ubutumwa hano..."
              class="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:border-primary transition-all text-sm"
            />
            <button
              @click="handleSend"
              :disabled="!input.trim() || isLoading"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
            >
              <Send :size="18" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: translateY(100px) scale(0.9);
}

.animate-spin-slow {
  animation: spin 4s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

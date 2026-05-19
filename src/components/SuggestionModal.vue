<script setup lang="ts">
import { ref } from 'vue';
import { X, Send, Film, MessageCircle, AlertCircle } from 'lucide-react';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const title = ref('');
const genre = ref('action');
const description = ref('');
const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = async () => {
  if (!title.value.trim() || !description.value.trim()) return;
  
  isSubmitting.value = true;
  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${apiBaseUrl || '/api'}/suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        genre: genre.value,
        description: description.value
      })
    });
    
    if (res.ok) {
      showSuccess.value = true;
      title.value = '';
      description.value = '';
      setTimeout(() => {
        showSuccess.value = false;
        emit('close');
      }, 2000);
    }
  } catch (error) {
    console.error("Failed to submit suggestion:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="contents">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]" @click="emit('close')" />
    </Transition>
    
    <Transition name="scale">
      <div 
        v-if="isOpen"
        class="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] h-fit max-h-[90vh] bg-secondary-light rounded-[40px] z-[201] p-10 overflow-y-auto border border-white/5 shadow-2xl custom-scrollbar"
      >
        <button 
          @click="emit('close')"
          class="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-full transition-colors text-white/30 hover:text-white"
        >
          <X :size="24" />
        </button>

        <div v-if="!showSuccess">
          <div class="flex items-center gap-4 mb-10">
            <div class="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Film :size="24" />
            </div>
            <div>
              <h3 class="text-3xl font-black italic uppercase tracking-tighter">Suggestion Room</h3>
              <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest">Wifuza film ki nshya hano?</p>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="space-y-3">
              <label class="mono-label">Title of the Movie</label>
              <input 
                v-model="title"
                type="text"
                required
                class="w-full bg-black/40 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-primary transition-all font-bold italic"
                placeholder="Ex: Tiger vs Lion 2"
              />
            </div>

            <div class="space-y-3">
              <label class="mono-label">Category</label>
              <select 
                v-model="genre"
                class="w-full bg-black/40 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-primary transition-all font-bold italic appearance-none"
              >
                <option value="action">Ubugome (Action)</option>
                <option value="horror">Ubwoba (Horror)</option>
                <option value="drama">Ibikomeye (Drama)</option>
                <option value="scifi">Iby'ahazaza (Sci-Fi)</option>
              </select>
            </div>

            <div class="space-y-3">
              <label class="mono-label">Why should we add it?</label>
              <textarea 
                v-model="description"
                required
                class="w-full bg-black/40 border border-white/5 rounded-2xl p-5 focus:outline-none focus:border-primary transition-all font-bold italic min-h-[150px] resize-none"
                placeholder="Sobanura impamvu iyi film ikenewe mu building..."
              />
            </div>

            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-netflix !py-5 flex items-center justify-center gap-4 group"
            >
              <template v-if="isSubmitting">
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                DITURIRA...
              </template>
              <template v-else>
                Submit Suggestion
                <Send :size="18" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </template>
            </button>
          </form>

          <div class="mt-10 p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
            <AlertCircle class="text-primary shrink-0" :size="20" />
            <p class="text-xs text-white/40 font-medium italic leading-relaxed">
              Tuzasuzuma film yose washyize hano. Niba ari nziza, tuyizana mu building bidatinze. DANGER!
            </p>
          </div>
        </div>

        <div v-else class="py-20 text-center flex flex-col items-center justify-center">
           <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-lg shadow-green-500/20">
             <MessageCircle :size="48" class="text-white" />
           </div>
           <h3 class="text-4xl font-black italic uppercase tracking-tighter mb-4">Murakoze!</h3>
           <p class="text-white/40 font-bold italic">Igitekerezo cyanyu cyageze mu building. 🐯</p>
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
  transform: translate(-50%, -40%) scale(0.9);
}
/* For mobile where there is no translate-x/y -1/2 */
@media (max-width: 767px) {
  .scale-enter-from, .scale-leave-to {
    transform: scale(0.9) translateY(40px);
  }
}
</style>

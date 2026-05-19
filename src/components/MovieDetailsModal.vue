<script setup lang="ts">
import { ref, computed } from 'vue';
import { X, Star, Play, Clock, User, Calendar, MessageCircle, Send, Share2, Download, Twitter, Facebook } from 'lucide-react';
import type { Movie, Review } from '../types';
import { cn } from '../lib/utils';

const props = defineProps<{
  movie: Movie;
  allMovies: Movie[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectMovie', movie: Movie): void;
}>();

const showTrailer = ref(false);
const userRating = ref(0);
const userComment = ref('');
const reviews = ref<Review[]>(props.movie.reviews || []);

const relatedMovies = computed(() => {
  return props.allMovies
    .filter(m => m.id !== props.movie.id && m.category === props.movie.category)
    .slice(0, 4);
});

const handleSubmitReview = () => {
  if (userRating.value === 0 || !userComment.value.trim()) return;

  const newReview: Review = {
    id: Date.now().toString(),
    user: 'Anonymous Tiger',
    rating: userRating.value,
    comment: userComment.value,
    date: new Date().toISOString().split('T')[0]
  };

  reviews.value = [newReview, ...reviews.value];
  userRating.value = 0;
  userComment.value = '';
};

const shareOnTwitter = () => {
  const text = encodeURIComponent(`Reba ${props.movie.title} kuri Remy Mr Nocomment Platform! 🐯`);
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const shareOnWhatsApp = () => {
  const text = encodeURIComponent(`Reba ${props.movie.title} kuri Remy Mr Nocomment Platform! 🐯`);
  const url = encodeURIComponent(window.location.href);
  window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
};
</script>

<template>
  <div class="contents">
    <Transition name="fade">
      <div
        v-if="isOpen"
        @click="emit('close')"
        class="fixed inset-0 bg-black/90 backdrop-blur-md z-[300]"
      />
    </Transition>
    <Transition name="scale-large">
      <div
        v-if="isOpen"
        class="fixed inset-4 md:inset-10 lg:inset-20 m-auto bg-secondary-light rounded-[40px] z-[301] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5"
      >
        <!-- Close Button -->
        <button 
          @click="emit('close')"
          class="absolute top-6 right-6 z-[302] p-3 bg-black/60 backdrop-blur-xl rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
        >
          <X :size="24" />
        </button>

        <!-- Content Left: Poster / Trailer -->
        <div class="w-full md:w-2/5 relative h-64 md:h-full bg-black group">
          <Transition name="fade" mode="out-in">
            <div 
              v-if="showTrailer && movie.trailerUrl"
              key="trailer"
              class="w-full h-full"
            >
              <iframe 
                :src="movie.trailerUrl + '?autoplay=1'"
                class="w-full h-full"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              ></iframe>
            </div>
            <div 
              v-else
              key="poster"
              class="w-full h-full relative"
            >
              <img :src="movie.poster" class="w-full h-full object-cover brightness-[0.6]" />
              <div class="absolute inset-0 flex items-center justify-center">
                <button 
                  @click="showTrailer = true"
                  class="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-premium transform transition-transform hover:scale-110"
                >
                  <Play :size="40" fill="currentColor" />
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Content Right: Details -->
        <div class="flex-1 overflow-y-auto p-8 md:p-14 custom-scrollbar">
          <div class="mb-12">
            <div class="flex items-center gap-4 mb-6">
              <span class="mono-label !text-primary">{{ movie.category }}</span>
              <div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                <Star :size="14" class="text-primary fill-primary" />
                <span class="text-xs font-black italic">{{ movie.rating }}</span>
              </div>
            </div>
            
            <h2 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              {{ movie.title }}
            </h2>

            <div class="flex flex-wrap gap-4 mb-12">
              <button class="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase italic tracking-tighter shadow-premium hover:scale-105 transition-all">
                <Play :size="18" fill="currentColor" />
                Bure imbere
              </button>
              
              <div class="flex gap-2">
                <button 
                  @click="shareOnTwitter"
                  class="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-[#1DA1F2] transition-all"
                  title="Share on Twitter"
                >
                  <Twitter :size="20" />
                </button>
                <button 
                  @click="shareOnFacebook"
                  class="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-[#4267B2] transition-all"
                  title="Share on Facebook"
                >
                  <Facebook :size="20" />
                </button>
                <button 
                  @click="shareOnWhatsApp"
                  class="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-[#25D366] transition-all"
                  title="Share on WhatsApp"
                >
                  <MessageCircle :size="20" />
                </button>
              </div>

              <button class="hidden sm:flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-white/10 transition-all">
                <Download :size="18" />
              </button>
            </div>

            <div class="flex flex-wrap gap-10 mb-12">
              <div class="flex flex-col gap-2">
                <span class="mono-label">Director</span>
                <span class="text-lg font-bold">{{ movie.director || 'N/A' }}</span>
              </div>
              <div class="flex flex-col gap-2">
                <span class="mono-label">Duration</span>
                <span class="text-lg font-bold flex items-center gap-2">
                  <Clock :size="16" class="text-primary" />
                  {{ movie.duration }}
                </span>
              </div>
              <div class="flex flex-col gap-2">
                <span class="mono-label">Year</span>
                <span class="text-lg font-bold flex items-center gap-2">
                  <Calendar :size="16" class="text-primary" />
                  {{ movie.year }}
                </span>
              </div>
            </div>

            <div class="mb-12">
              <span class="mono-label mb-4 block">Synopsis</span>
              <p class="text-xl text-white/60 leading-relaxed max-w-2xl font-medium italic">
                {{ movie.description }}
              </p>
            </div>

            <div class="mb-12">
              <span class="mono-label mb-6 block">Cast & Crew</span>
              <div class="flex flex-wrap gap-4">
                <div v-for="(actor, i) in movie.cast" :key="i" class="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-colors">
                  <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <User :size="16" />
                  </div>
                  <span class="font-bold text-sm tracking-tight">{{ actor }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Movies -->
          <div class="mb-20">
            <div class="flex items-center justify-between mb-8">
              <span class="mono-label">Similar to this</span>
              <div class="h-px flex-1 mx-8 bg-white/5" />
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <button 
                v-for="m in relatedMovies" 
                :key="m.id"
                @click="emit('selectMovie', m)"
                class="group text-left"
              >
                <div class="aspect-[3/4] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-primary/50 transition-all">
                  <img :src="m.poster" class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <h4 class="font-black uppercase italic tracking-tighter text-sm truncate group-hover:text-primary transition-colors">{{ m.title }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <Star :size="10" class="text-primary fill-primary" />
                  <span class="text-[10px] font-bold text-white/40">{{ m.rating }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="mb-12">
            <div class="flex items-center justify-between mb-10">
               <h3 class="text-3xl font-black italic uppercase tracking-tighter">Reviews</h3>
               <div class="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                  <MessageCircle :size="16" class="text-primary" />
                  <span class="text-sm font-bold">{{ reviews.length }} Comments</span>
               </div>
            </div>

            <!-- Review Form -->
            <form @submit.prevent="handleSubmitReview" class="bg-white/5 p-8 rounded-[32px] border border-white/5 mb-10 space-y-6">
              <div class="flex items-center gap-4 mb-4">
                <span class="mono-label">Your Rating</span>
                <div class="flex gap-2">
                   <button 
                     v-for="star in 5" 
                     :key="star"
                     type="button"
                     @click="userRating = star"
                     class="transition-transform hover:scale-110"
                   >
                     <Star 
                      :size="24" 
                      :class="cn(
                        'transition-colors',
                        (userRating >= star) ? 'text-primary fill-primary' : 'text-white/10'
                      )" 
                     />
                   </button>
                </div>
              </div>
              <div class="relative">
                <textarea 
                  v-model="userComment"
                  class="w-full bg-black/40 border border-white/5 rounded-2xl p-6 focus:outline-none focus:border-primary transition-all text-sm resize-none"
                  placeholder="Share your thoughts on this movie..."
                  rows="3"
                />
                <button 
                  type="submit"
                  class="absolute bottom-4 right-4 p-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
                >
                  <Send :size="20" />
                </button>
              </div>
            </form>

            <!-- Review List -->
            <div class="space-y-6">
              <div v-for="review in reviews" :key="review.id" class="p-8 bg-white/5 rounded-3xl border border-white/5 flex gap-6">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <User :size="24" class="text-white/20" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-black italic uppercase tracking-tighter">{{ review.user }}</span>
                    <span class="text-[10px] font-bold text-white/20 uppercase tracking-widest">{{ review.date }}</span>
                  </div>
                  <div class="flex gap-1 mb-4">
                    <Star 
                      v-for="i in 5" 
                      :key="i" 
                      :size="10" 
                      :class="cn(i <= review.rating ? 'text-primary fill-primary' : 'text-white/10')" 
                    />
                  </div>
                  <p class="text-sm text-white/50 leading-relaxed italic">"{{ review.comment }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-large-enter-active, .scale-large-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-large-enter-from, .scale-large-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}
</style>

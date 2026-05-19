<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Search, TrendingUp, Filter, ChevronDown, Play, X, Mail, Phone, Instagram, Youtube, Film } from 'lucide-react';
import { INITIAL_MOVIES, MOVIE_CATEGORIES } from './types';
import type { Movie } from './types';

import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import MovieCard from './components/MovieCard.vue';
import AIChat from './components/AIChat.vue';
import Analytics from './components/Analytics.vue';
import Footer from './components/Footer.vue';
import YawedSection from './components/YawedSection.vue';
import SuggestionModal from './components/SuggestionModal.vue';
import MovieDetailsModal from './components/MovieDetailsModal.vue';
import AIRecommendations from './components/AIRecommendations.vue';
import Newsletter from './components/Newsletter.vue';

const movies = ref<Movie[]>(INITIAL_MOVIES);
const selectedCategory = ref('all');
const searchQuery = ref('');
const sortBy = ref<'year' | 'rating' | 'title'>('year');
const watchlist = ref<string[]>([]);
const history = ref<string[]>([]);

onMounted(() => {
  const savedWatchlist = localStorage.getItem('tiger_watchlist');
  const savedHistory = localStorage.getItem('tiger_history');
  if (savedWatchlist) watchlist.value = JSON.parse(savedWatchlist);
  if (savedHistory) history.value = JSON.parse(savedHistory);
});

watch(watchlist, (newVal) => {
  localStorage.setItem('tiger_watchlist', JSON.stringify(newVal));
}, { deep: true });

watch(history, (newVal) => {
  localStorage.setItem('tiger_history', JSON.stringify(newVal));
}, { deep: true });
const isAIChatOpen = ref(false);
const isSuggestionModalOpen = ref(false);
const selectedMovie = ref<Movie | null>(null);
const trailerMovie = ref<Movie | null>(null);

const filteredMovies = computed(() => {
  let result = movies.value.filter(movie => {
    const matchesCategory = selectedCategory.value === 'all' || movie.category === selectedCategory.value;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         movie.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return [...result].sort((a, b) => {
    if (sortBy.value === 'year') return b.year.localeCompare(a.year);
    if (sortBy.value === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    return a.title.localeCompare(b.title);
  });
});

const addToHistory = (id: string) => {
  history.value = [id, ...history.value.filter(i => i !== id)].slice(0, 5);
};

const toggleWatchlist = (id: string) => {
  if (watchlist.value.includes(id)) {
    watchlist.value = watchlist.value.filter(i => i !== id);
  } else {
    watchlist.value.push(id);
  }
};

const historyMovies = computed(() => {
  return history.value.map(id => movies.value.find(m => m.id === id)!).filter(Boolean);
});

const trendingMovies = computed(() => {
  return movies.value.filter(m => parseFloat(m.rating) >= 8);
});

const contactItems = [
  { icon: Mail, label: 'Email', value: 'remmynsanzimana@gmail.com', link: 'mailto:remmynsanzimana@gmail.com' },
  { icon: Phone, label: 'Wayphone', value: '+250 795 547 233', link: 'tel:+250795547233' },
  { icon: Instagram, label: 'Instagram', value: '@tigernsanz', link: 'https://instagram.com/tigernsanz' },
  { icon: Youtube, label: 'Youtube', value: 'Rocky Entertainment 84', link: 'https://youtube.com/@RockyEntertainment84' },
];
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <Navbar @AIChatClick="isAIChatOpen = true" />
    
    <main>
      <Hero @SuggestionClick="isSuggestionModalOpen = true" />
      
      <!-- Trending Section -->
      <section class="py-20 bg-secondary-light/30">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between mb-12">
            <div>
              <span class="mono-label !text-primary mb-2 block">Hot right now</span>
              <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Trending <span class="text-primary">Now</span></h2>
            </div>
            <div class="h-px flex-1 mx-12 bg-white/5" />
            <button class="text-xs font-bold text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">See all</button>
          </div>
          
          <div class="flex gap-8 overflow-x-auto pb-10 custom-scrollbar snap-x">
            <div 
              v-for="movie in trendingMovies"
              :key="movie.id" 
              @click="() => {
                selectedMovie = movie;
                addToHistory(movie.id);
              }"
              class="min-w-[300px] md:min-w-[350px] snap-start group cursor-pointer"
            >
              <div class="aspect-[16/9] rounded-[32px] overflow-hidden mb-6 relative border border-white/5 group-hover:border-primary/50 transition-all duration-700">
                <img :src="movie.poster" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-premium transform scale-90 group-hover:scale-100 transition-transform">
                    <Play :size="24" fill="currentColor" />
                  </div>
                </div>
              </div>
              <h4 class="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">{{ movie.title }}</h4>
              <div class="flex items-center gap-4 mt-2">
                <span class="text-xs font-bold text-white/30">{{ movie.year }}</span>
                <div class="w-1 h-1 rounded-full bg-white/20" />
                <span class="text-xs font-bold text-white/30 uppercase tracking-widest">{{ movie.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIRecommendations 
        v-if="historyMovies.length > 0"
        :view-history="historyMovies" 
        :all-movies="movies"
        @select-movie="(m) => {
          selectedMovie = m;
          addToHistory(m.id);
        }"
      />
      
      <!-- Search and Filter Section -->
      <section id="movies" class="max-w-7xl mx-auto px-4 py-20">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 relative">
          <div class="flex-1">
            <h2 class="section-title mb-6">UBUTURO BWA FILMS</h2>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="cat in MOVIE_CATEGORIES"
                :key="cat.id"
                @click="selectedCategory = cat.id"
                :class="[
                  'px-8 py-3 rounded-2xl font-black italic uppercase tracking-tighter transition-all text-[10px] border',
                  selectedCategory === cat.id 
                    ? 'bg-primary border-primary text-white shadow-premium scale-105' 
                    : 'bg-white/5 hover:bg-white/10 text-white/30 border-white/5'
                ]"
              >
                {{ cat.label }}
              </button>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 items-stretch lg:items-center">
            <!-- Sorting -->
            <div class="relative group min-w-[180px]">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                <Filter :size="14" />
              </div>
              <select 
                v-model="sortBy"
                class="w-full pl-12 pr-10 py-4 bg-white/5 border border-white/5 rounded-2xl appearance-none focus:outline-none focus:border-primary/50 text-[10px] font-black uppercase italic tracking-widest text-white/50 cursor-pointer"
              >
                <option value="year" class="bg-secondary">Newest First</option>
                <option value="rating" class="bg-secondary">Top Rated</option>
                <option value="title" class="bg-secondary">Title A-Z</option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none">
                <ChevronDown :size="14" />
              </div>
            </div>

            <!-- Search -->
            <div class="relative group flex-1 sm:w-80">
              <Search class="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Shaka film cyangwa umukinnyi..."
                v-model="searchQuery"
                class="w-full pl-16 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/10 text-sm font-bold italic uppercase tracking-tighter"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <TransitionGroup name="fade" class="contents">
            <div
              v-for="(movie, idx) in filteredMovies"
              :key="movie.id"
              class="movie-item"
            >
              <MovieCard 
                :movie="movie" 
                :is-watchlisted="watchlist.includes(movie.id)"
                @toggle-watchlist="(e) => {
                  e.stopPropagation();
                  toggleWatchlist(movie.id);
                }"
                @trailer-click="(e) => {
                  e.stopPropagation();
                  trailerMovie = movie;
                }"
                @click="() => {
                  selectedMovie = movie;
                  addToHistory(movie.id);
                }"
              />
            </div>
          </TransitionGroup>
        </div>
        
        <div v-if="filteredMovies.length === 0" class="text-center py-20">
          <Film class="w-16 h-16 mx-auto mb-4 text-white/10" />
          <p class="text-xl text-white/40">Nta film imeze gutya yabonetse...</p>
        </div>
      </section>

      <YawedSection />
      <Analytics />
      <Newsletter />
      
      <section id="contact" class="max-w-7xl mx-auto px-4 py-20 border-t border-white/5">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 class="section-title mb-8">REMY MR NOCOMMENT</h2>
            <p class="text-xl text-white/60 mb-12 max-w-lg leading-relaxed">
              Danger in the building! Predictor on the beat! Killer DJ on the mix! 
              TIGER NSANZI official platform.
            </p>
            
            <div class="space-y-6">
              <a 
                v-for="(item, i) in contactItems"
                :key="i"
                :href="item.link"
                target="_blank"
                class="flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-primary/20 text-white/40 group-hover:text-primary transition-all">
                  <component :is="item.icon" :size="24" />
                </div>
                <div>
                  <div class="text-xs font-bold text-white/20 uppercase tracking-widest mb-1">{{ item.label }}</div>
                  <div class="text-lg font-bold">{{ item.value }}</div>
                </div>
              </a>
            </div>
          </div>
          
          <div class="glass p-10 rounded-3xl relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
             <h3 class="text-3xl font-black mb-8 uppercase italic">Ohereza Ubutumwa</h3>
             <form class="space-y-6" @submit.prevent>
               <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div class="space-y-2">
                   <label class="text-xs font-bold text-white/30 uppercase tracking-widest">Amazina</label>
                   <input type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary border-transparent transition-all" placeholder="Remy Mr Nocomment" />
                 </div>
                 <div class="space-y-2">
                   <label class="text-xs font-bold text-white/30 uppercase tracking-widest">Email</label>
                   <input type="email" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary border-transparent transition-all" placeholder="user@gmail.com" />
                 </div>
               </div>
               <div class="space-y-2">
                  <label class="text-xs font-bold text-white/30 uppercase tracking-widest">Ubutumwa</label>
                  <textarea rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-primary border-transparent transition-all" placeholder="Muraho Tiger..." />
               </div>
               <button type="submit" class="w-full btn-netflix">Ohereza Message</button>
             </form>
          </div>
        </div>
      </section>
    </main>

    <Footer />
    <AIChat :is-open="isAIChatOpen" @close="isAIChatOpen = false" />
    <SuggestionModal :is-open="isSuggestionModalOpen" @close="isSuggestionModalOpen = false" />
    <MovieDetailsModal 
      v-if="selectedMovie"
      :is-open="!!selectedMovie" 
      :movie="selectedMovie" 
      :all-movies="movies"
      @close="selectedMovie = null"
      @select-movie="(m) => selectedMovie = m"
    />
    
    <Transition name="fade">
      <div v-if="trailerMovie" class="fixed inset-0 z-[500] flex items-center justify-center p-4">
        <div 
          @click="trailerMovie = null"
          class="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <div class="relative w-full max-w-5xl aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/5">
          <button 
            @click="trailerMovie = null"
            class="absolute top-6 right-6 z-10 p-3 bg-black/60 rounded-full text-white/70 hover:text-white border border-white/10"
          >
            <X :size="24" />
          </button>
          <iframe 
            :src="trailerMovie.trailerUrl + '?autoplay=1'"
            class="w-full h-full"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.movie-list-move,
.movie-list-enter-active,
.movie-list-leave-active {
  transition: all 0.5s ease;
}
.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.movie-list-leave-active {
  position: absolute;
}
</style>

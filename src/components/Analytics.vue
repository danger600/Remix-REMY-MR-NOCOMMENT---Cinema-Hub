<script setup lang="ts">
import { ref } from 'vue';
import { TrendingUp, Users, Eye, Star, Activity } from 'lucide-react';
import ApexCharts from 'vue3-apexcharts';

const stats = [
  { icon: Eye, label: 'Views', value: '45.2k', trend: '+12%', color: 'text-blue-400' },
  { icon: Users, label: 'Fans', value: '12.8k', trend: '+5%', color: 'text-primary' },
  { icon: Star, label: 'Rating', value: '9.4', trend: 'Stable', color: 'text-yellow-400' },
  { icon: Activity, label: 'Danger', value: '100%', trend: 'Max', color: 'text-red-500' },
];

const chartOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    sparkline: { enabled: false },
    background: 'transparent',
    foreColor: '#ffffff40',
    fontFamily: '"Space Grotesk", sans-serif'
  },
  colors: ['#E50914'],
  stroke: { curve: 'smooth', width: 3 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100]
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { show: false },
  grid: {
    borderColor: '#ffffff05',
    strokeDashArray: 4
  },
  tooltip: {
    theme: 'dark',
    x: { show: false }
  }
};

const series = [{
  name: 'Viewers',
  data: [30, 40, 35, 50, 49, 60]
}];
</script>

<template>
  <section id="analytics" class="max-w-7xl mx-auto px-4 py-20 relative">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
      <div>
        <span class="mono-label !text-primary block mb-4">Real-time Data</span>
        <h2 class="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
          DANGER <br /> <span class="text-primary">ANALYTICS</span>
        </h2>
        <p class="text-white/40 font-medium italic max-w-md">
          Uko imibare ihagaze mu gihugu uyu munsi. Uburozi burimo kwiyongera buri saha.
        </p>
      </div>
      <div class="flex gap-4">
        <div class="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl">
          <div class="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">Live Status</div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span class="font-black italic uppercase tracking-tighter">Connected</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div 
        v-for="(stat, i) in stats" 
        :key="i"
        class="glass p-8 rounded-[32px] border border-white/5 hover:border-primary/30 transition-all group"
      >
        <div :class="['w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', stat.color]">
          <component :is="stat.icon" :size="24" />
        </div>
        <div class="text-white/30 text-xs font-black uppercase tracking-widest mb-2">{{ stat.label }}</div>
        <div class="flex items-end gap-3">
          <div class="text-4xl font-black italic tracking-tighter">{{ stat.value }}</div>
          <div class="text-[10px] font-bold text-green-500 mb-1.5">{{ stat.trend }}</div>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="glass p-10 rounded-[48px] border border-white/5 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div class="flex items-center justify-between mb-10">
        <h3 class="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
          <TrendingUp class="text-primary" />
          Growth Pattern
        </h3>
        <div class="flex gap-2">
          <button class="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold italic uppercase tracking-tighter">7D</button>
          <button class="px-4 py-1.5 bg-white/5 text-white/40 rounded-lg text-xs font-bold italic uppercase tracking-tighter hover:bg-white/10 transition-all">30D</button>
        </div>
      </div>
      
      <div class="h-[300px]">
        <ApexCharts
          type="area"
          height="100%"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
}
</style>

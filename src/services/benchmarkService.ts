// Benchmark Service for Dronten vs. Flevoland vs. Nederland comparisons
import { DEFAULT_BENCHMARK_DATA, BenchmarkMetric } from './cbsConfig';

export interface BenchmarkComparisonGroup {
  category: string;
  metrics: BenchmarkMetric[];
}

class BenchmarkService {
  private metrics: BenchmarkMetric[] = [...DEFAULT_BENCHMARK_DATA];

  getMetrics(): BenchmarkMetric[] {
    return this.metrics;
  }

  getGroupedMetrics(): BenchmarkComparisonGroup[] {
    return [
      {
        category: 'Eigendom & Voorraadverhouding',
        metrics: this.metrics.filter(m => m.metric.includes('Koop') || m.metric.includes('huur') || m.metric.includes('Huur'))
      },
      {
        category: 'Vastgoedwaarde & Oppervlakte',
        metrics: this.metrics.filter(m => m.metric.includes('WOZ') || m.metric.includes('oppervlakte'))
      },
      {
        category: 'Demografie & Huishoudensdynamiek',
        metrics: this.metrics.filter(m => m.metric.includes('Vergrijzing') || m.metric.includes('huishoudensgrootte'))
      }
    ];
  }

  // Bepaal de relatieve afwijking (%) van Dronten ten opzichte van Nederland
  calculateDeviationVsNL(metricName: string): number | null {
    const item = this.metrics.find(m => m.metric === metricName);
    if (!item) return null;
    if (typeof item.dronten === 'number' && typeof item.nederland === 'number') {
      return Math.round(((item.dronten - item.nederland) / item.nederland) * 100);
    }
    return null;
  }
}

export const benchmarkService = new BenchmarkService();

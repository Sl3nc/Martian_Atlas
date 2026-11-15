// Simulação do trajeto sendo percorrido. Pura (sem DOM nem relógio):
// quem chama decide quanto tempo simulado avançar a cada quadro.

export class TraverseSimulation {
  /** @param analysis resultado de analyzeRoute (usa samples com d em km e t em horas) */
  constructor(analysis) {
    this.samples = analysis.samples;
    this.totalKm = analysis.distanceKm;
    this.totalHours = analysis.driveHours;
    this.legEndsKm = analysis.legEndsKm;
    this.elapsedHours = 0;
    this.index = 0; // amostra imediatamente anterior à posição atual
  }

  get done() {
    return this.elapsedHours >= this.totalHours;
  }

  /** Avança `hours` de tempo de condução simulado. */
  advance(hours) {
    this.elapsedHours = Math.min(this.totalHours, this.elapsedHours + Math.max(0, hours));
    const s = this.samples;
    while (this.index < s.length - 2 && s[this.index + 1].t <= this.elapsedHours) this.index++;
    return this.state();
  }

  state() {
    const s = this.samples;
    const a = s[this.index];
    const b = s[Math.min(this.index + 1, s.length - 1)];
    const span = b.t - a.t;
    const f = span > 0 ? Math.min(1, Math.max(0, (this.elapsedHours - a.t) / span)) : 1;
    const distanceKm = a.d + (b.d - a.d) * f;
    const legIndex = this.legEndsKm.findIndex((end) => distanceKm < end - 1e-9);
    return {
      position: { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f },
      distanceKm,
      remainingKm: Math.max(0, this.totalKm - distanceKm),
      elapsedHours: this.elapsedHours,
      remainingHours: Math.max(0, this.totalHours - this.elapsedHours),
      progress: this.totalHours > 0 ? this.elapsedHours / this.totalHours : 1,
      legIndex: legIndex < 0 ? this.legEndsKm.length - 1 : legIndex,
      done: this.done,
    };
  }
}

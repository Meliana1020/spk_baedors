const math = require('mathjs');

class NaiveBayesService {
  // Hitung P(xk|Ci) menggunakan Distribusi Normal
  calculateGaussian(x, mean, variance) {
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    return (1 / Math.sqrt(2 * Math.PI * variance)) * exponent;
  }

  // Logika Pelabelan Otomatis
  getLabel(quantity) {
    if (quantity > 100) return 'Laris';
    if (quantity >= 20) return 'Kurang Laris';
    return 'Tidak Laris';
  }

  predict(inputQty, trainingData) {
    const categories = ['Laris', 'Kurang Laris', 'Tidak Laris'];
    
    const scores = categories.map(cat => {
      const filtered = trainingData.filter(d => d.category === cat);
      const count = filtered.length;
      
      // 1. Prior Probability P(Ci)
      const prior = count / trainingData.length;

      if (count === 0) return { category: cat, score: 0 };

      // 2. Hitung Mean & Variance dari data training
      const values = filtered.map(d => d.total_quantity_sold);
      const mean = math.mean(values);
      const variance = math.variance(values) || 0.0001; // Hindari pembagian nol

      // 3. Likelihood P(X|Ci)
      const likelihood = this.calculateGaussian(inputQty, mean, variance);

      // 4. Posterior P(Ci|X)
      return {
        category: cat,
        score: likelihood * prior
      };
    });

    // Pilih skor tertinggi sebagai hasil klasifikasi
    return scores.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));
  }
}

module.exports = new NaiveBayesService();
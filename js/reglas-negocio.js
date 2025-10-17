// MicroClean - Reglas de Negocio y Configuración

const REGLAS_NEGOCIO = {
  // Mínimos configurables
  minimoServicio: 60.00, // MÍNIMO DEL SERVICIO (CUALQUIERA) B/.40.00
  minimoVisita: 60.00,   // Mínimo general de visita
  
  // Configuración de campaña (fácil de cambiar)
  campaniaActual: {
    nombre: 'Estándar',
    minimoServicio: 60.00,
    minimoVisita: 60.00
  },
  
  // Método para aplicar campaña especial (cambiar mínimos temporalmente)
  aplicarCampana: function(nombre, nuevoMinimo) {
    this.campaniaActual = {
      nombre: nombre,
      minimoServicio: nuevoMinimo,
      minimoVisita: nuevoMinimo
    };
    this.minimoServicio = nuevoMinimo;
    this.minimoVisita = nuevoMinimo;
  }
};

// Función para verificar y aplicar mínimo de servicio
function aplicarMinimoServicio(total) {
  return Math.max(total, REGLAS_NEGOCIO.minimoServicio);
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REGLAS_NEGOCIO, aplicarMinimoServicio };
}

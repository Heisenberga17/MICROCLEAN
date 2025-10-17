// MicroClean - Catálogo de Servicios y Precios
// Todos los precios en Balboas (B/.)

const SERVICIOS_CATALOGO = {
  tapiceriaTela: {
    nombre: 'Tapicería en Tela',
    descripcion: 'Limpieza de tapicería en tela: sofás, sillas, colchones, alfombras y más.',
    items: [
      { id: 'sofa-1puesto', nombre: 'Sofá 1 Puesto', precio: 30.00, tipo: 'fijo' },
      { id: 'sofa-pequeno', nombre: 'Sofá Pequeño', precio: 55.00, tipo: 'fijo' },
      { id: 'sofa-mediano', nombre: 'Sofá Mediano', precio: 65.00, tipo: 'fijo' },
      { id: 'sofa-grande', nombre: 'Sofá Grande', precio: 85.00, tipo: 'fijo' },
      { id: 'sofa-xl', nombre: 'Sofá XL', precio: 100.00, tipo: 'fijo' },
      { id: 'respaldar-cama', nombre: 'Respaldar de Cama', precio: 35.00, tipo: 'fijo' },
      { id: 'silla-comedor', nombre: 'Silla de Comedor Tapizada', precio: 10.00, tipo: 'cantidad', unidad: 'c/u' },
      { id: 'silla-sala', nombre: 'Silla de Sala', precio: 20.00, tipo: 'cantidad', unidad: 'c/u' },
      { id: 'alfombra', nombre: 'Alfombra', precio: 60.00, tipo: 'fijo' },
      { id: 'colchon-twin', nombre: 'Colchón Twin', precio: 35.00, tipo: 'fijo' },
      { id: 'colchon-full', nombre: 'Colchón Full', precio: 45.00, tipo: 'fijo' },
      { id: 'colchon-queen', nombre: 'Colchón Queen', precio: 50.00, tipo: 'fijo' },
      { id: 'colchon-king', nombre: 'Colchón King', precio: 55.00, tipo: 'fijo' },
      { id: 'tratamiento-enzimatico', nombre: 'Tratamiento Enzimático', precio: 20.00, tipo: 'cantidad', unidad: 'aplicación' }
    ]
  },
  
  tapiceriaCuero: {
    nombre: 'Tapicería en Cuero',
    descripcion: 'Limpieza y tratamiento de cuero (limpieza, humectación y protección).',
    items: [
      { id: 'cuero-1puesto', nombre: 'Sofá 1 Puesto', precio: 75.00, tipo: 'fijo' },
      { id: 'cuero-pequeno', nombre: 'Sofá Pequeño', precio: 120.00, tipo: 'fijo' },
      { id: 'cuero-mediano', nombre: 'Sofá Mediano', precio: 140.00, tipo: 'fijo' },
      { id: 'cuero-grande', nombre: 'Sofá Grande', precio: 175.00, tipo: 'fijo' },
      { id: 'cuero-xl', nombre: 'Sofá XL', precio: 200.00, tipo: 'fijo' }
    ]
  },
  
  limpiezaEspacios: {
    nombre: 'Limpieza General de Espacios',
    descripcion: 'Limpieza profesional de casas, oficinas, escuelas, restaurantes y negocios.',
    items: [
      { 
        id: 'casa-apartamento', 
        nombre: 'Casas/Apartamentos', 
        precioMin: 2.00, 
        precioMax: 2.50, 
        tipo: 'area', 
        unidad: 'm²',
        descripcion: 'B/.2.00 – 2.50 por m²'
      },
      { 
        id: 'oficina', 
        nombre: 'Oficinas', 
        precioMin: 2.50, 
        precioMax: 3.00, 
        tipo: 'area', 
        unidad: 'm²',
        descripcion: 'B/.2.50 – 3.00 por m²'
      },
      { 
        id: 'comercial', 
        nombre: 'Escuelas/Restaurantes/Negocios', 
        precioMin: 3.00, 
        precioMax: 3.50, 
        tipo: 'area', 
        unidad: 'm²',
        descripcion: 'B/.3.00 – 3.50 por m²'
      }
    ]
  },
  
  serviciosAdicionales: {
    nombre: 'Servicios Adicionales',
    descripcion: 'Servicios complementarios de protección y tratamiento.',
    items: [
      { 
        id: 'impermeabilizacion', 
        nombre: 'Impermeabilización de Telas', 
        precio: 15.00, 
        tipo: 'cantidad',
        unidad: 'aplicación',
        descripcion: 'Protección contra líquidos y manchas'
      }
    ]
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICIOS_CATALOGO };
}

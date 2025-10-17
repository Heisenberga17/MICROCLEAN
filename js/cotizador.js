// MicroClean Cotizador - Lógica del Carrito y Generación de Cotización
(function() {
    'use strict';
    
    // Estado del carrito (en memoria, NO localStorage)
    let carritoItems = [];
    
    // Referencias DOM
    const serviciosTela = document.getElementById('servicios-tela');
    const serviciosCuero = document.getElementById('servicios-cuero');
    const serviciosEspacios = document.getElementById('servicios-espacios');
    const serviciosAdicionales = document.getElementById('servicios-adicionales');
    const carritoContenido = document.getElementById('carrito-contenido');
    const carritoTotales = document.getElementById('carrito-totales');
    const formularioSeccion = document.getElementById('formulario-seccion');
    const formCotizacion = document.getElementById('form-cotizacion');
    
    // Inicializar
    document.addEventListener('DOMContentLoaded', function() {
        renderizarServicios();
        actualizarCarrito();
        
        // Auto-update año
        const yearSpan = document.getElementById('year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        
        // Form submit
        if (formCotizacion) {
            formCotizacion.addEventListener('submit', function(e) {
                e.preventDefault();
                enviarCotizacionWhatsApp();
            });
        }
    });
    
    // Renderizar servicios por categoría
    function renderizarServicios() {
        if (serviciosTela) {
            SERVICIOS_CATALOGO.tapiceriaTela.items.forEach(item => {
                serviciosTela.appendChild(crearServicioHTML(item, 'tapiceriaTela'));
            });
        }
        
        if (serviciosCuero) {
            SERVICIOS_CATALOGO.tapiceriaCuero.items.forEach(item => {
                serviciosCuero.appendChild(crearServicioHTML(item, 'tapiceriaCuero'));
            });
        }
        
        if (serviciosEspacios) {
            SERVICIOS_CATALOGO.limpiezaEspacios.items.forEach(item => {
                serviciosEspacios.appendChild(crearServicioHTML(item, 'limpiezaEspacios'));
            });
        }
        
        if (serviciosAdicionales) {
            SERVICIOS_CATALOGO.serviciosAdicionales.items.forEach(item => {
                serviciosAdicionales.appendChild(crearServicioHTML(item, 'serviciosAdicionales'));
            });
        }
    }
    
    // Crear HTML de servicio individual
    function crearServicioHTML(item, categoria) {
        const div = document.createElement('div');
        div.className = 'servicio-item';
        div.dataset.id = item.id;
        div.dataset.categoria = categoria;
        
        let precioDisplay = '';
        if (item.tipo === 'area') {
            precioDisplay = item.descripcion || `B/.${item.precioMin.toFixed(2)} - ${item.precioMax.toFixed(2)}/${item.unidad}`;
        } else if (item.tipo === 'cantidad') {
            precioDisplay = `B/.${item.precio.toFixed(2)} ${item.unidad}`;
        } else {
            precioDisplay = `B/.${item.precio.toFixed(2)}`;
        }
        
        div.innerHTML = `
            <div class="servicio-header">
                <span class="servicio-nombre">${item.nombre}</span>
                <span class="servicio-precio">${precioDisplay}</span>
            </div>
            ${item.descripcion && item.tipo !== 'area' ? `<div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.25rem;">${item.descripcion}</div>` : ''}
            <div class="servicio-controles">
                ${crearControlesHTML(item)}
                <button class="btn-agregar" data-id="${item.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        // Event listeners
        const btnAgregar = div.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', function(e) {
            e.stopPropagation();
            agregarAlCarrito(item, categoria, div);
        });
        
        div.addEventListener('click', function() {
            // Toggle selección para mostrar controles
            const yaSeleccionado = div.classList.contains('seleccionado');
            document.querySelectorAll('.servicio-item').forEach(el => {
                if (el !== div) el.classList.remove('seleccionado');
            });
            div.classList.toggle('seleccionado', !yaSeleccionado);
        });
        
        return div;
    }
    
    // Crear controles (sliders) según tipo de servicio
    function crearControlesHTML(item) {
        if (item.tipo === 'cantidad') {
            return `
                <div class="slider-control">
                    <div class="slider-label">
                        <span>Cantidad</span>
                        <span class="slider-value" data-type="cantidad">1 ${item.unidad}</span>
                    </div>
                    <input type="range" 
                           min="1" 
                           max="20" 
                           value="1" 
                           step="1"
                           data-control="cantidad"
                           aria-label="Cantidad de ${item.nombre}">
                </div>
            `;
        } else if (item.tipo === 'area') {
            return `
                <div class="slider-control">
                    <div class="slider-label">
                        <span>Área</span>
                        <span class="slider-value" data-type="area">50 m²</span>
                    </div>
                    <input type="range" 
                           min="10" 
                           max="500" 
                           value="50" 
                           step="5"
                           data-control="area"
                           aria-label="Área en metros cuadrados">
                </div>
                <div class="slider-control">
                    <div class="slider-label">
                        <span>Precio por m²</span>
                        <span class="slider-value" data-type="precio-m2">B/.${item.precioMin.toFixed(2)}</span>
                    </div>
                    <input type="range" 
                           min="${item.precioMin}" 
                           max="${item.precioMax}" 
                           value="${item.precioMin}" 
                           step="0.10"
                           data-control="precio-m2"
                           aria-label="Precio por metro cuadrado">
                </div>
            `;
        }
        return '';
    }
    
    // Agregar item al carrito
    function agregarAlCarrito(item, categoria, divServicio) {
        const controles = divServicio.querySelector('.servicio-controles');
        
        let itemCarrito = {
            id: item.id,
            nombre: item.nombre,
            categoria: categoria,
            tipo: item.tipo,
            precio: item.precio
        };
        
        // Leer valores de sliders
        if (item.tipo === 'cantidad') {
            const sliderCantidad = controles.querySelector('[data-control="cantidad"]');
            itemCarrito.cantidad = parseInt(sliderCantidad.value);
            itemCarrito.unidad = item.unidad;
            itemCarrito.subtotal = item.precio * itemCarrito.cantidad;
        } else if (item.tipo === 'area') {
            const sliderArea = controles.querySelector('[data-control="area"]');
            const sliderPrecioM2 = controles.querySelector('[data-control="precio-m2"]');
            itemCarrito.area = parseInt(sliderArea.value);
            itemCarrito.precioM2 = parseFloat(sliderPrecioM2.value);
            itemCarrito.unidad = 'm²';
            itemCarrito.subtotal = itemCarrito.area * itemCarrito.precioM2;
        } else {
            itemCarrito.subtotal = item.precio;
        }
        
        // Verificar si ya existe en carrito
        const existeIndex = carritoItems.findIndex(ci => ci.id === item.id);
        if (existeIndex >= 0) {
            carritoItems[existeIndex] = itemCarrito; // Actualizar
        } else {
            carritoItems.push(itemCarrito);
        }
        
        // Feedback visual
        mostrarFeedbackAgregado(divServicio);
        
        // Actualizar UI
        actualizarCarrito();
        divServicio.classList.remove('seleccionado');
    }
    
    // Feedback visual al agregar
    function mostrarFeedbackAgregado(elemento) {
        const feedback = document.createElement('div');
        feedback.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <path d="M5 13l4 4L19 7"/>
            </svg>
            <span>Agregado</span>
        `;
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--whatsapp);
            color: white;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10;
            animation: fadeInOut 1.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: var(--shadow-xl);
        `;
        
        elemento.style.position = 'relative';
        elemento.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 1200);
    }
    
    // Actualizar vista del carrito
    function actualizarCarrito() {
        if (carritoItems.length === 0) {
            carritoContenido.innerHTML = `
                <div class="carrito-vacio">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
                    </svg>
                    <p>Agrega servicios para comenzar tu cotización</p>
                </div>
            `;
            carritoTotales.style.display = 'none';
            formularioSeccion.style.display = 'none';
            return;
        }
        
        // Renderizar items
        let html = '';
        carritoItems.forEach((item, index) => {
            let detalles = '';
            if (item.tipo === 'cantidad') {
                detalles = `${item.cantidad} ${item.unidad} × B/.${item.precio.toFixed(2)}`;
            } else if (item.tipo === 'area') {
                detalles = `${item.area} m² × B/.${item.precioM2.toFixed(2)}/m²`;
            } else {
                detalles = 'Precio fijo';
            }
            
            html += `
                <div class="carrito-item" data-index="${index}">
                    <div class="carrito-item-header">
                        <strong>${item.nombre}</strong>
                        <button class="btn-eliminar" data-index="${index}" aria-label="Eliminar ${item.nombre}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="carrito-item-detalles">${detalles}</div>
                    <div style="text-align: right; font-weight: 700; color: var(--blue-2); margin-top: 0.5rem; font-size: 1.05rem;">
                        B/.${item.subtotal.toFixed(2)}
                    </div>
                </div>
            `;
        });
        
        carritoContenido.innerHTML = html;
        
        // Event listeners para eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                eliminarDelCarrito(index);
            });
        });
        
        // Calcular y mostrar totales
        calcularYMostrarTotales();
        
        // Mostrar formulario
        formularioSeccion.style.display = 'block';
        
        // Scroll suave al formulario en móvil
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                formularioSeccion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    }
    
    // Eliminar item del carrito
    function eliminarDelCarrito(index) {
        carritoItems.splice(index, 1);
        actualizarCarrito();
    }
    
    // Calcular y mostrar totales con reglas de negocio
    function calcularYMostrarTotales() {
        const subtotal = carritoItems.reduce((sum, item) => sum + item.subtotal, 0);
        
        // Aplicar mínimo de servicio directamente
        const totalFinal = aplicarMinimoServicio(subtotal);
        const minimoAplicado = totalFinal > subtotal;
        
        // Renderizar totales
        let html = '<div class="carrito-totales">';
        
        html += `
            <div class="total-linea">
                <span>Subtotal:</span>
                <span style="font-weight: 600;">B/.${subtotal.toFixed(2)}</span>
            </div>
        `;
        
        if (minimoAplicado) {
            html += `
                <div class="total-linea" style="color: var(--gray-600); font-size: 0.875rem;">
                    <span>Mínimo de servicio:</span>
                    <span style="font-weight: 600;">B/.${REGLAS_NEGOCIO.minimoServicio.toFixed(2)}</span>
                </div>
            `;
        }
        
        html += `
            <div class="total-linea destacado">
                <span>Total:</span>
                <span>B/.${totalFinal.toFixed(2)}</span>
            </div>
        `;
        
        html += `<p class="minimo-nota">* Mínimo de servicio: B/.${REGLAS_NEGOCIO.minimoServicio.toFixed(2)}</p>`;
        
        html += '</div>';
        
        carritoTotales.innerHTML = html;
        carritoTotales.style.display = 'block';
    }
    
    // Enviar cotización por WhatsApp
    function enviarCotizacionWhatsApp() {
        // Obtener datos del formulario
        const formData = new FormData(formCotizacion);
        const nombre = formData.get('nombre');
        const whatsapp = formData.get('whatsapp');
        const direccion = formData.get('direccion');
        const fecha = formData.get('fecha');
        const horario = formData.get('horario');
        const notas = formData.get('notas');
        
        // Construir mensaje
        let mensaje = `*COTIZACIÓN MICROCLEAN* 🧼✨\n\n`;
        mensaje += `*Datos del Cliente:*\n`;
        mensaje += `👤 Nombre: ${nombre}\n`;
        mensaje += `📱 WhatsApp: ${whatsapp}\n`;
        mensaje += `📍 Dirección: ${direccion}\n`;
        
        if (fecha) mensaje += `📅 Fecha preferida: ${fecha}\n`;
        if (horario) mensaje += `🕐 Horario preferido: ${horario}\n`;
        
        mensaje += `\n*Servicios Solicitados:*\n`;
        mensaje += `━━━━━━━━━━━━━━━━━━\n`;
        
        carritoItems.forEach((item, index) => {
            mensaje += `\n${index + 1}. *${item.nombre}*\n`;
            
            if (item.tipo === 'cantidad') {
                mensaje += `   📦 Cantidad: ${item.cantidad} ${item.unidad}\n`;
                mensaje += `   💵 Precio unitario: B/.${item.precio.toFixed(2)}\n`;
            } else if (item.tipo === 'area') {
                mensaje += `   📐 Área: ${item.area} m²\n`;
                mensaje += `   💵 Precio por m²: B/.${item.precioM2.toFixed(2)}\n`;
            }
            
            mensaje += `   💰 Subtotal: B/.${item.subtotal.toFixed(2)}\n`;
        });
        
        // Calcular totales (sin descuentos/promociones)
        const subtotal = carritoItems.reduce((sum, item) => sum + item.subtotal, 0);
        const totalFinal = aplicarMinimoServicio(subtotal);
        
        mensaje += `\n━━━━━━━━━━━━━━━━━━\n`;
        mensaje += `Subtotal: B/.${subtotal.toFixed(2)}\n`;
        mensaje += `\n✅ *TOTAL: B/.${totalFinal.toFixed(2)}*\n`;
        mensaje += `\n_(Mínimo de servicio: B/.${REGLAS_NEGOCIO.minimoServicio.toFixed(2)})_\n`;
        
        if (notas) {
            mensaje += `\n*📝 Notas adicionales:*\n${notas}\n`;
        }
        
        mensaje += `\n━━━━━━━━━━━━━━━━━━\n`;
        mensaje += `Gracias por cotizar con MicroClean 🧼✨`;
        
        // Abrir WhatsApp
        const numeroWhatsApp = '50764177111';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
        
        // Feedback
        mostrarMensajeExito();
    }
    
    // Mostrar mensaje de éxito
    function mostrarMensajeExito() {
        const mensaje = document.createElement('div');
        mensaje.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--whatsapp);
            color: white;
            padding: 1.25rem 2rem;
            border-radius: 12px;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        mensaje.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="M5 13l4 4L19 7"/>
                </svg>
                <span style="font-weight: 600;">Redirigiendo a WhatsApp...</span>
            </div>
        `;
        
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
            mensaje.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (mensaje.parentNode) {
                    mensaje.parentNode.removeChild(mensaje);
                }
            }, 300);
        }, 3000);
    }
    
    // Event listeners para sliders (actualización en tiempo real)
    document.addEventListener('input', function(e) {
        if (e.target.type === 'range') {
            const controlType = e.target.dataset.control;
            const servicioItem = e.target.closest('.servicio-item');
            const valueDisplay = servicioItem.querySelector(`[data-type="${controlType}"]`);
            
            if (controlType === 'cantidad') {
                const value = parseInt(e.target.value);
                const unidad = valueDisplay.textContent.split(' ').slice(-1)[0];
                valueDisplay.textContent = `${value} ${unidad}`;
            } else if (controlType === 'area') {
                valueDisplay.textContent = `${e.target.value} m²`;
            } else if (controlType === 'precio-m2') {
                valueDisplay.textContent = `B/.${parseFloat(e.target.value).toFixed(2)}`;
            }
        }
    });
    
    // CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
})();

// MicroClean Cotizador - COMPLETE FROM SCRATCH
(function() {
    'use strict';
    
    let carritoItems = [];
    
    // DOM Elements
    const serviciosTela = document.getElementById('servicios-tela');
    const serviciosCuero = document.getElementById('servicios-cuero');
    const serviciosEspacios = document.getElementById('servicios-espacios');
    const serviciosAdicionales = document.getElementById('servicios-adicionales');
    const carritoContenido = document.getElementById('carrito-contenido');
    const carritoTotales = document.getElementById('carrito-totales');
    const formularioSeccion = document.getElementById('formulario-seccion');
    const formCotizacion = document.getElementById('form-cotizacion');
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        renderizarServicios();
        actualizarCarrito();
        inicializarAcordeones();
        
        const yearSpan = document.getElementById('year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        
        if (formCotizacion) {
            formCotizacion.addEventListener('submit', function(e) {
                e.preventDefault();
                enviarCotizacionWhatsApp();
            });
        }
    });
    
    // ==================== ACORDEONES ====================
    function inicializarAcordeones() {
        const categorias = document.querySelectorAll('.categoria-servicios');
        
        categorias.forEach(categoria => {
            const header = categoria.querySelector('.categoria-header');
            const content = categoria.querySelector('.categoria-content');
            
            if (header && content) {
                header.addEventListener('click', function(e) {
                    // Don't close if clicking inside service items
                    if (e.target.closest('.servicio-item')) return;
                    
                    const isOpen = categoria.classList.contains('open');
                    
                    if (isOpen) {
                        content.style.maxHeight = '0';
                        categoria.classList.remove('open');
                    } else {
                        // Optional: Close other accordions
                        // categorias.forEach(c => {
                        //     if (c !== categoria) {
                        //         c.classList.remove('open');
                        //         c.querySelector('.categoria-content').style.maxHeight = '0';
                        //     }
                        // });
                        
                        content.style.maxHeight = content.scrollHeight + 'px';
                        categoria.classList.add('open');
                    }
                });
            }
        });
    }
    
    // ==================== RENDER SERVICIOS ====================
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
    
    // ==================== CREATE SERVICE HTML ====================
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
            <div class="servicio-header-item">
                <span class="servicio-nombre">${item.nombre}</span>
                <span class="servicio-precio">${precioDisplay}</span>
            </div>
            ${item.descripcion && item.tipo !== 'area' ? `<div class="servicio-descripcion">${item.descripcion}</div>` : ''}
            <div class="servicio-controles">
                ${crearControlesHTML(item)}
                <button class="btn-agregar" type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        // Event: Agregar
        const btnAgregar = div.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', function(e) {
            e.stopPropagation();
            agregarAlCarrito(item, categoria, div);
        });
        
        // Event: Click header to expand/collapse
        const headerItem = div.querySelector('.servicio-header-item');
        headerItem.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleCardSelection(div);
        });
        
        // Event: Sliders
        const sliders = div.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('input', function(e) {
                e.stopPropagation();
                actualizarValorSlider(this, div);
            });
            
            slider.addEventListener('mousedown', e => e.stopPropagation());
            slider.addEventListener('touchstart', e => e.stopPropagation());
        });
        
        return div;
    }
    
    // ==================== TOGGLE CARD SELECTION ====================
    function toggleCardSelection(card) {
        const wasSelected = card.classList.contains('seleccionado');
        
        // Deselect all cards
        document.querySelectorAll('.servicio-item').forEach(el => {
            el.classList.remove('seleccionado');
        });
        
        // Toggle current card
        if (!wasSelected) {
            card.classList.add('seleccionado');
        }
        
        // Update accordion height
        setTimeout(() => {
            const categoria = card.closest('.categoria-servicios');
            if (categoria && categoria.classList.contains('open')) {
                const content = categoria.querySelector('.categoria-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }, 50);
    }
    
    // ==================== UPDATE SLIDER ====================
    function actualizarValorSlider(slider, card) {
        const controlType = slider.dataset.control;
        const valueDisplay = card.querySelector(`[data-type="${controlType}"]`);
        
        if (controlType === 'cantidad') {
            const value = parseInt(slider.value);
            const unidad = valueDisplay.textContent.split(' ').slice(-1)[0];
            valueDisplay.textContent = `${value} ${unidad}`;
        } else if (controlType === 'area') {
            valueDisplay.textContent = `${slider.value} m²`;
        } else if (controlType === 'precio-m2') {
            valueDisplay.textContent = `B/.${parseFloat(slider.value).toFixed(2)}`;
        }
    }
    
    // ==================== CREATE CONTROLS HTML ====================
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
                           aria-label="Cantidad">
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
                           aria-label="Área">
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
                           aria-label="Precio">
                </div>
            `;
        }
        return '';
    }
    
    // ==================== AGREGAR AL CARRITO ====================
    function agregarAlCarrito(item, categoria, divServicio) {
        const controles = divServicio.querySelector('.servicio-controles');
        
        let itemCarrito = {
            id: item.id,
            nombre: item.nombre,
            categoria: categoria,
            tipo: item.tipo,
            precio: item.precio
        };
        
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
        
        // Check if item already exists
        const existeIndex = carritoItems.findIndex(ci => ci.id === item.id);
        if (existeIndex >= 0) {
            carritoItems[existeIndex] = itemCarrito;
        } else {
            carritoItems.push(itemCarrito);
        }
        
        mostrarFeedbackAgregado(divServicio);
        actualizarCarrito();
        divServicio.classList.remove('seleccionado');
        
        // Update accordion height
        setTimeout(() => {
            const categoria = divServicio.closest('.categoria-servicios');
            if (categoria && categoria.classList.contains('open')) {
                const content = categoria.querySelector('.categoria-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        }, 50);
    }
    
    // ==================== FEEDBACK AGREGADO ====================
    function mostrarFeedbackAgregado(elemento) {
        elemento.style.position = 'relative';
        
        const feedback = document.createElement('div');
        feedback.className = 'feedback-agregado';
        feedback.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <path d="M5 13l4 4L19 7"/>
            </svg>
            <span>Agregado</span>
        `;
        
        elemento.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 1500);
    }
    
    // ==================== ACTUALIZAR CARRITO ====================
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
                <div class="carrito-item">
                    <div class="carrito-item-header">
                        <strong>${item.nombre}</strong>
                        <button class="btn-eliminar" data-index="${index}" type="button" aria-label="Eliminar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="carrito-item-detalles">${detalles}</div>
                    <div class="carrito-item-subtotal">B/.${item.subtotal.toFixed(2)}</div>
                </div>
            `;
        });
        
        carritoContenido.innerHTML = html;
        
        // Event listeners for delete buttons
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                eliminarDelCarrito(index);
            });
        });
        
        calcularYMostrarTotales();
        formularioSeccion.style.display = 'block';
        
        // Scroll to form on mobile
        if (window.innerWidth < 1024) {
            setTimeout(() => {
                formularioSeccion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    }
    
    // ==================== ELIMINAR DEL CARRITO ====================
    function eliminarDelCarrito(index) {
        carritoItems.splice(index, 1);
        actualizarCarrito();
    }
    
    // ==================== CALCULAR TOTALES ====================
    function calcularYMostrarTotales() {
        const subtotal = carritoItems.reduce((sum, item) => sum + item.subtotal, 0);
        const totalFinal = aplicarMinimoServicio(subtotal);
        const minimoAplicado = totalFinal > subtotal;
        
        let html = '<div class="carrito-totales">';
        
        html += `
            <div class="total-linea">
                <span>Subtotal:</span>
                <span>B/.${subtotal.toFixed(2)}</span>
            </div>
        `;
        
        if (minimoAplicado) {
            html += `
                <div class="total-linea minimo">
                    <span>Mínimo de servicio:</span>
                    <span>B/.${REGLAS_NEGOCIO.minimoServicio.toFixed(2)}</span>
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
    
    // ==================== ENVIAR COTIZACIÓN WHATSAPP ====================
    function enviarCotizacionWhatsApp() {
        const formData = new FormData(formCotizacion);
        
        let msg = `*COTIZACIÓN MICROCLEAN*\n\n`;
        msg += `👤 ${formData.get('nombre')}\n`;
        msg += `📱 ${formData.get('whatsapp')}\n`;
        msg += `📍 ${formData.get('direccion')}\n\n`;
        
        if (formData.get('fecha')) msg += `📅 ${formData.get('fecha')}\n`;
        if (formData.get('horario')) msg += `🕐 ${formData.get('horario')}\n\n`;
        
        msg += `*Servicios:*\n`;
        
        carritoItems.forEach((item, i) => {
            msg += `${i + 1}. ${item.nombre}\n`;
            if (item.tipo === 'cantidad') {
                msg += `   ${item.cantidad}${item.unidad} - B/.${item.subtotal.toFixed(2)}\n`;
            } else if (item.tipo === 'area') {
                msg += `   ${item.area}m² × B/.${item.precioM2.toFixed(2)} - B/.${item.subtotal.toFixed(2)}\n`;
            } else {
                msg += `   B/.${item.subtotal.toFixed(2)}\n`;
            }
        });
        
        const subtotal = carritoItems.reduce((s, item) => s + item.subtotal, 0);
        const total = aplicarMinimoServicio(subtotal);
        
        msg += `\n✅ *TOTAL: B/.${total.toFixed(2)}*`;
        
        if (formData.get('notas')) {
            msg += `\n\n📝 ${formData.get('notas')}`;
        }
        
        const url = `https://wa.me/50764177111?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        
        mostrarMensajeExito();
    }
    
    // ==================== MENSAJE ÉXITO ====================
    function mostrarMensajeExito() {
        const div = document.createElement('div');
        div.className = 'mensaje-exito';
        div.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M5 13l4 4L19 7"/>
            </svg>
            <span>Redirigiendo a WhatsApp...</span>
        `;
        
        document.body.appendChild(div);
        
        setTimeout(() => {
            div.classList.add('hide');
            setTimeout(() => {
                if (div.parentNode) document.body.removeChild(div);
            }, 300);
        }, 3000);
    }
    
})();

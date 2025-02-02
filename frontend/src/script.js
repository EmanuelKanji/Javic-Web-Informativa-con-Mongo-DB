document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        // Capturar los datos del formulario
        const nombre = document.querySelector('#nombre').value.trim();
        const email = document.querySelector('#email').value.trim();
        const telefono = document.querySelector('#telefono').value.trim();
        const mensaje = document.querySelector('#mensaje').value.trim();

        // Validación básica
        if (!nombre || !email || !telefono || !mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto de datos a enviar
        const data = { nombre, email, telefono, mensaje };

        try {
            // ⚠️ IMPORTANTE: Cambia 'URL_DE_TU_API' por la URL real en Render
            const response = await fetch('https://proyectojavic.onrender.com/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Respuesta del servidor:', result);

            if (response.ok) {
                alert('Mensaje enviado con éxito');
                document.querySelector('form').reset();
            } else {
                alert('Error al enviar el mensaje: ' + (result.message || 'Intenta más tarde.'));
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error de conexión. Verifica tu red o intenta más tarde.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const mensaje = document.querySelector('#mensaje').value;

        const data = {
            nombre,
            email,
            telefono,
            mensaje
        };

        // Cambia la URL a la URL de tu servicio en Render
        const apiUrl = 'https://tu-aplicacion-en-render.onrender.com/api/contacto'; // Reemplaza con la URL correcta

        const response = await fetch(apiUrl, {
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
            alert('Error al enviar el mensaje');
        }
    });
});

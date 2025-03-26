// services/auth.service.ts
export const validarUsuario = async (token: string) => {
    try {
        const response = await fetch('http://usuarios:8004/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Opción 1: Enviar por header
            },
            // body: JSON.stringify({ token }) // Opción 2: Enviar por body
        });

        const data = await response.json();
        
        if (!response.ok || !data.valid) {
            throw new Error(data.code || 'ERROR_VALIDACION');
        }

        return data;
    } catch (error) {
        console.error('Error validando usuario:', error);
        throw new Error('ERROR_CONEXION_USUARIOS');
    }
};
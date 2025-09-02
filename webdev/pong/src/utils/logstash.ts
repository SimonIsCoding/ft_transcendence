export async function enviarLogALogstash(evento: string, datos: Record<string, unknown>): Promise<void> {
    const log = {
      service: 'tournament-service',
      level: 'INFO',
      event_type: evento,
      timestamp: new Date().toISOString(),
      ...datos
    };
  
    try {
      // Usar fetch para enviar por HTTP
      await fetch('http://localhost:5051', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
      });
    } catch (error) {
      // Si falla, mostrar en consola
      console.log('LOG (fallback):', log);
    }
  }
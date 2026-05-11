const scrapeService = require('../services/scrapeService');

const getScrapedData = async (req, res) => {
    // Se acepta una URL por query string, si no, usa una de prueba por defecto
    const targetUrl = req.query.url || 'https://books.toscrape.com/';

    // Validación básica: Validar formato de URL
    try {
        new URL(targetUrl);
    } catch (err) {
        return res.status(400).json({ 
            success: false, 
            message: "La URL proporcionada no es válida. (Ejemplo: https://sitio.com)" 
        });
    }

    // Ejecutar servicio y manejo de errores
    try {
        const data = await scrapeService.extractData(targetUrl);
        
        //Validar si el selector encontró resultados
        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron datos. Verifica que la estructura HTML de la URL objetivo coincida con los selectores."
            });
        }

        return res.status(200).json({
            success: true,
            total_extraidos: data.length,
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error en el servidor al intentar extraer la información.",
            error_detail: error.message
        });
    }
};

module.exports = { getScrapedData };
const scrapeService = require('../services/scrapeService');

const obtenerDatos = async (req, res) => {
    try {
        const datos = await scrapeService.procesarArchivoLocal();

        // Validación: Si el array viene vacío (Selector falló o HTML vacío)
        if (datos.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontraron elementos con los selectores definidos"
            });
        }

        // Respuesta exitosa (Status 200)
        res.status(200).json({
            ok: true,
            total: datos.length,
            resultados: datos
        });

    } catch (error) {
        // Manejo de errores 500
        res.status(error.status || 500).json({
            ok: false,
            msg: error.message || "Error interno en el servidor de scraping"
        });
    }
};

module.exports = { obtenerDatos };
package cl.uchile.cc5002.tarea4.controller;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import cl.uchile.cc5002.tarea4.service.AvistamientoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5000", "http://127.0.0.1:5000"})
public class ApiController {

    private final AvistamientoService avistamientoService;

    public ApiController(AvistamientoService avistamientoService) {
        this.avistamientoService = avistamientoService;
    }

    @GetMapping("/avistamientos")
    public List<Map<String, Object>> buscar(@RequestParam(required = false) String q) {
        return avistamientoService.busquedaDeAvistamiento(q);
    }

    @PostMapping("/notas")
    public Map<String, String> evaluar(@RequestBody Map<String, Integer> payload) {
        Integer avistamientoId = payload.get("avistamientoId");
        Integer nota = payload.get("nota");

        String nuevoPromedio = avistamientoService.agregarNota(avistamientoId, nota);
        return Map.of("notaProm", nuevoPromedio);
    }
}
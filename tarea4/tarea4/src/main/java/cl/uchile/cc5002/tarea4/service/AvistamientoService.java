package cl.uchile.cc5002.tarea4.service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import cl.uchile.cc5002.tarea4.model.Avistamiento;
import cl.uchile.cc5002.tarea4.model.Nota;
import cl.uchile.cc5002.tarea4.repository.AvistamientoRepository;
import cl.uchile.cc5002.tarea4.repository.NotaRepository;

@Service
public class AvistamientoService {

    private final AvistamientoRepository avistamientoRepository;
    private final NotaRepository notaRepository;

    public AvistamientoService(AvistamientoRepository avistamientoRepository, NotaRepository notaRepository) {
        this.avistamientoRepository = avistamientoRepository;
        this.notaRepository = notaRepository;
    }

    public List<Map<String, Object>> busquedaDeAvistamiento(String text) {
        List<Avistamiento> todos = avistamientoRepository.findAll();
        List<Avistamiento> filtrados = new ArrayList<>();

       if (text != null && !text.trim().isEmpty()) {
            String q = text.trim().toLowerCase();
            for (Avistamiento avist : todos) {
                String ave = avist.getAve().getNombre().toLowerCase();
                String voluntario = avist.getVoluntario().getNombre().toLowerCase();
                String comuna = avist.getVoluntario().getComuna().getNombre().toLowerCase();

                if (ave.contains(q) || voluntario.contains(q) || comuna.contains(q)) {
                    filtrados.add(avist);
                }
            }
        } else {
            filtrados = todos;
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        for (Avistamiento avist : filtrados) {
            Map<String, Object> fila = new HashMap<>();
            fila.put("id", avist.getId());
            fila.put("ave", avist.getAve().getNombre());
            fila.put("voluntario", avist.getVoluntario().getNombre());
            fila.put("comuna", avist.getVoluntario().getComuna().getNombre());
            fila.put("fechaHora", avist.getFechaHora().format(formatter));
            fila.put("notaProm", calculoProm(avist.getId()));
            resultado.add(fila);
        }
        return resultado;
    }

    //caluculo del promedio de notas
    public String calculoProm(Integer avistamientoId) {
        List<Nota> notas = notaRepository.findByAvistamientoId(avistamientoId);
        if (notas.isEmpty()) {
            return "-";
        }
        double suma = 0;
        for (Nota n : notas) {
            suma += n.getNota();
        }
        return String.format("%.1f", suma / notas.size());
    }

    public String agregarNota(Integer avistamientoId, Integer valorNota) {
        if (valorNota == null || valorNota < 1 || valorNota > 7) {
            throw new IllegalArgumentException("La nota debe estar entre 1 y 7.");
        }
        Avistamiento avistamiento = avistamientoRepository.findById(avistamientoId)
                .orElseThrow(() -> new IllegalArgumentException("Avistamiento no encontrado."));

        Nota nuevaNota = new Nota();
        nuevaNota.setAvistamiento(avistamiento);
        nuevaNota.setNota(valorNota);
        notaRepository.save(nuevaNota);

        return calculoProm(avistamientoId);
    }
}


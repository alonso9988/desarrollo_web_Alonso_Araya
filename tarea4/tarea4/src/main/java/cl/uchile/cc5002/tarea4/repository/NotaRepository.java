package cl.uchile.cc5002.tarea4.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import cl.uchile.cc5002.tarea4.model.Nota;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    List<Nota> findByAvistamientoId(Integer avistamientoId);
}
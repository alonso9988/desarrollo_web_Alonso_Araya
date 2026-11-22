package cl.uchile.cc5002.tarea4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cl.uchile.cc5002.tarea4.model.Avistamiento;

public interface AvistamientoRepository extends JpaRepository<Avistamiento, Integer> {
}
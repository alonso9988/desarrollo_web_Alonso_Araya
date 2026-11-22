package cl.uchile.cc5002.tarea4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {

    @GetMapping("/")
    public String inicio() {
        return "index"; // Busca src/main/resources/templates/index.html
    }

    @GetMapping("/buscador")
    public String buscador() {
        return "buscador"; // Busca src/main/resources/templates/buscador.html
    }
}
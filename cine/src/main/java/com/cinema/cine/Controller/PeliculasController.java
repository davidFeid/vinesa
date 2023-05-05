package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Pelicula;
import com.cinema.cine.Service.PeliculaServiceIMPL.PSIMPL;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequestMapping("AdminPelicula")
@RestController
@CrossOrigin("*")
public class PeliculasController {

    public PeliculasController(PSIMPL psimpl){
        this.psimpl = psimpl;
    }
    private final PSIMPL psimpl;

    //Peliculas
    @GetMapping
    @RequestMapping(value = "ConsultarPeliculas", method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarPeliculas(){
        List<Pelicula> listarPelicula=this.psimpl.ConsultarPelicula();
        return ResponseEntity.ok(listarPelicula);
    }

    @PostMapping
    @RequestMapping(value = "CrearPeliculas", method = RequestMethod.POST)
    public ResponseEntity<?> CrearPeliculas(@RequestBody Pelicula pelicula){
        Pelicula PeliculaCreada = this.psimpl.CrearPelicula(pelicula);
        Pelicula EditarPelicula = this.psimpl.BuscarPelicula(PeliculaCreada.getIdPelicula());
        EditarPelicula.setImagen(PeliculaCreada.getIdPelicula()+"."+PeliculaCreada.getImagen());
        Pelicula PeliculaModificada = this.psimpl.ModificarPelicula(EditarPelicula,PeliculaCreada.getIdPelicula());
        return ResponseEntity.status(HttpStatus.CREATED).body(PeliculaModificada);
    }

    @PutMapping
    @RequestMapping(value = "ModificarPelicula/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> ModificarPelicula(@RequestBody Pelicula pelicula,@PathVariable int id){
        Pelicula PeliculaModificada = this.psimpl.ModificarPelicula(pelicula,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(PeliculaModificada);
    }

    @GetMapping
    @RequestMapping(value = "BuscarPelicula/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> BuscarPelicula(@PathVariable int id){
        Pelicula pelicula = this.psimpl.BuscarPelicula(id);
        return ResponseEntity.ok(pelicula);
    }

    @DeleteMapping
    @RequestMapping(value = "EliminarPelicula/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> EliminarPelicula(@PathVariable int id){
        this.psimpl.EliminarPelicula(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    @RequestMapping(value = "ImagenPeliculaUpload/{name}",method =RequestMethod.POST)
    public ResponseEntity<?> imagenPeliculaUpload(@RequestParam("image") MultipartFile imagen, @PathVariable int name) {
        // Aquí puedes hacer lo que quieras con la imagen. Por ejemplo, guardarla en el servidor.
        try {
            byte[] bytes = imagen.getBytes();
            Path ruta = Paths.get("src/main/resources/images/" + name + "." + imagen.getOriginalFilename().substring(imagen.getOriginalFilename().lastIndexOf(".") + 1));
            Files.write(ruta, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("Imagen subida con éxito");
    }

    @GetMapping
    @RequestMapping(value = "imagenPeliculaDownload/{imageName}", method = RequestMethod.GET)
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get("src/main/resources/images/" + imageName);
        Resource resource = new UrlResource(imagePath.toUri());
        if(resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}

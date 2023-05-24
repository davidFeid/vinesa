package com.cinema.cine.Service;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Pelicula;

import java.util.List;

public interface ButacaService {
    public List<Butaca> ConsultarButaca();
    public Butaca CrearButaca(Butaca butaca);
    public Butaca ModificarButaca(Butaca butaca,int id);
    public Butaca BuscarButaca(int id);
    public  void EliminarButaca(int id);

    public List<Butaca> findBySala(int id);

}

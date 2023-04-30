package com.cinema.cine.Service;

import com.cinema.cine.Entity.Butaca;

import java.util.List;

public interface ButacaService {
    public List<Butaca> ConsultarButaca();
    public Butaca CrearButaca(Butaca butaca);
    public Butaca ModificarButaca(Butaca butaca);
    public Butaca BuscarButaca(int id);
    public  void EliminarButaca(int id);

}

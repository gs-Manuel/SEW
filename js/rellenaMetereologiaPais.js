document.open();
document.write("<h3>"+pais.getNombre()+"</h3>")
document.write("<h4> Información principal</h4>")
document.write("<p> Capital: "+pais.getCapital()+"</p>")
document.write("<p> Número de habitantes: "+pais.getCantidadPoblacion()+" personas</p>")
pais.escribirCoordenadasCapital();
document.write("<h4> Más información</h4>")
document.write(pais.getInformacionSecundario());
document.close();
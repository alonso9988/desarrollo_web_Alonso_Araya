import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify, url_for
from sqlalchemy.orm import scoped_session
from models import SessionLocal, Avistamiento, Region, Comuna, Voluntario, Ave, Registro, Comentario
from sqlalchemy import func

app = Flask(__name__)
app.secret_key = "s3cr3t_k3y"

# Manejo de sesiones por request
db_session = scoped_session(SessionLocal)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


# Portada
@app.route('/')
def index():
    dosAvistamientos = db_session.query(Avistamiento)\
        .order_by(Avistamiento.fecha_hora.desc())\
        .limit(2)\
        .all()
    return render_template('index.html', avistamientos=dosAvistamientos)


# Registro de Voluntario
@app.route('/voluntario', methods=['GET', 'POST'])
def registro_voluntario():
    lRegiones = db_session.query(Region).all()
    lComunas = db_session.query(Comuna).all()

    if request.method == 'POST':
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        telefono = request.form.get('telefono')
        comuna_id = request.form.get('comuna_id')

        nuevo_voluntario = Voluntario(
            nombre=nombre.strip(),
            email=email.strip(),
            telefono=telefono.strip() if telefono else None,
            comuna_id=int(comuna_id),
            fecha_registro=datetime.now()
        )

        db_session.add(nuevo_voluntario)
        db_session.commit()

        return render_template('registroVoluntario.html', exito=True, regiones=lRegiones, comunas=lComunas)

    return render_template('registroVoluntario.html', regiones=lRegiones, comunas=lComunas)


# Informar Avistamiento
@app.route('/avistamiento', methods=['GET', 'POST'])
def avistamiento():
    voluntarios = db_session.query(Voluntario).all()
    aves = db_session.query(Ave).all()

    if request.method == 'POST':
        voluntario_id = request.form.get('voluntario')
        ave_id = request.form.get('ave')
        lugar = request.form.get('lugar')
        fecha = request.form.get('fecha_hora')
        descripcion = request.form.get('descripcion')
        archivos = request.files.getlist('archivo')

        fecha_dt = datetime.strptime(fecha, '%Y-%m-%dT%H:%M')

        nuevoAvistamiento = Avistamiento(
            voluntario_id=int(voluntario_id),
            ave_id=int(ave_id),
            lugar=lugar.strip(),
            fecha_hora=fecha_dt,
            descripcion=descripcion.strip() if descripcion else None
        )

        db_session.add(nuevoAvistamiento)
        db_session.commit()

        carpeta = os.path.join(app.root_path, 'static', 'uploads')
        os.makedirs(carpeta, exist_ok=True)

        archivos_validos = [f for f in archivos if f.filename != '']
        for archivo in archivos_validos:
            nombre_final = f"{int(datetime.now().timestamp())}_{archivo.filename}"
            archivo.save(os.path.join(carpeta, nombre_final))

            reg = Registro(
                ruta_archivo=f"uploads/{nombre_final}",
                nombre_archivo=archivo.filename,
                avistamiento_id=nuevoAvistamiento.id
            )
            db_session.add(reg)

        db_session.commit()
        return render_template('informarAvistamiento.html', exito=True)

    return render_template('informarAvistamiento.html', voluntarios=voluntarios, aves=aves)


# Listado de avistamientos paginado
@app.route('/lista_avistamientos')
def lista_avistamientos():
    avistamientos = db_session.query(Avistamiento)\
        .order_by(Avistamiento.fecha_hora.desc())\
        .all()
    return render_template('listadoAvistamiento.html', avistamientos=avistamientos)


# Detalle de avistamiento
@app.route('/avistamiento/<int:id>')
def detalle_avistamiento(id):
    avistamiento_obj = db_session.query(Avistamiento).filter(Avistamiento.id == id).first()
    if not avistamiento_obj:
        return "Avistamiento no encontrado", 404
    return render_template('detalleAvistamiento.html', avistamiento=avistamiento_obj)

# Estadísticas
@app.route('/estadisticas')
def vista_estadisticas():
    return render_template('estadisticas.html')


@app.route('/api/estadisticas')
def obtener_estadisticas():
    avistamientosTotales = db_session.query(Avistamiento).all() #obtencion de los datos

    #Grafico de lineas
    avistamientos_por_dia = {} #{fecha: numAvesDia}
    for avistamiento in avistamientosTotales:
        fecha_str = avistamiento.fecha_hora.strftime('%Y-%m-%d')
        if fecha_str in avistamientos_por_dia:
            avistamientos_por_dia[fecha_str] += 1
        else:
            avistamientos_por_dia[fecha_str] = 1

    #eje X
    dias = sorted(avistamientos_por_dia.keys()) #[dia1, dia2, dia3, ...]

    #eje Y
    cantidadAvistamientos = []
    for dia in dias:
        cantidadAvistamientos.append(avistamientos_por_dia[dia])  #[numAvesDia1, numAvesDia2, numAvesDia3, ...]


    #Gráfico de torta
    avistamientos_por_ave = {}
    for avistamiento in avistamientosTotales:
        nombre_ave = avistamiento.ave.nombre
        if nombre_ave in avistamientos_por_ave:
            avistamientos_por_ave[nombre_ave] += 1
        else:
            avistamientos_por_ave[nombre_ave] = 1 

    datosTorta = []
    for nombre_ave, cantidad in avistamientos_por_ave.items():
        datosTorta.append({
            "name": nombre_ave,
            "y": cantidad
        })

    #Grafico de barras
    voluntariosTotales = db_session.query(Voluntario).all()
    voluntarios_por_comuna = {}
    for voluntario in voluntariosTotales:
        comuna = voluntario.comuna.nombre
        if comuna in voluntarios_por_comuna:
            voluntarios_por_comuna[comuna] += 1
        else:
            voluntarios_por_comuna[comuna] = 1

    #eje X
    comunas = sorted(voluntarios_por_comuna.keys())

    #eje Y
    cantidadVoluntarios = []
    for comuna in comunas:
        cantidadVoluntarios.append(voluntarios_por_comuna[comuna])
    
    return jsonify({
        "dias": dias,
        "cantidadAvistamientos": cantidadAvistamientos,
        "datosTorta": datosTorta,
        "comunas": comunas,
        "cantidadVoluntarios": cantidadVoluntarios
    })


#Comentarios
@app.route('/avistamiento/<int:id>/comentarios', methods=['GET']) #int:id -> /1,/2,/3,...
def ver_comentarios(id):
    comentarios = db_session.query(Comentario)\
    .filter(Comentario.avistamiento_id == id)\
    .order_by(Comentario.fecha.desc())\
    .all()

    lista_comentarios = []
    for comentario in comentarios:
        lista_comentarios.append({
            "id": comentario.id,
            "nombre": comentario.nombre,
            "texto": comentario.texto,
            "fecha": comentario.fecha.strftime('%Y-%m-%d %H:%M:%S')
        })
    return jsonify(lista_comentarios)


#Agregar comentario
@app.route('/avistamiento/<int:id>/comentarios', methods=['POST'])
def agregar_comentario(id):
    datos = request.get_json() or {}
    nombre = datos.get('nombre', '').strip()
    texto = datos.get('texto', '').strip()

    errores = []
    if not nombre or len(nombre) < 3 or len(nombre) > 50:
        errores.append("El nombre debe tener entre 3 y 50 caracteres.")

    if not texto or len(texto) < 5 or len(texto) > 300:
        errores.append("El texto del comentario debe tener entre 5 y 300 caracteres.")

    if errores:
        return jsonify({"exito": False, "errores": errores}), 400

    nComentario = Comentario(
        nombre=nombre,
        texto=texto,
        fecha=datetime.now(),
        avistamiento_id=id
    )

    db_session.add(nComentario)
    db_session.commit()

    return jsonify({"exito": True, "mensaje": "Comentario agregado exitosamente."})


if __name__ == '__main__':
    app.run(debug=True)
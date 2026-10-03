import os
from datetime import datetime
from flask import Flask, render_template, request
from sqlalchemy.orm import scoped_session
from models import SessionLocal, Avistamiento, Region, Comuna, Voluntario, Ave, Registro

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


# Listado de avistamientos paginado (5 por página)
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
def estadisticas():
    return render_template('estadisticas.html')


if __name__ == '__main__':
    app.run(debug=True)
    
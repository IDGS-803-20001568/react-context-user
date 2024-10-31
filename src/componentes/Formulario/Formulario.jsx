import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import UserContext from '../../Context/User/UserContext';
import Swal from 'sweetalert2';

const Formulario = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { postUser, putUser } = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            const response = await postUser(data);
            Swal.fire({
                title: '¡Usuario registrado exitosamente!',
                html: `
                    <div class="text-start">
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">ID:</span>
                            <input type="text" class="form-control" value="${response.id}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Nombre:</span>
                            <input type="text" class="form-control" value="${response.name}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Trabajo:</span>
                            <input type="text" class="form-control" value="${response.job}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Fecha:</span>
                            <input type="text" class="form-control" value="${new Date(response.createdAt).toLocaleString()}" readonly>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            reset();
        } catch (error) {
            Swal.fire({
                title: 'Error al registrar usuario',
                text: 'No se pudo completar el registro. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const modificar = async (data) => {
        try {
            const response = await putUser(data);
            Swal.fire({
                title: '¡Usuario modificado exitosamente!',
                html: `
                    <div class="text-start">
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Nombre:</span>
                            <input type="text" class="form-control" value="${response.name}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Trabajo:</span>
                            <input type="text" class="form-control" value="${response.job}" readonly>
                        </div>
                        <div class="input-group mb-2">
                            <span class="input-group-text" style="width:100px">Fecha:</span>
                            <input type="text" class="form-control" value="${new Date(response.updatedAt).toLocaleString()}" readonly>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error al modificar usuario',
                text: 'No se pudo completar la modificación. Por favor, intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleModificar = handleSubmit(modificar);

    return (
        <div className="container mt-5 p-4 shadow-lg rounded bg-light" style={{ maxWidth: '600px', margin:'3%' }}>
            <h2 className="mb-4 text-center text-primary">Formulario de Usuario</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className="form-group col-12 mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            placeholder="Ingrese su nombre"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <div className="invalid-feedback">El campo nombre es obligatorio</div>}
                    </div>
                    <div className="form-group col-12 mb-3">
                        <label htmlFor="job" className="form-label">Trabajo</label>
                        <input
                            type="text"
                            className={`form-control ${errors.job ? 'is-invalid' : ''}`}
                            id="job"
                            placeholder="Ingrese su trabajo"
                            {...register('job', { required: true })}
                        />
                        {errors.job && <div className="invalid-feedback">El campo trabajo es obligatorio</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button
                        type="submit"
                        className="btn btn-success w-45"
                        style={{ borderRadius: '20px', fontWeight: 'bold' }}
                    >
                        Añadir
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning w-45 text-white"
                        onClick={handleModificar}
                        style={{ borderRadius: '20px', fontWeight: 'bold' }}
                    >
                        Modificar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Formulario;

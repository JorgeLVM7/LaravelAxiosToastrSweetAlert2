@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="row">
                        <div class="col">
                            <button type="button" class=" btn btn-primary float-right" @click="NuevoDato()">Nuevo</button>
                        </div>
                    </div>
                    <div class="row">
                        <br>
                    </div>
                    <div class="row">
                        <div class="col">
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">nombre</th>
                                    <th scope="col">posicion</th>
                                    <th scope="col">salario</th>
                                    <th scope="col">acciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {{-- Se usa el V-for para obtener los datos en un for de la llamada de Axios --}}
                                    {{-- Siempre de escribe de singular a plural usando Vuejs --}}
                                  <tr v-for="dato in datos">
                                      {{-- Siempre lleva @ para invocar las variables en Laravel --}}
                                  <th scope="row">@{{dato.id}}</th>
                                    <td>@{{dato.nombre}}</td>
                                    <td>@{{dato.posicion}}</td>
                                    <td>@{{dato.salario}}</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-warning"
                                            @click="EditarDato(dato)">Editar</button>
                                            <button type="button" class="btn btn-danger"
                                            @click="EliminarDato(dato)">Eliminar</button>
                                          </div>
                                    </td>
                                  </tr>
                                  
                                </tbody>
                              </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

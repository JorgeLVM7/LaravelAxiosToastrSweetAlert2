<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\DatosP;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(DatosP::class, function (Faker $faker) {
    return [
        'nombre' => $faker->name,
        'posicion' => $faker->jobTitle,
        'salario' => $faker->randomDigit,
        
    ];
});

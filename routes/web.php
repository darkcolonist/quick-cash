<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/get/company/list', 
        [CompanyController::class, 'getCompanyList'])->name('company.list');
Route::post('/get/company/record',
        [CompanyController::class, 'getCompanyRecord']);
Route::post('/update/company/data',
        [CompanyController::class, 'updateCompany']);

Route::get('/get/user/list', 
        [UserController::class, 'getUserList'])->name('user.list');
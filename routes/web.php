<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;

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
Route::post('/company/add/data', [CompanyController::class, 'addCompany']);
Route::get('/company/add', [CompanyController::class, 'addCompanyForm']);

Route::get('/company',
        [CompanyController::class, 'index'])->name('company.index');

Route::get('/get/user/list', 
        [UserController::class, 'getUserList'])->name('user.list');
Route::get('/user',
        [UserController::class, 'index'])->name('user.index');
Route::get('/user/add', [UserController::class, 'addUserForm']);

Route::get('/get/role/list', 
        [RolesController::class, 'getRoleList'])->name('role.list');
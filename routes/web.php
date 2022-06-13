<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\LoansController;

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

//company
Route::get('/get/company/list',  [CompanyController::class, 'getCompanyList']);
Route::post('/get/company/record', [CompanyController::class, 'getCompanyRecord']);
Route::post('/update/company/data', [CompanyController::class, 'updateCompany']);
Route::post('/company/add/data', [CompanyController::class, 'addCompany']);
Route::get('/company/add', [CompanyController::class, 'addCompanyForm']);
Route::get('/company', [CompanyController::class, 'index']);

//user
Route::get('/get/user/list', [UserController::class, 'getUserList']);
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/add', [UserController::class, 'addUserForm']);
Route::post('/user/add/data', [UserController::class, 'addUser']);
Route::get('/user/edit/{id}', [UserController::class, 'editUserForm']);
Route::get('/get/uses', [UserController::class, 'getUsersSession']);
Route::get('/get/user/{id}', [UserController::class, 'getUserRecord']);

//role
Route::get('/get/role/list', [RolesController::class, 'getRoleList']);

//config
Route::get('/config/edit', [ConfigurationController::class, 'editConfigForm']);
Route::get('/get/config', [ConfigurationController::class, 'getConfigurationList']);
Route::post('/config/edit', [ConfigurationController::class, 'updateConfiguration']);

//loan
Route::get('/loan/request', [LoansController::class, 'requestLoan']);
Route::post('/loan/add/data', [LoansController::class, 'addLoan']);
Route::get('/users/loan/{id}', [LoansController::class, 'getPendingLoanRecord']);
Route::get('/get/loan/list', [LoansController::class, 'getLoanList']);
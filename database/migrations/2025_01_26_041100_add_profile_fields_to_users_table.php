<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('gender')->nullable();
            $table->json('interested_in')->nullable();
            $table->date('date_of_birth')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'country',
                'city',
                'gender',
                'interested_in',
                'date_of_birth'
            ]);
        });
    }
};
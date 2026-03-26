<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cause;

class CauseSeeder extends Seeder
{
    public function run(): void
    {
        $causes = [
            [
                'title' => 'Aide aux enfants démunis',
                'description' => 'Collecte de fonds pour fournir nourriture, vêtements et fournitures scolaires aux enfants dans le besoin au Cameroun.',
                'goal_amount' => 5000000,
                'current_amount' => 1250000,
                'status' => 'active'
            ],
            [
                'title' => 'Construction d\'un puits',
                'description' => 'Accès à l\'eau potable pour un village de 500 personnes.',
                'goal_amount' => 3000000,
                'current_amount' => 800000,
                'status' => 'active'
            ],
            [
                'title' => 'Équipement médical',
                'description' => 'Achat de matériel médical pour un centre de santé rural.',
                'goal_amount' => 10000000,
                'current_amount' => 2500000,
                'status' => 'active'
            ],
            [
                'title' => 'Scolarisation des filles',
                'description' => 'Bourses d\'études pour 50 jeunes filles défavorisées.',
                'goal_amount' => 8000000,
                'current_amount' => 0,
                'status' => 'active'
            ],
        ];

        foreach ($causes as $cause) {
            Cause::create($cause);
        }
    }
}

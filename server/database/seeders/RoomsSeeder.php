<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rooms = [
            'Boulevard South Office Center',
            'Dublin Blvd. Office Center',
            'Middlefield Office Center',
            '10th Street Office Center',
            'Pescadero Office Center'
        ];
        foreach ($rooms as $roomName) {
            $roomData[] = [
                'name' => $roomName,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }
        Room::insert($roomData);
    }
}

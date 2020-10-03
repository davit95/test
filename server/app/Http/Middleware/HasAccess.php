<?php

namespace App\Http\Middleware;

use App\Models\Reservation;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HasAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $reservation = Reservation::find((int)$request->route('id'));
        if (Auth::id() !== $reservation->user_id) {
            return response()->json(['message' => 'You do not have access to perform this operation'], 403);
        }
        return $next($request);
    }
}

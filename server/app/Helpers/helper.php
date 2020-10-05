<?php

/**
 * @param $alert
 * @param $message
 * @param $code
 * @param null $key
 * @param null $res
 * @return \Illuminate\Http\JsonResponse
 */
function generateResponse($alert, $message, $code, $key = null, $res = null)
{
    $data = [
        'alert' => $alert,
        'message' => $message,
    ];
    if ($res && $key) {
        $data[$key] = $res;
    }
    return response()->json($data, $code);
}

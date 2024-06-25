<?php

use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Response;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Mockery\Exception\InvalidOrderException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: "/",
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            EncryptCookies::class,
            StartSession::class,
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (Throwable $e) {
            if (app()->bound('sentry')) {
                app('sentry')->captureException($e);
            }
        });

        $exceptions->renderable(function (MethodNotAllowedHttpException $e) {
            return response()->json([
                'message' => '該当するデータが見つかりませんでした。',
            ], Response::HTTP_NOT_FOUND);
        });

        $exceptions->renderable(function (UnauthorizedHttpException $e) {
            return response()->json([
                'message' => '該当するデータが見つかりませんでした。',
            ], Response::HTTP_NOT_FOUND);
        });

        $exceptions->renderable(function (NotFoundHttpException $e) {
            return response()->json([
                'message' => '該当するデータが見つかりませんでした。',
            ], Response::HTTP_NOT_FOUND);
        });

        $exceptions->renderable(function (AccessDeniedHttpException $e) {
            return response()->json([
                'message' => '権限がありません。',
            ], Response::HTTP_FORBIDDEN);
        });
    })->create();

<?php

namespace App\Http\Controllers\Api;

use App\Actions\TodoCreateAction;
use App\Actions\TodoDeleteAction;
use App\Actions\TodoUpdateAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): JsonResponse
    {
        $todos = Todo::where('user_id', auth()->id())
        ->when($request->status, fn($query) => $query->where('status', $request->status))
        ->when($request->due_date, fn($query) => $query->whereDate('due_date', $request->due_date))
        ->paginate(2);

        return response()->json($todos);
    }

    public function store(StoreTodoRequest $request): JsonResponse
    {
        $todo = (new TodoCreateAction())->execute($request->validated());
        return response()->json($todo, 201);
    }

    public function show(Todo $todo): JsonResponse
    {
        $this->authorize('view', $todo);
        return response()->json($todo);
    }

    public function update(UpdateTodoRequest $request, Todo $todo): JsonResponse
    {
        $todo = (new TodoUpdateAction())->execute($todo, $request->validated());
        return response()->json($todo);
    }

    public function destroy(Todo $todo): JsonResponse
    {
        $this->authorize('delete', $todo);
        (new TodoDeleteAction())->execute($todo);
        return response()->json(['message' => 'Todo deleted'], 200);
    }
}